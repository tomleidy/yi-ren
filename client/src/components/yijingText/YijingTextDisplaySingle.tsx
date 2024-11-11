import { useState } from 'react';
import { useActiveReading } from '../../context/ActiveReadingContext';
import BaguaDisplay from '../display/BaguaDisplay';
import { YijingTextDisplaySingleProps } from '../types';
import HexagramBasicInfoDisplay from "../display/HexagramBasicInfoDisplay";

const YijingTextDisplaySingle = ({ entry, hexagramNumber }: YijingTextDisplaySingleProps) => {
    const { columnOrder } = entry.title;
    const hexagramData = entry[hexagramNumber];
    const { movingLines } = useActiveReading();
    if (!hexagramData) return null;
    const [showHexagram, setShowHexagram] = useState(true);

    const cap = (text: string) => text[0].toUpperCase() + text.slice(1,)

    return (
        <div>
            <div className="flex items-start space-x-4 mb-4">
                <button
                    className="flex-grow text-left hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition-colors"
                    onClick={() => setShowHexagram(!showHexagram)}>
                    <h3 className='underline'>Hexagram {hexagramNumber}</h3>
                </button>
                <div className="flex items-start space-x-2">
                    <HexagramBasicInfoDisplay hexagramNumber={hexagramNumber} />
                    <BaguaDisplay hexagramNumber={hexagramNumber} />
                </div>
            </div>

            {showHexagram && columnOrder.map((columnName) => (
                hexagramData[columnName] && movingLines.indexOf(Number(columnName)) === -1 &&
                <div key={`${hexagramNumber}-${columnName}`}>
                    <p className='text-left'>
                        <span className='font-bold'>{cap(columnName)}: </span>
                        {hexagramData[columnName]}</p>
                    <br />
                </div>
            ))}
        </div>
    )
}

export default YijingTextDisplaySingle;