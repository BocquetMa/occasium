import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import { getSession } from '../../../../lib/auth';
import { sendNotification } from '../../../../lib/notifications';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    const { type, title, message, entityId } = req.body;
    const association = await prisma.association.findUnique({ where: { slug: slug as string } });
    if (!association) return res.status(404).json({ error: 'Association not found' });

    const memberships = await prisma.membership.findMany({
      where: { associationId: association.id, status: 'ACTIVE' },
    });

    const notifications = [];
    for (const membership of memberships) {
      const notif = await sendNotification(membership.userId, type, title, message, entityId);
      notifications.push(notif);
    }

    return res.json(notifications);
  }

  res.status(405).json({ error: 'Method not allowed' });
}