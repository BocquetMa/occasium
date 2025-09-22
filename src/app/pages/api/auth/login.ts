import type { NextApiRequest, NextApiResponse } from 'next';
import { compare } from '../../../../utils/hash';
import { signJwt } from '../../../../utils/jwt';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = signJwt({ id: user.id, email: user.email, role: user.role });

  res.setHeader(
    'Set-Cookie',
    `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax`
  );

  const { password: _, ...publicUser } = user;
  res.status(200).json({ success: true, user: publicUser });
}
