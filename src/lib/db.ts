// src/lib/db.ts

import { kv } from "@vercel/kv";

// Function to save a paste
export async function savePaste(id: string, content: string): Promise<void> {
  await kv.set(id, content);
}

// Function to update a paste by ID
export async function updatePasteById(
  id: string,
  content: string
): Promise<void> {
  await kv.set(id, content);
}

// Function to retrieve a paste by ID
export async function getPasteById(id: string): Promise<string | null> {
  return await kv.get(id);
}

// Function to retrieve all pastes
export async function getAllPastes(): Promise<
  { id: string; content: string }[]
> {
  const keys = await kv.keys("*");
  const pastes = await Promise.all(
    keys.map(async (key) => {
      const content = await kv.get(key);
      if (typeof content !== "string") {
        throw new Error(`Unexpected content type for key: ${key}`);
      }
      return { id: key, content };
    })
  );
  return pastes;
}

// Function to delete a paste by ID
export async function deletePasteById(id: string): Promise<void> {
  await kv.del(id);
}
