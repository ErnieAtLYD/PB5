import { kv } from '@vercel/kv';

export const createPaste = async (id: string, content: string) => {
  await kv.set(id, content);
  return { message: 'Paste created', id };
};

export const readPaste = async (id: string) => {
  const content = await kv.get(id);
  return content ? { id, content } : null;
};

export const updatePaste = async (id: string, newContent: string) => {
  await kv.set(id, newContent);
  return { message: 'Paste updated', id };
};

export const deletePaste = async (id: string) => {
  await kv.delete(id);
  return { message: 'Paste deleted', id };
};

export const listPastes = async () => {
  const keys = await kv.keys();
  const pastes = await Promise.all(keys.map(async (key) => ({ id: key, content: await kv.get(key) })));
  return pastes;
};
