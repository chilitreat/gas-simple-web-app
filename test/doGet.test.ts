import { describe, it, expect, vi } from 'vitest';
import { doGet } from '../src/doGet';

describe('doGet', () => {
  it('should return a JSON response with the correct payload', () => {
    const mockCreateTextOutput = {
      setMimeType: vi.fn().mockReturnThis(),
    };
    const mockContentService = {
      createTextOutput: vi.fn().mockReturnValue(mockCreateTextOutput),
      MimeType: {
        JSON: 'application/json',
      },
    };

    global.ContentService = mockContentService;

    const result = doGet();

    expect(mockContentService.createTextOutput).toHaveBeenCalledWith(
      JSON.stringify({
        method: 'GET',
        message: 'doGet function called',
      })
    );
    expect(mockCreateTextOutput.setMimeType).toHaveBeenCalledWith(
      mockContentService.MimeType.JSON
    );
    expect(result).toBe(mockCreateTextOutput);
  });
});
