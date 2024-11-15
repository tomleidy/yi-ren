// client/src/services/yijingApi.test.ts

import { describe, it, expect, vi } from 'vitest'
import { queryYijingTextDbForHexagrams, onCacheEvent } from './yijingApi'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('yijingApi', () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });

    it('calls API with correct hexagram numbers', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([])
        });

        await queryYijingTextDbForHexagrams([1, 2]);
        expect(mockFetch).toHaveBeenCalledWith('/reference/1/2');
    });

    it('handles API errors gracefully', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        const result = await queryYijingTextDbForHexagrams([1]);
        expect(result).toEqual([]);
    });

    it('notifies event listeners', () => {
        const listener = vi.fn();
        const cleanup = onCacheEvent(listener);

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([])
        });

        queryYijingTextDbForHexagrams([1]);
        expect(listener).toHaveBeenCalledWith('fetching');

        cleanup();
    });

    it('removes event listeners on cleanup', () => {
        const listener = vi.fn();
        const cleanup = onCacheEvent(listener);
        cleanup();

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([])
        });

        queryYijingTextDbForHexagrams([1]);
        expect(listener).not.toHaveBeenCalled();
    });
});
