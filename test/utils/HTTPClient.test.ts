import { describe, it, expect, vi } from 'vitest';
import { HTTPClient } from '../../src/utils/HTTPClient';

describe('HTTPClient', () => {
  const mockUrlFetchApp = {
    fetch: vi.fn(),
  };

  const httpClient = new HTTPClient(mockUrlFetchApp as any);

  it('should return a JSON response', () => {
    const mockResponse = {
      getContentText: vi.fn().mockReturnValue('{"key": "value"}'),
      getAllHeaders: vi.fn().mockReturnValue({}),
      getResponseCode: vi.fn().mockReturnValue(200),
    };

    mockUrlFetchApp.fetch.mockReturnValue(mockResponse);

    const response = httpClient.request<{ key: string }>(
      'https://example.com',
      {
        method: 'get',
      }
    );

    expect(response.json()).toEqual({ key: 'value' });
    expect(response.statusCode()).toBe(200);
  });

  it('should return raw response text', () => {
    const mockResponse = {
      getContentText: vi.fn().mockReturnValue('raw response text'),
      getAllHeaders: vi.fn().mockReturnValue({}),
      getResponseCode: vi.fn().mockReturnValue(200),
    };

    mockUrlFetchApp.fetch.mockReturnValue(mockResponse);

    const response = httpClient.request<string>('https://example.com', {
      method: 'get',
    });

    expect(response.raw()).toBe('raw response text');
  });

  it('should return response headers', () => {
    const mockResponse = {
      getContentText: vi.fn().mockReturnValue(''),
      getAllHeaders: vi
        .fn()
        .mockReturnValue({ 'Content-Type': 'application/json' }),
      getResponseCode: vi.fn().mockReturnValue(200),
    };

    mockUrlFetchApp.fetch.mockReturnValue(mockResponse);

    const response = httpClient.request<string>('https://example.com', {
      method: 'get',
    });

    expect(response.headers()).toEqual({ 'Content-Type': 'application/json' });
  });

  it('should handle fetch errors', () => {
    mockUrlFetchApp.fetch.mockImplementation(() => {
      throw new Error('Fetch error');
    });

    expect(() => {
      httpClient.request<string>('https://example.com', {
        method: 'get',
      });
    }).toThrow('Failed to fetch data');
  });
});
