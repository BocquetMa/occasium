import { NextApiRequest, NextApiResponse } from 'next';
import { verifyJwt } from '../utils/jwt';

export function auth(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies['token'];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }
  const user = verifyJwt(token);
  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }
  return user;
}
