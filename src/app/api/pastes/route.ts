// src/app/api/pastes/route.ts

import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET() {
  const keys = await kv.keys('*')
  const pastes = await Promise.all(
    keys.map(async (key) => ({ id: key, content: await kv.get(key) }))
  )
  return NextResponse.json(pastes)
}

export async function POST(request: Request) {
  const { content } = await request.json()
  const id = Date.now().toString()
  await kv.set(id, content)
  return NextResponse.json({ message: 'Paste created', id }, { status: 201 })
}
