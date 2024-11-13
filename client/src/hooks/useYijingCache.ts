import { useState, useEffect } from 'react';
import { getStoredSourceForHexagram, isSourceStale } from '../lib/localStorage';
import { onCacheEvent } from '../services/yijingApi';

type CacheStatusType = 'fresh' | 'stale' | 'uncached';
type ActivityType = 'idle' | 'fetching' | 'caching' | 'using-cache';

interface CacheStatus {
    status: CacheStatusType;
    lastUpdated: string | null;
    activity: ActivityType;
}

interface CacheCheckResult {
    status: CacheStatusType;
    lastUpdated: string | null;
}

export function useYijingCache(hexagrams: number[]) {
    const [cacheStatus, setCacheStatus] = useState<CacheStatus>({
        status: 'uncached',
        lastUpdated: null,
        activity: 'idle'
    });

    const checkCacheStatus = (): CacheCheckResult | null => {
        if (!hexagrams.length) return null;

        const statuses = hexagrams.map(hexNumber => {
            const storedSource = getStoredSourceForHexagram(hexNumber);
            if (!storedSource) {
                return { status: 'uncached' as const, lastUpdated: null };
            }
            return {
                status: isSourceStale(storedSource) ? 'stale' as const : 'fresh' as const,
                lastUpdated: storedSource.lastUpdated
            };
        });

        return statuses.reduce<CacheCheckResult>((worst, current) => {
            if (worst.status === 'uncached' || current.status === 'uncached') {
                return { status: 'uncached', lastUpdated: null };
            }
            if (worst.status === 'stale' || current.status === 'stale') {
                return {
                    status: 'stale',
                    lastUpdated: worst.lastUpdated || current.lastUpdated
                };
            }
            return {
                status: 'fresh',
                lastUpdated: worst.lastUpdated || current.lastUpdated
            };
        }, { status: 'fresh', lastUpdated: null });
    };

    useEffect(() => {
        const cleanup = onCacheEvent((activity) => {
            if (activity === 'fetching') {
                setCacheStatus(prev => ({
                    ...prev,
                    status: 'uncached', // Keep red while fetching
                    activity: 'fetching'
                }));
            } else if (activity === 'cached') {
                // First show caching activity with uncached status
                setCacheStatus(prev => ({
                    ...prev,
                    status: 'uncached',
                    activity: 'caching'
                }));

                // After the activity message, update both status and activity
                setTimeout(() => {
                    const newStatus = checkCacheStatus();
                    setCacheStatus(prev => ({
                        ...(newStatus || prev),
                        activity: 'idle'
                    }));
                }, 2000);
            } else {
                // Using cache - show the activity first
                const newStatus = checkCacheStatus();
                setCacheStatus(prev => ({
                    ...(newStatus || prev),
                    activity: 'using-cache'
                }));

                setTimeout(() => {
                    setCacheStatus(prev => ({
                        ...prev,
                        activity: 'idle'
                    }));
                }, 2000);
            }
        });

        return cleanup;
    }, [hexagrams]);

    // Initial status check
    useEffect(() => {
        const newStatus = checkCacheStatus();
        if (newStatus) {
            setCacheStatus(prev => ({
                ...prev,
                ...newStatus
            }));
        }
    }, [hexagrams]);

    return cacheStatus;
}