import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (req.method === 'GET') {
    const invitation = await prisma.invitation.findUnique({ where: { token: token as string } });
    if (!invitation) return res.status(404).json({ error: 'Invitation not found' });
    if (invitation.expiresAt < new Date()) return res.status(400).json({ error: 'Invitation expired' });
    return res.status(200).json(invitation);
  }

  if (req.method === 'POST') {
    const { userId } = req.body;
    const invitation = await prisma.invitation.findUnique({ where: { token: token as string } });
    if (!invitation) return res.status(404).json({ error: 'Invitation not found' });

    await prisma.membership.create({
      data: {
        userId,
        associationId: invitation.associationId,
        role: invitation.role,
        status: 'ACTIVE',
      },
    });

    const updated = await prisma.invitation.update({
      where: { id: invitation.id },
      data: { acceptedAt: new Date() },
    });

    return res.status(200).json(updated);
  }

  res.status(405).json({ error: 'Method not allowed' });
}