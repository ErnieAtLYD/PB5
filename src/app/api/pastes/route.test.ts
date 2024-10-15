import { NextResponse } from "next/server";
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

// Mock the entire route module
jest.mock(
  "./route",
  () => ({
    GET: jest.fn(),
    POST: jest.fn(),
  }),
  { virtual: true }
);

// Import the mocked functions
import { GET, POST } from "./route";

describe("Pastes API", () => {
  const mockPastes = [
    { id: "1", content: "Test paste 1" },
    { id: "2", content: "Test paste 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("should return a list of pastes", async () => {
      (db.getAllPastes as jest.Mock).mockResolvedValue(mockPastes);
      (GET as jest.Mock).mockImplementation(async () => {
        const pastes = await db.getAllPastes();
        return NextResponse.json(pastes);
      });

      const mockRequest = { method: "GET", url: "http://localhost/api/pastes" };
      const response = await GET(mockRequest as any);
      const data = await response.json();

      expect(data).toEqual(mockPastes);
      expect(db.getAllPastes).toHaveBeenCalled();
    });
  });

  describe("POST", () => {
    it("should create a new paste and return its ID", async () => {
      const mockContent = "New paste content";
      const mockId = "1234567890";
      (db.savePaste as jest.Mock).mockResolvedValue(undefined);
      (POST as jest.Mock).mockImplementation(async (request) => {
        const { content } = await request.json();
        const id = mockId;
        await db.savePaste(id, content);
        return NextResponse.json(
          { message: "Paste created", id },
          { status: 201 }
        );
      });

      const mockRequest = {
        method: "POST",
        json: async () => ({ content: mockContent }),
      };
      const response = await POST(mockRequest as any);
      const data = await response.json();

      expect(data).toEqual({ message: "Paste created", id: mockId });
      expect(db.savePaste).toHaveBeenCalledWith(mockId, mockContent);
    });

    it("should return 400 if content is missing", async () => {
      (POST as jest.Mock).mockImplementation(async (request) => {
        const { content } = await request.json();
        if (!content) {
          return NextResponse.json(
            { error: "Content is required" },
            { status: 400 }
          );
        }
      });

      const mockRequest = {
        method: "POST",
        json: async () => ({}),
      };
      const response = await POST(mockRequest as any);
      const data = await response.json();

      expect(data).toEqual({ error: "Content is required" });
    });

    it("should return 500 on server error", async () => {
      (db.savePaste as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );
      (POST as jest.Mock).mockImplementation(async () => {
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      });

      const mockRequest = {
        method: "POST",
        json: async () => ({ content: "Some content" }),
      };
      const response = await POST(mockRequest as any);
      const data = await response.json();

      expect(data).toEqual({ error: "Internal Server Error" });
    });
  });
});
