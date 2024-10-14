import { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { content } = req.body;
    const id = Date.now().toString();
    await kv.set(id, content);
    res.status(201).json({ message: 'Paste created', id });
  } else if (req.method === 'GET') {
    const keys = await kv.keys();
    const pastes = await Promise.all(keys.map(async (key) => ({ id: key, content: await kv.get(key) })));
    res.status(200).json(pastes);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
