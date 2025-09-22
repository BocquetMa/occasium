import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { requireAuth, AuthRequest } from '../../../middleware/auth';

const prisma = new PrismaClient();

async function handler(req: NextApiRequest | AuthRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || Array.isArray(id) || isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid or missing id' });
  }
  const eventId = Number(id);

  try {
    if (req.method === 'GET') {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
          eventCategories: { include: { category: true } },
          eventTags: { include: { tag: true } },
          organizer: true,
          registrations: true,
        },
      });
      if (!event) return res.status(404).json({ message: 'Event not found' });

      return res.json({
        ...event,
        categories: event.eventCategories.map((ec) => ec.category),
        tags: event.eventTags.map((et) => et.tag),
      });
    }

    const authReq = req as AuthRequest;
    if (!authReq.user) return res.status(401).json({ message: 'Unauthorized' });

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const isOwnerOrAdmin = authReq.user.id === event.organizerId || authReq.user.role === 'ADMIN';
    if (!isOwnerOrAdmin) return res.status(403).json({ message: 'Forbidden' });

    if (req.method === 'PUT') {
      const { title, description, location, date, capacity, image, categoryIds, tagIds } = req.body;

      const updated = await prisma.event.update({
        where: { id: eventId },
        data: {
          title,
          description,
          location,
          date: date ? new Date(date) : undefined,
          capacity,
          image,
          eventCategories: categoryIds
            ? { set: categoryIds.map((cid: number) => ({ categoryId: cid })) }
            : undefined,
          eventTags: tagIds
            ? { set: tagIds.map((tid: number) => ({ tagId: tid })) }
            : undefined,
        },
        include: {
          eventCategories: { include: { category: true } },
          eventTags: { include: { tag: true } },
          organizer: true,
          registrations: true,
        },
      });

      return res.json({
        ...updated,
        categories: updated.eventCategories.map((ec) => ec.category),
        tags: updated.eventTags.map((et) => et.tag),
      });
    }

    if (req.method === 'DELETE') {
      await prisma.event.delete({ where: { id: eventId } });
      return res.json({ success: true });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default requireAuth(handler);
