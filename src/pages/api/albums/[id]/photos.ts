import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import { getSession } from '../../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const session = await getSession({ req });

  if (req.method === 'GET') {
    const photos = await prisma.photo.findMany({ where: { albumId: Number(id) } });
    return res.json(photos);
  }

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    const { photos } = req.body; // array of {url, caption}
    const createdPhotos = [];
    for (const p of photos) {
      const photo = await prisma.photo.create({
        data: {
          albumId: Number(id),
          url: p.url,
          caption: p.caption,
          uploadedById: session.user.id,
        },
      });
      createdPhotos.push(photo);
    }
    return res.status(201).json(createdPhotos);
  }

  res.status(405).json({ error: 'Method not allowed' });
}