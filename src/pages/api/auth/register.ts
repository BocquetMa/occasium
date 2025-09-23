import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from '../../../utils/hash';
import { prisma } from '../../../lib/prisma';
import type { Role } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, firstName, lastName, globalRole } = req.body;
  if (!email || !password || !firstName) 
    return res.status(400).json({ error: 'Missing fields' });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ error: 'User already exists' });

  const hashedPassword = await hash(password);

  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      globalRole: globalRole as Role || 'VISITEUR', 
    },
  });

  const { password: _, ...publicUser } = user;
  res.status(201).json({ success: true, user: publicUser });
}
