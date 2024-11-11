import { useState } from 'react';
import { YijingTitleDisplayProps } from '../types';


const YijingTitleDisplay = ({ yijingTitleObject }: YijingTitleDisplayProps) => {
    const [showBibliographicInfo, setShowBibliographicInfo] = useState(false);
    return (
        <div className="text-left my-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            <button
                className="w-full hover:bg-gray-100 dark:hover:bg-gray-800 p-3 rounded transition-colors"
                onClick={() => setShowBibliographicInfo(!showBibliographicInfo)}
            >
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
                    {yijingTitleObject.translator || yijingTitleObject.author}
                </h1>

                {showBibliographicInfo && (
                    <div className="mt-3 text-gray-600 dark:text-gray-400 space-y-1">
                        <p className="font-medium">{yijingTitleObject.title}</p>
                        <p className="text-sm">{yijingTitleObject.year}</p>
                    </div>
                )}
            </button>
        </div>
    )
}

export default YijingTitleDisplay;