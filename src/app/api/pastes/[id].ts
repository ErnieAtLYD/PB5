import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db'; // Adjust the path as necessary
import { Paste } from '../../../types'; // Adjust the path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const paste = await db.getPasteById(id); // Implement this function in your db module
        if (!paste) {
          return res.status(404).json({ error: 'Paste not found' });
        }
        return res.status(200).json(paste);
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    case 'PUT':
      try {
        const updatedPaste = await db.updatePasteById(id, req.body); // Implement this function
        return res.status(200).json(updatedPaste);
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    case 'DELETE':
      try {
        await db.deletePasteById(id); // Implement this function
        return res.status(204).end();
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
