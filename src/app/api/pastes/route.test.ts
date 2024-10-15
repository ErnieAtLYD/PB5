import { GET, POST } from "./route";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

describe("GET", () => {
  it("should return a list of pastes", async () => {
    const pastes = [{ id: "1", content: "Test paste" }];
    jest.spyOn(kv, "get").mockResolvedValue(pastes);

    const response = await GET(new Request("http://localhost/api/pastes"));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(pastes);
  });
});

describe("POST", () => {
  it("should create a new paste and return its id", async () => {
    const content = "New paste content";
    jest.spyOn(kv, "set").mockResolvedValue(undefined);

    const response = await POST(
      new Request("http://localhost/api/pastes", {
        method: "POST",
        body: JSON.stringify({ content }),
      })
    );
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toHaveProperty("id");
    expect(data.message).toBe("Paste created");
  });
});
