import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getMovingLines } from '../utils/hexagrams';
import { HexagramLines, YijingSourceArray } from '../types/index';
import { ActiveReadingContextType, ActiveReadingType } from '../types/index';

import { queryYijingTextDbForHexagrams } from '../services/yijingApi';


const ActiveReadingContext = createContext<ActiveReadingContextType | undefined>(undefined);

interface ActiveReadingProviderProps {
    children: ReactNode;
}

export const ActiveReadingProvider: React.FC<ActiveReadingProviderProps> = ({ children }) => {
    const [activeReading, setActiveReadingState] = useState<ActiveReadingType>(null);
    const [hexagramLines, setHexagramLines] = useState<HexagramLines>([]);
    const [movingLines, setMovingLines] = useState<number[]>([]);
    const [yijingSourceArray, setYijingSourceArray] = useState<YijingSourceArray>([]);
    const [topic, setTopic] = useState('');

    const setActiveReading = async (newReading: ActiveReadingType) => {
        setActiveReadingState(newReading);
        if (newReading) {
            const lines = getMovingLines(newReading);
            setMovingLines(lines);
            const readingResult = await queryYijingTextDbForHexagrams(newReading);
            setYijingSourceArray(readingResult || []);
        } else {
            setMovingLines([]);
        }
    };

    const getNumberOfHexagrams = () => hexagramLines.some(line => line === 6 || line === 9) ? 2 : 1;


    const stationary: ({ [key: number]: number }) = { 6: 8, 7: 7, 8: 8, 9: 7 }
    const moving: ({ [key: number]: number }) = { 6: 7, 7: 7, 8: 8, 9: 8 }
    const getHexagramOneLines = () => hexagramLines.map(lineValue => stationary[lineValue])
    const getHexagramTwoLines = () => hexagramLines.map(lineValue => moving[lineValue])


    const clearReading = () => {
        setActiveReadingState(null);
        setHexagramLines([]);
        setMovingLines([]);
        setYijingSourceArray([]);
    };

    const isSecondHexagram = (hex: number) =>
        activeReading !== null &&
        activeReading.length > 1 &&
        activeReading[1] === hex;

    return (
        <ActiveReadingContext.Provider value={{
            activeReading,
            hexagramLines,
            movingLines,
            yijingSourceArray,
            topic,
            setTopic,
            setActiveReading,
            setHexagramLines,
            clearReading,
            getNumberOfHexagrams,
            isSecondHexagram,
            getHexagramOneLines,
            getHexagramTwoLines
        }}>
            {children}
        </ActiveReadingContext.Provider>
    );
};

export const useActiveReading = () => {
    const context = useContext(ActiveReadingContext);
    if (context === undefined) {
        throw new Error('useActiveReading must be used within an ActiveReadingProvider');
    }
    return context;
};


export default ActiveReadingContext;