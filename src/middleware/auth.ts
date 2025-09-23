import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthResult {
  user: {
    id: number;
    email: string;
    globalRole: Role;
    memberships: { role: Role; association: { slug: string } }[];
  };
  membership?: { role: Role; association: { slug: string } };
}

export async function checkAssociationPermission(
  req: NextApiRequest,
  associationSlug: string,
  requiredRole: Role
): Promise<AuthResult> {
  const token = req.headers.authorization ? JSON.parse(req.headers.authorization) : null;
  if (!token) throw new Error('Unauthorized');

  const user = await prisma.user.findUnique({
    where: { email: token.email },
    include: { memberships: { include: { association: true } } },
  });

  if (!user) throw new Error('Unauthorized');

  const membership = user.memberships.find(m => m.association.slug === associationSlug);

  const allowed =
    (membership && hasRole(membership.role, requiredRole)) || user.globalRole === 'SUPER_ADMIN';

  if (!allowed) throw new Error('Forbidden');

  return { user, membership };
}

export function hasRole(role: Role, required: Role) {
  const hierarchy: Role[] = [
    'VISITEUR',
    'MEMBRE',
    'MEMBRE_ACTIF',
    'MODERATEUR',
    'ADMIN',
    'SECRETAIRE',
    'TRESORIER',
    'VICE_PRESIDENT',
    'PRESIDENT',
    'SUPER_ADMIN',
  ];
  return hierarchy.indexOf(role) >= hierarchy.indexOf(required);
}