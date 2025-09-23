import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const associations = await prisma.association.findMany({ where: { isPublic: true } });
    return res.status(200).json(associations);
  }

  if (req.method === 'POST') {
    try {
      const session = await getSession({ req });
      if (!session?.user) return res.status(401).json({ error: 'Unauthorized' });

      const { name, slug, description, isPublic } = req.body;
      if (!name || !slug) return res.status(400).json({ error: 'Name and slug required' });

      const association = await prisma.association.create({
        data: {
          name,
          slug,
          description,
          isPublic: isPublic ?? true,
          createdById: session.user.id,
        },
      });

      return res.status(201).json(association);
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
