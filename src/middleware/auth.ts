import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export interface AuthResult {
  user: {
    id: number;
    email: string;
    globalRole: Role;
    memberships: { role: Role; association: { slug: string } }[];
  };
  membership?: { role: Role; association: { slug: string } };
}

export interface AuthRequest extends NextApiRequest {
  user?: {
    id: number;
    email: string;
    role: Role;
    globalRole: Role;
    memberships: { role: Role; association: { slug: string } }[];
  };
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

export function requireAuth(
  handler: (req: AuthRequest, res: NextApiResponse) => Promise<void> | void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = jwt.verify(authHeader, JWT_SECRET) as { 
        id: number; 
        email: string; 
        globalRole: Role;
      };

      const user = await prisma.user.findUnique({
        where: { id: token.id },
        include: { memberships: { include: { association: true } } },
      });

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const authReq = req as AuthRequest;
      authReq.user = {
        id: user.id,
        email: user.email,
        role: user.globalRole,
        globalRole: user.globalRole,
        memberships: user.memberships.map(m => ({
          role: m.role,
          association: { slug: m.association.slug }
        }))
      };

      return handler(authReq, res);
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}