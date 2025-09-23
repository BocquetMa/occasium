import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import { getSession } from '../../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  const session = await getSession({ req });

  if (req.method === 'GET') {
    const association = await prisma.association.findUnique({
      where: { slug: slug as string },
      include: { albums: true },
    });
    return res.json(association?.albums || []);
  }

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    const { title, description, isPublic } = req.body;
    const association = await prisma.association.findUnique({ where: { slug: slug as string } });
    if (!association) return res.status(404).json({ error: 'Association not found' });

    const album = await prisma.photoAlbum.create({
      data: {
        title,
        description,
        isPublic,
        associationId: association.id,
        createdById: session.user.id,
      },
    });
    return res.status(201).json(album);
  }

  res.status(405).json({ error: 'Method not allowed' });
}