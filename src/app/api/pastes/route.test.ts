import { GET, POST } from './route'
import { kv } from '@vercel/kv'
// import { NextResponse } from 'next/server'

jest.mock('@vercel/kv', () => ({
  kv: {
    keys: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
  },
}))

const mockedKv = kv as jest.Mocked<typeof kv>

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({ data, init })),
  },
}))

describe('GET', () => {
  it('should return a list of pastes', async () => {
    const mockKeys = ['1', '2']
    const mockPastes = [
      { id: '1', content: 'Content 1' },
      { id: '2', content: 'Content 2' },
    ]

    mockedKv.keys.mockResolvedValue(mockKeys)
    mockedKv.get.mockImplementation((key) => Promise.resolve(`Content ${key}`))

    const response = await GET()
    expect(response.data).toEqual(mockPastes)
  })
})

describe('POST', () => {
  it('should create a new paste and return its id', async () => {
    const mockContent = 'New Paste Content'
    const mockRequest = {
      json: jest.fn().mockResolvedValue({ content: mockContent }),
    }

    const response = await POST(mockRequest as unknown as Request)
    const responseData = response.data
    expect(responseData.message).toBe('Paste created')
    expect(responseData.id).toBeDefined()
    expect(kv.set).toHaveBeenCalledWith(expect.any(String), mockContent)
  })
})
