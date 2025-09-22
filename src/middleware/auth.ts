import { NextApiRequest, NextApiResponse } from 'next';
import { verifyJwt } from '../utils/jwt';

export interface AuthRequest extends NextApiRequest {
  user?: any;
}

export function requireAuth(handler: (req: AuthRequest, res: NextApiResponse) => any) {
  return async (req: AuthRequest, res: NextApiResponse) => {
    const token = req.cookies['token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = verifyJwt(token);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user; 
    return handler(req, res);
  };
}

export function getUser(req: NextApiRequest) {
  const token = req.cookies['token'];
  if (!token) return null;
  return verifyJwt(token);
}
