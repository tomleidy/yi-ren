import { useState } from 'react';
import { useActiveReading } from '../../context/ActiveReadingContext';
import { YijingTextDisplaySingleProps } from '../../types/index';

const YijingTextDisplaySingle = ({ entry, hexagramNumber }: YijingTextDisplaySingleProps) => {
    const { columnOrder } = entry.title;
    const hexagramData = entry[hexagramNumber];
    const { movingLines } = useActiveReading();
    if (!hexagramData) return null;
    const [showHexagram, setShowHexagram] = useState(false);

    const cap = (text: string) => text[0].toUpperCase() + text.slice(1,)

    return (
        <div className="px-2 sm:px-4 mb-4">
            <div className="flex flex-col sm:flex-row items-start">
                <button
                    className="flex-grow text-left hover:bg-gray-100 dark:hover:bg-gray-800 p-2 sm:p-3 rounded transition-colors"
                    onClick={() => setShowHexagram(!showHexagram)}>
                    <h3 className="text-sm sm:text-base">Hexagram {hexagramNumber}</h3>

                </button>
            </div>

            {showHexagram && columnOrder.map((columnName) => {
                if (!hexagramData[columnName]) { return; }
                if (!isNaN(Number(columnName)) && movingLines.indexOf(Number(columnName)) === -1) { return; }
                return (
                    <div key={`${hexagramNumber}-${columnName}`} className="mt-3 sm:mt-4">
                        <p className="text-left text-sm sm:text-base">
                            <span className="font-bold">{cap(columnName)}: </span>
                            {hexagramData[columnName]}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default YijingTextDisplaySingle;