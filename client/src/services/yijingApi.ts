import { YijingSourceArray } from '../types/index';
import {
    getStoredYijingSources,
    updateStoredYijingSources,
    getStoredSourceForHexagram,
    isSourceStale
} from '../lib/localStorage';

// Simple event system for cache updates
type CacheEventListener = (status: 'fetching' | 'cached' | 'using-cache') => void;
const cacheEventListeners: CacheEventListener[] = [];

export const onCacheEvent = (listener: CacheEventListener) => {
    cacheEventListeners.push(listener);
    // Return cleanup function
    return () => {
        const index = cacheEventListeners.indexOf(listener);
        if (index > -1) cacheEventListeners.splice(index, 1);
    };
};

const notifyListeners = (status: 'fetching' | 'cached' | 'using-cache') => {
    cacheEventListeners.forEach(listener => listener(status));
};

export async function queryYijingTextDbForHexagrams(hexagrams: number[]): Promise<YijingSourceArray | undefined> {
    try {
        // Check if we have all hexagrams cached and not stale
        const needsFetch = hexagrams.some(hexNumber => {
            const storedSource = getStoredSourceForHexagram(hexNumber);
            return !storedSource || isSourceStale(storedSource);
        });

        if (!needsFetch) {
            console.log('Using cached Yijing data');
            notifyListeners('using-cache');
            return getStoredYijingSources();
        }

        // If we need to fetch, get fresh data from the API
        notifyListeners('fetching');
        const path = `/reference/${hexagrams.join("/")}`;
        const response = await fetch(path);
        const data: YijingSourceArray = await response.json();

        if (data && data.length > 0) {
            // Update cache with new data
            const updatedSources = updateStoredYijingSources(data);
            notifyListeners('cached');
            return updatedSources;
        }

        return data;
    } catch (error) {
        console.error("getReference error:", error);
        // On error, return cached data if available
        const cachedData = getStoredYijingSources();
        if (cachedData.length > 0) {
            notifyListeners('using-cache');
        }
        return cachedData;
    }
}