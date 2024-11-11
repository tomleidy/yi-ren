import { useState } from 'react';
import { useActiveReading } from '../../context/ActiveReadingContext';
import BaguaDisplay from '../display/BaguaDisplay';
import { YijingTextDisplaySingleProps } from '../types';


const YijingTextDisplaySingle = ({ entry, hexagramNumber }: YijingTextDisplaySingleProps) => {
    const { columnOrder } = entry.title;
    const hexagramData = entry[hexagramNumber];
    const { movingLines } = useActiveReading();
    if (!hexagramData) return null;
    const [showHexagram, setShowHexagram] = useState(true);


    const cap = (text: string) => text[0].toUpperCase() + text.slice(1,)
    return (
        <div>
            <button
                className="w-full hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition-colors"
                onClick={() => setShowHexagram(!showHexagram)}>
                <h3 className='underline'>Hexagram {hexagramNumber}</h3>
            </button>
            <BaguaDisplay hexagramNumber={hexagramNumber} />
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