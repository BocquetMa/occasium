import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from '../../../../utils/hash';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, name, role } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields' });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ error: 'User already exists' });

  const hashedPassword = await hash(password);

  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword, role: role?.toUpperCase() || 'USER' },
  });

  const { password: _, ...publicUser } = user;
  res.status(201).json({ success: true, user: publicUser });
}
