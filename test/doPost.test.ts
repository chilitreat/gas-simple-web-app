import { describe, it, expect, vi } from 'vitest';
import { doPost } from '../src/doPost';

describe('doPost', () => {
  it('should return a JSON response with the correct payload', () => {
    const mockEvent = {} as GoogleAppsScript.Events.AppsScriptHttpRequestEvent;
    const mockContentService = {
      createTextOutput: vi.fn().mockReturnThis(),
      setMimeType: vi.fn().mockReturnThis(),
      MimeType: {
        JSON: 'application/json',
      },
    };

    global.ContentService = mockContentService;

    const result = doPost(mockEvent);

    expect(mockContentService.createTextOutput).toHaveBeenCalledWith(
      JSON.stringify({
        method: 'POST',
        message: 'doPost function called',
      })
    );
    expect(mockContentService.setMimeType).toHaveBeenCalledWith(
      mockContentService.MimeType.JSON
    );
    expect(result).toBe(mockContentService);
  });
});
