// src/app/api/pastes/route.ts

import { NextResponse } from "next/server";
import { getAllPastes, savePaste, deletePaste, updatePaste } from "@/lib/db";

export async function GET() {
  const pastes = await getAllPastes();
  return NextResponse.json(pastes);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await deletePaste(id);
  return NextResponse.json({ message: "Paste deleted" }, { status: 200 });
}

export async function PUT(request: Request) {
  const { id, content } = await request.json();
  await updatePaste(id, content);
  return NextResponse.json({ message: "Paste updated" }, { status: 200 });
}

export async function POST(request: Request) {
  const { content } = await request.json();
  const id = Date.now().toString();
  await savePaste(id, content);
  return NextResponse.json({ message: "Paste created", id }, { status: 201 });
}
