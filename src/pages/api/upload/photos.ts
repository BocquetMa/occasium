import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp';
import { prisma } from '../../../lib/prisma';
import { getSession } from '../../../lib/auth';

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files: any) => {
    if (err) return res.status(500).json({ error: err.message });

    const uploadedFiles = Array.isArray(files.photos) ? files.photos : [files.photos];
    const photosData = [];

    for (const file of uploadedFiles) {
      const buffer = fs.readFileSync(file.filepath);
      const compressedBuffer = await sharp(buffer).resize(1920).jpeg({ quality: 80 }).toBuffer();
      const url = `/uploads/${file.newFilename}.jpg`;
      fs.writeFileSync(`./public${url}`, compressedBuffer);
      const photo = await prisma.photo.create({
        data: { albumId: Number(fields.albumId), url, uploadedById: session.user.id },
      });
      photosData.push(photo);
    }

    res.json(photosData);
  });
}