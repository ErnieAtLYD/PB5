// src/app/api/pastes/route.ts

import { NextResponse } from "next/server";
import { getAllPastes, savePaste } from "@/lib/db";

export async function GET() {
  const pastes = await getAllPastes();
  return NextResponse.json(pastes);
}

export async function POST(request: Request) {
  const { content } = await request.json();
  const id = Date.now().toString();
  await savePaste(id, content);
  return NextResponse.json({ message: "Paste created", id }, { status: 201 });
}
