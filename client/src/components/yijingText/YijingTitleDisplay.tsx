import { useState } from 'react';
import { YijingTitleDisplayProps } from '../types';

const YijingTitleDisplay = ({ yijingTitleObject }: YijingTitleDisplayProps) => {
    const [showBibliographicInfo, setShowBibliographicInfo] = useState(false);

    return (
        <div className="text-left my-4 sm:my-6 border-b border-gray-200 dark:border-gray-700 pb-3 sm:pb-4 px-2 sm:px-4">
            <button
                className="w-full hover:bg-gray-100 dark:hover:bg-gray-800 p-2 sm:p-3 rounded transition-colors"
                onClick={() => setShowBibliographicInfo(!showBibliographicInfo)}
            >
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
                    {yijingTitleObject.translator || yijingTitleObject.author}
                </h1>

                {showBibliographicInfo && (
                    <div className="mt-2 sm:mt-3 text-gray-600 dark:text-gray-400 space-y-1">
                        <p className="font-medium text-sm sm:text-base">{yijingTitleObject.title}</p>
                        <p className="text-xs sm:text-sm">{yijingTitleObject.year}</p>
                    </div>
                )}
            </button>
        </div>
    );
};

export default YijingTitleDisplay;