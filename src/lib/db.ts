import { kv } from '@vercel/kv';

// Function to save a paste
export async function savePaste(id: string, content: string): Promise<void> {
  await kv.set(id, content);
}

// Function to retrieve a paste by ID
export async function getPaste(id: string): Promise<string | null> {
  return await kv.get(id);
}

// Function to retrieve all pastes
export async function getAllPastes(): Promise<{ id: string; content: string }[]> {
  const keys = await kv.keys('*');
  const pastes = await Promise.all(
    keys.map(async (key) => ({ id: key, content: await kv.get(key) }))
  );
  return pastes;
}

// Function to delete a paste by ID
export async function deletePaste(id: string): Promise<void> {
  await kv.del(id);
}
