import { YijingSourceObject } from '../../types/index';
import { YijingTextDisplayProps } from '../../types/index';
import { useActiveReading } from '../../context/ActiveReadingContext';
import YijingTextDisplaySingle from './YijingTextDisplaySingle';
import YijingTitleDisplay from './YijingTitleDisplay';
import { useYijingCache } from '../../hooks/useYijingCache';

const CacheStatusDot: React.FC<{
    status: 'fresh' | 'stale' | 'uncached',
    activity: 'idle' | 'fetching' | 'caching' | 'using-cache'
}> = ({ status, activity }) => {
    const baseColors = {
        fresh: 'bg-green-500',
        stale: 'bg-yellow-500',
        uncached: 'bg-red-500'
    };

    const labels = {
        fresh: 'Cache is up to date',
        stale: 'Cache needs refresh',
        uncached: 'Not cached'
    };

    const activityLabels = {
        idle: '',
        fetching: '(Fetching new data...)',
        caching: '(Saving to cache...)',
        'using-cache': '(Loading from cache...)'
    };

    // Add pulse animation when active
    const isActive = activity !== 'idle';
    const pulseClass = isActive ? 'animate-pulse' : '';

    return (
        <div className="inline-flex items-center gap-2">
            <div
                className={`w-2.5 h-2.5 rounded-full ${baseColors[status]} ${pulseClass}`}
                title={`${labels[status]} ${activityLabels[activity]}`}
            />
            {activity !== 'idle' && (
                <span className="text-sm italic">
                    {activityLabels[activity]}
                </span>
            )}
        </div>
    );
};

const YijingTextDisplay = ({ displayReading }: YijingTextDisplayProps) => {
    const { yijingSourceArray, activeReading } = useActiveReading();
    const cacheStatus = useYijingCache(activeReading || []);

    return (
        <div className="max-w-screen-lg mx-auto">
            {displayReading && activeReading && (
                <>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 px-4">
                        <CacheStatusDot
                            status={cacheStatus.status}
                            activity={cacheStatus.activity}
                        />
                        {cacheStatus.lastUpdated && (
                            <span>
                                Last updated: {new Date(cacheStatus.lastUpdated).toLocaleDateString()}
                            </span>
                        )}
                    </div>

                    {yijingSourceArray.map((entry: YijingSourceObject, index: number) => (
                        <div key={`source-${index}`} className="mb-6 sm:mb-8">
                            <YijingTitleDisplay yijingTitleObject={entry.title} />
                            {activeReading.map(hexNumber => (
                                <YijingTextDisplaySingle
                                    key={`${index}-${hexNumber}`}
                                    entry={entry}
                                    hexagramNumber={hexNumber}
                                    sourceIndex={index}
                                />
                            ))}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default YijingTextDisplay;