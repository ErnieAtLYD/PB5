import { createMocks } from 'node-mocks-http';
import handler from '../../../src/app/api/pastes/[id]';
import * as db from '../../../src/lib/db';

jest.mock('../../../src/lib/db');

describe('/api/pastes/[id] API Endpoint', () => {
  const mockId = 'test-id';
  const mockContent = 'This is a test paste';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET method should return a paste by ID', async () => {
    (db.getPasteById as jest.Mock).mockResolvedValue(mockContent);

    const { req, res } = createMocks({
      method: 'GET',
      query: { id: mockId },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual(mockContent);
    expect(db.getPasteById).toHaveBeenCalledWith(mockId);
  });

  test('PUT method should update a paste by ID', async () => {
    (db.updatePasteById as jest.Mock).mockResolvedValue(undefined);

    const { req, res } = createMocks({
      method: 'PUT',
      query: { id: mockId },
      body: mockContent,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(db.updatePasteById).toHaveBeenCalledWith(mockId, mockContent);
  });

  test('DELETE method should delete a paste by ID', async () => {
    (db.deletePasteById as jest.Mock).mockResolvedValue(undefined);

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { id: mockId },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(204);
    expect(db.deletePasteById).toHaveBeenCalledWith(mockId);
  });

  test('Invalid method should return 405', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: { id: mockId },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});
