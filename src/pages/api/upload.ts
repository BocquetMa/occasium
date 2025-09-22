import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { requireAuth, AuthRequest } from '../../middleware/auth';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export const config = {
  api: { bodyParser: false },
};

async function handler(req: NextApiRequest | AuthRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const authReq = req as AuthRequest;
  if (!authReq.user || !['ORGANIZER', 'ADMIN'].includes(authReq.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    const uploadedFile = files.file;
    if (!uploadedFile) return res.status(400).json({ message: 'No file uploaded' });

    const file: File = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;

    if (process.env.CLOUDINARY_URL) {
      try {
        const { v2: cloudinary } = await import('cloudinary') as { v2: any };
        cloudinary.config({ secure: true });
        const result = await cloudinary.uploader.upload(file.filepath, { folder: 'events' });
        return res.status(200).json({ url: result.secure_url });
      } catch (uploadErr) {
        console.error(uploadErr);
        return res.status(500).json({ message: 'Cloudinary upload failed' });
      }
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const ext = path.extname(file.originalFilename || '');
    const fileName = `${uuidv4()}${ext}`;
    const destPath = path.join(uploadDir, fileName);

    fs.copyFileSync(file.filepath, destPath);
    fs.unlinkSync(file.filepath);

    return res.status(200).json({ url: `/uploads/${fileName}` });
  });
}

export default requireAuth(handler);
