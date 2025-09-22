import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { requireAuth, AuthRequest } from '../../../middleware/auth';

const prisma = new PrismaClient();

async function handler(req: NextApiRequest | AuthRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { page = '1', limit = '10', search = '', category, tag } = req.query;

      const events = await prisma.event.findMany({
        where: {
          title: { contains: search as string, mode: 'insensitive' },
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        include: {
          eventCategories: { include: { category: true } },
          eventTags: { include: { tag: true } },
          organizer: true,
        },
      });

      let filteredEvents = events.map((e) => ({
        ...e,
        categories: e.eventCategories.map((ec) => ec.category),
        tags: e.eventTags.map((et) => et.tag),
      }));

      if (category) {
        filteredEvents = filteredEvents.filter((e) =>
          e.categories.some((c) => c.name === category)
        );
      }
      if (tag) {
        filteredEvents = filteredEvents.filter((e) =>
          e.tags.some((t) => t.name === tag)
        );
      }

      return res.json(filteredEvents);
    }

    if (req.method === 'POST') {
      const authReq = req as AuthRequest;
      if (!authReq.user) return res.status(401).json({ message: 'Unauthorized' });
      if (!['ORGANIZER', 'ADMIN'].includes(authReq.user.role)) return res.status(403).json({ message: 'Forbidden' });

      const { title, description, location, date, capacity, image, categoryIds = [], tagIds = [] } = req.body;

      if (!title || !description || !date) return res.status(400).json({ message: 'Missing required fields' });

      const event = await prisma.event.create({
        data: {
          title,
          description,
          location,
          date: new Date(date),
          capacity,
          image,
          organizerId: authReq.user.id,
          eventCategories: { connect: categoryIds.map((id: number) => ({ categoryId: id })) },
          eventTags: { connect: tagIds.map((id: number) => ({ tagId: id })) },
        },
        include: {
          eventCategories: { include: { category: true } },
          eventTags: { include: { tag: true } },
          organizer: true,
        },
      });

      return res.status(201).json({
        ...event,
        categories: event.eventCategories.map((ec) => ec.category),
        tags: event.eventTags.map((et) => et.tag),
      });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default requireAuth(handler);
