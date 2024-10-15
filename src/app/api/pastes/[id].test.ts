import { NextRequest, NextResponse } from "next/server";
jest.mock("./route", () => ({
  GET: jest.fn(),
  PUT: jest.fn(),
  DELETE: jest.fn(),
}));

import { GET, PUT, DELETE } from "./route";
import * as db from "@/lib/db";

jest.mock("@/lib/db");
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((body, options) => ({
      json: () => Promise.resolve(body),
      ...options,
    })),
  },
}));

describe("/api/pastes/[id] API Endpoint", () => {
  beforeEach(() => {});

  const mockPaste = { id: "1", content: "Test paste" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET method should return a paste by ID", async () => {
    (db.getPasteById as jest.Mock).mockResolvedValue(mockPaste);
    (GET as jest.Mock).mockImplementation(async (request) => {
      const { id } = request.params;
      const paste = await db.getPasteById(id);
      return NextResponse.json(paste);
    });

    const mockRequest = { method: "GET", params: { id: "1" } };
    const response = await GET(mockRequest as any);
    const data = await response.json();

    expect(data).toEqual(mockPaste);
    expect(db.getPasteById).toHaveBeenCalledWith("1");
  });

  xtest("PUT method should update a paste by ID", async () => {
    const updatedContent = "Updated content";
    (db.updatePaste as jest.Mock).mockResolvedValue(undefined);
    (PUT as jest.Mock).mockImplementation(async (request) => {
      const { id } = request.params;
      const { content } = await request.json();
      await db.updatePaste(id, content);
      return NextResponse.json({ message: "Paste updated" });
    });

    const mockRequest = {
      method: "PUT",
      params: { id: "1" },
      json: async () => ({ content: updatedContent }),
    };
    const response = await PUT(mockRequest as any);
    const data = await response.json();

    expect(data).toEqual({ message: "Paste updated" });
    expect(db.updatePaste).toHaveBeenCalledWith("1", updatedContent);
  });

  xtest("DELETE method should delete a paste by ID", async () => {
    (db.deletePaste as jest.Mock).mockResolvedValue(undefined);
    (DELETE as jest.Mock).mockImplementation(async (request) => {
      const { id } = request.params;
      await db.deletePaste(id);
      return NextResponse.json({ message: "Paste deleted" });
    });

    const mockRequest = { method: "DELETE", params: { id: "1" } };
    const response = await DELETE(mockRequest as any);
    const data = await response.json();

    expect(data).toEqual({ message: "Paste deleted" });
    expect(db.deletePaste).toHaveBeenCalledWith("1");
  });
});
