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
    PUT: jest.fn(),
    DELETE: jest.fn(),
  }),
  { virtual: true }
);

// Import the mocked functions
import { GET, POST, PUT, DELETE } from "./route";

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

  // Add more tests for POST, PUT, DELETE as needed
});
