import { GET, PUT, DELETE } from "./route";
import * as db from "@/lib/db";

jest.mock("@/lib/db");

describe("/api/pastes/[id] API Endpoint", () => {
  const mockId = "test-id";
  const mockContent = "This is a test paste";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET method should return a paste by ID", async () => {
    (db.getPasteById as jest.Mock).mockResolvedValue(mockContent);

    const req = new Request(`http://localhost/api/pastes/${mockId}`, {
      method: "GET",
    });
    const res = await GET(req, { params: { id: mockId } });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(mockContent);
    expect(db.getPasteById).toHaveBeenCalledWith(mockId);
  });

  test("PUT method should update a paste by ID", async () => {
    (db.updatePasteById as jest.Mock).mockResolvedValue(undefined);

    const req = new Request(`http://localhost/api/pastes/${mockId}`, {
      method: "PUT",
      body: JSON.stringify({ content: mockContent }),
    });
    const res = await PUT(req, { params: { id: mockId } });

    expect(res.status).toBe(200);
    expect(db.updatePasteById).toHaveBeenCalledWith(mockId, {
      content: mockContent,
    });
  });

  test("DELETE method should delete a paste by ID", async () => {
    (db.deletePasteById as jest.Mock).mockResolvedValue(undefined);

    const req = new Request(`http://localhost/api/pastes/${mockId}`, {
      method: "DELETE",
    });
    const res = await DELETE(req, { params: { id: mockId } });

    expect(res.status).toBe(204);
    expect(db.deletePasteById).toHaveBeenCalledWith(mockId);
  });
});
