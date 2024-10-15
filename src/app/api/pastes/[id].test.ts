import { NextRequest, NextResponse } from "next/server";
import { GET, PUT, DELETE } from "./route";

describe("/api/pastes/[id] API Endpoint", () => {
  beforeEach(() => {});

  test("GET method should return a paste by ID", async () => {
    const paste = { id: "1", content: "Test paste" };
    jest.spyOn(db, "getPasteById").mockResolvedValue(paste);

    const response = await GET(new Request("http://localhost/api/pastes/1"));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(paste);
  });

  test("PUT method should update a paste by ID", async () => {
    const updatedContent = "Updated paste content";
    jest.spyOn(db, "updatePasteById").mockResolvedValue({
      id: "1",
      content: updatedContent,
    });

    const response = await PUT(
      new Request("http://localhost/api/pastes/1", {
        method: "PUT",
        body: JSON.stringify({ content: updatedContent }),
      })
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.content).toBe(updatedContent);
  });

  test("DELETE method should delete a paste by ID", async () => {
    jest.spyOn(db, "deletePasteById").mockResolvedValue(undefined);

    const response = await DELETE(
      new Request("http://localhost/api/pastes/1", {
        method: "DELETE",
      })
    );

    expect(response.status).toBe(204);
  });
});
