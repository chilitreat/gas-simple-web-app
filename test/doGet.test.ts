import { describe, it, expect, vi } from 'vitest';
import { doGet } from '../src/doGet';
import { HTTPClient } from '../src/utils/HTTPClient';

vi.mock('../src/utils/HTTPClient');

// mock UrlFetchApp
global.UrlFetchApp = {
  fetch: vi.fn(),
  fetchAll: vi.fn(),
  getRequest: vi.fn(),
};

global.ContentService = {
  createTextOutput: vi.fn().mockReturnValue({
    setMimeType: vi.fn().mockReturnThis(),
    getContent: vi
      .fn()
      .mockReturnValue(
        '{"method":"GET","message":{"userId":1,"id":1,"title":"Test Title","body":"Test Body"}}'
      ),
    getMimeType: vi.fn().mockReturnValue('application/json'),
  }),
  MimeType: {
    JSON: 'application/json' as unknown as typeof GoogleAppsScript.Content.MimeType.JSON,
  } as typeof GoogleAppsScript.Content.MimeType,
};

describe('doGet', () => {
  it('should return the correct payload', () => {
    const mockResponse = {
      userId: 1,
      id: 1,
      title: 'Test Title',
      body: 'Test Body',
      json: () => ({
        userId: 1,
        id: 1,
        title: 'Test Title',
        body: 'Test Body',
      }),
    };

    HTTPClient.prototype.request = vi.fn().mockReturnValue(mockResponse);

    const result = doGet();
    const expectedPayload = JSON.stringify({
      method: 'GET',
      message: {
        userId: 1,
        id: 1,
        title: 'Test Title',
        body: 'Test Body',
      },
    });

    expect(result.getContent()).toBe(expectedPayload);
    expect(result.getMimeType()).toBe(ContentService.MimeType.JSON);
  });
});
