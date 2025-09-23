import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { requireAuth, AuthRequest } from '../../../../middleware/auth';

const prisma = new PrismaClient();

async function handler(req: AuthRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || Array.isArray(id)) return res.status(400).json({ message: 'Invalid id' });

  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: { registrations: true },
    });
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (req.method === 'POST') {
      if (event.capacity && event.registrations.length >= event.capacity) {
        return res.status(400).json({ message: 'Event full' });
      }

      const existing = await prisma.eventRegistration.findFirst({
        where: { userId: req.user.id, eventId: event.id },
      });
      if (existing) return res.status(400).json({ message: 'Already registered' });

      const registration = await prisma.eventRegistration.create({
        data: { userId: req.user.id, eventId: event.id },
      });
      return res.status(201).json(registration);
    }

    if (req.method === 'DELETE') {
      await prisma.eventRegistration.deleteMany({
        where: { userId: req.user.id, eventId: event.id },
      });
      return res.json({ success: true });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default requireAuth(handler);
