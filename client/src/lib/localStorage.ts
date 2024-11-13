import { YijingSourceArray } from '../types/index';

interface TimestampedYijingSource {
    data: YijingSourceArray[number];  // Single source from the array
    lastUpdated: string;  // ISO timestamp
}

export const getStoredYijingSources = (): YijingSourceArray => {
    const stored = localStorage.getItem('yijingSources');
    if (!stored) return [];

    const timestampedSources: TimestampedYijingSource[] = JSON.parse(stored);
    // Strip timestamps when returning to maintain type compatibility
    return timestampedSources.map(item => item.data);
};

export const updateStoredYijingSources = (newSources: YijingSourceArray) => {
    const stored = localStorage.getItem('yijingSources');
    const storedSources: TimestampedYijingSource[] = stored ? JSON.parse(stored) : [];

    // Create a map of existing sources for easy lookup and update
    const sourceMap = new Map<string, TimestampedYijingSource>();
    storedSources.forEach(source => {
        const key = `${source.data.title.title}-${source.data.title.author}-${source.data.title.translator}`;
        sourceMap.set(key, source);
    });

    // Update or add new sources
    newSources.forEach(newSource => {
        const key = `${newSource.title.title}-${newSource.title.author}-${newSource.title.translator}`;
        const existingSource = sourceMap.get(key);
        const now = new Date().toISOString();

        if (existingSource) {
            const mergedSource: TimestampedYijingSource = {
                data: {
                    ...existingSource.data,
                    ...newSource,
                    title: { ...existingSource.data.title, ...newSource.title }
                },
                lastUpdated: now
            };
            sourceMap.set(key, mergedSource);
        } else {
            sourceMap.set(key, {
                data: newSource,
                lastUpdated: now
            });
        }
    });

    // Convert map back to array
    const updatedSources = Array.from(sourceMap.values());

    // Store updated array
    localStorage.setItem('yijingSources', JSON.stringify(updatedSources));

    // Strip timestamps when returning to maintain type compatibility
    return updatedSources.map(item => item.data);
};

// Utility function to check if source needs update
export const isSourceStale = (source: TimestampedYijingSource, daysUntilStale: number = 7): boolean => {
    const lastUpdate = new Date(source.lastUpdated);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastUpdate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > daysUntilStale;
};

// Helper to find source by hexagram number
export const getStoredSourceForHexagram = (hexagramNumber: number): TimestampedYijingSource | null => {
    const stored = localStorage.getItem('yijingSources');
    if (!stored) return null;

    const sources: TimestampedYijingSource[] = JSON.parse(stored);
    return sources.find(source => hexagramNumber in source.data) || null;
};


export const debugInspectCache = () => {
    const stored = localStorage.getItem('yijingSources');
    if (!stored) {
        console.log('Cache is empty');
        return;
    }

    const sources: TimestampedYijingSource[] = JSON.parse(stored);

    console.group('🔍 Cache Contents');
    sources.forEach(source => {
        const title = source.data.title;
        console.group(`📚 ${title.translator || title.author} - ${title.title}`);
        console.log('Last Updated:', new Date(source.lastUpdated).toLocaleString());
        console.log('Hexagrams:', Object.keys(source.data).filter(key => key !== 'title').join(', '));
        console.groupEnd();
    });
    console.groupEnd();

    // Return the raw data in case needed for further inspection
    return sources;
};

// Add to window for easy console access
declare global {
    interface Window {
        debugCache: () => TimestampedYijingSource[] | void;
    }
}

window.debugCache = debugInspectCache;
