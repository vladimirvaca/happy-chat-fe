import { isTokenValid } from '@routes/ProtectedRoute/ProtectedUtils';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('ProtectedUtils', () => {
  const mockLocalStorage = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      })
    };
  })();

  beforeEach(() => {
    vi.resetAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage
    });
    mockLocalStorage.clear();

    // Reset the atob mock to default behavior
    vi.spyOn(window, 'atob').mockImplementation((str) => Buffer.from(str, 'base64').toString('binary'));
  });

  it('should return false when token is not present in localStorage', () => {
    mockLocalStorage.getItem.mockReturnValueOnce(null);

    expect(isTokenValid()).toBe(false);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('token');
    expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('should return true when token is valid and not expired', () => {
    const futureTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour in the future
    const payload = { exp: futureTime };
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const token = `header.${encodedPayload}.signature`;

    mockLocalStorage.getItem.mockReturnValueOnce(token);

    expect(isTokenValid()).toBe(true);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('token');
  });

  it('should return false and remove token when token is expired', () => {
    const pastTime = Math.floor(Date.now() / 1000) - 3600; // 1 hour in the past
    const payload = { exp: pastTime };
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const token = `header.${encodedPayload}.signature`;

    mockLocalStorage.getItem.mockReturnValueOnce(token);

    expect(isTokenValid()).toBe(false);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('token');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
  });

  it('should return false and remove token when token has invalid format', () => {
    mockLocalStorage.getItem.mockReturnValueOnce('invalid-token');

    expect(isTokenValid()).toBe(false);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('token');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
  });

  it('should handle tokens with special base64 characters correctly', () => {
    const futureTime = Math.floor(Date.now() / 1000) + 3600;
    const payload = { exp: futureTime, sub: 'test-user' };

    // Create a payload with special chars that need to be replaced
    let encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    encodedPayload = encodedPayload.replace(/\+/g, '-').replace(/\//g, '_');

    const token = `header.${encodedPayload}.signature`;

    mockLocalStorage.getItem.mockReturnValueOnce(token);

    expect(isTokenValid()).toBe(true);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('token');
  });

  it('should return false when token payload cannot be parsed as JSON', () => {
    // Create an invalid base64 payload that is not valid JSON when decoded
    const invalidBase64 = Buffer.from('not-valid-json').toString('base64');
    const token = `header.${invalidBase64}.signature`;

    mockLocalStorage.getItem.mockReturnValueOnce(token);
    vi.spyOn(JSON, 'parse').mockImplementationOnce(() => {
      throw new Error('Invalid JSON');
    });

    expect(isTokenValid()).toBe(false);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('token');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
  });

  it('should return false when token does not have the expected format', () => {
    // Token without the expected three parts
    mockLocalStorage.getItem.mockReturnValueOnce('invalid.token');

    expect(isTokenValid()).toBe(false);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('token');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
  });

  it('should return true when token has no expiration', () => {
    // Token with no expiration
    const payload = { sub: 'test-user' }; // No 'exp' field
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const token = `header.${encodedPayload}.signature`;

    mockLocalStorage.getItem.mockReturnValueOnce(token);

    expect(isTokenValid()).toBe(true);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('token');
  });
});
