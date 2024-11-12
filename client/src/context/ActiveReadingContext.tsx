import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getMovingLines } from '../utils/hexagrams';
import { HexagramLines, YijingSourceArray } from '../components/types';
import { queryYijingTextDbForHexagrams } from '../services/yijingApi';

interface ActiveReadingContextType {
    activeReading: HexagramLines | null;
    hexagramLines: number[];
    movingLines: number[];
    yijingSourceArray: YijingSourceArray;
    topic: string;
    setTopic: (topic: string) => void;
    setActiveReading: (activeReading: HexagramLines | null) => void;
    setHexagramLines: (lines: number[]) => void;
    clearReading: () => void;
}

const ActiveReadingContext = createContext<ActiveReadingContextType | undefined>(undefined);

interface ActiveReadingProviderProps {
    children: ReactNode;
}

export const ActiveReadingProvider: React.FC<ActiveReadingProviderProps> = ({ children }) => {
    const [activeReading, setActiveReadingState] = useState<HexagramLines | null>(null);
    const [hexagramLines, setHexagramLines] = useState<number[]>([]);
    const [movingLines, setMovingLines] = useState<number[]>([]);
    const [yijingSourceArray, setYijingSourceArray] = useState<YijingSourceArray>([]);
    const [topic, setTopic] = useState('');

    const setActiveReading = async (newReading: HexagramLines | null) => {
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

    const clearReading = () => {
        setActiveReadingState(null);
        setHexagramLines([]);
        setMovingLines([]);
        setYijingSourceArray([]);
    };

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
            clearReading
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