import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkAssociationPermission } from '../../../../middleware/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query as { slug: string };

  try {
    if (req.method === 'GET') {
      const association = await prisma.association.findUnique({
        where: { slug },
        include: { memberships: { include: { user: true } } },
      });
      if (!association) return res.status(404).json({ error: 'Association not found' });
      return res.status(200).json(association);
    }

    if (req.method === 'PUT' || req.method === 'DELETE' || req.method === 'POST') {
      const { user } = await checkAssociationPermission(req, slug, 'ADMIN');

      if (req.method === 'PUT') {
        const { name, description, isPublic } = req.body;
        const updated = await prisma.association.update({
          where: { slug },
          data: { name, description, isPublic },
        });
        return res.status(200).json(updated);
      }

      if (req.method === 'DELETE') {
        await prisma.association.delete({ where: { slug } });
        return res.status(204).end();
      }

      if (req.method === 'POST') {
        const { email, role } = req.body;
        const invitee = await prisma.user.findUnique({ where: { email } });
        if (!invitee) return res.status(404).json({ error: 'User not found' });

        const association = await prisma.association.findUnique({ where: { slug } });
        if (!association) return res.status(404).json({ error: 'Association not found' });

        const membership = await prisma.membership.create({
          data: {
            userId: invitee.id,
            associationId: association.id,
            role,
            status: 'PENDING',
          },
        });

        return res.status(201).json(membership);
      }
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err: any) {
    if (err.message === 'Unauthorized') return res.status(401).json({ error: err.message });
    if (err.message === 'Forbidden') return res.status(403).json({ error: err.message });
    return res.status(500).json({ error: 'Server error' });
  }
}