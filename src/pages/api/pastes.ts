import { NextApiRequest, NextApiResponse } from 'next';

let pastes = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { content } = req.body;
    pastes.push({ content });
    res.status(201).json({ message: 'Paste created' });
  } else if (req.method === 'GET') {
    res.status(200).json(pastes);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
