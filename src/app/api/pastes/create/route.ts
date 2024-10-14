import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    // Validate the input
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // Generate a unique ID for the paste
    const id = Date.now().toString();

    // Save the paste content to the database
    await kv.set(id, content);

    // Return a success response with the paste ID
    return NextResponse.json({ message: 'Paste created', id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
