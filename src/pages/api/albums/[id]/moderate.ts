import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from '../../../../lib/auth';

export const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const session = await getSession({ req });

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'PUT') {
    const { action } = req.body; // approve or reject
    const status = action === 'approve' ? 'APPROVED' : 'REJECTED';
    const photo = await prisma.photo.update({
      where: { id: Number(id) },
      data: { moderationStatus: status },
    });
    return res.json(photo);
  }

  res.status(405).json({ error: 'Method not allowed' });
}