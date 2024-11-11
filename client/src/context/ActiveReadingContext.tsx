import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getMovingLines } from '../utils/hexagrams';
import { HexagramLines } from '../components/types';

interface ActiveReadingContextType {
    activeReading: HexagramLines | null;
    movingLines: number[];
    setActiveReading: (activeReading: HexagramLines | null) => void;
    clearReading: () => void;
}

const ActiveReadingContext = createContext<ActiveReadingContextType | undefined>(undefined);

interface ActiveReadingProviderProps {
    children: ReactNode;
}

export const ActiveReadingProvider: React.FC<ActiveReadingProviderProps> = ({ children }) => {
    const [activeReading, setActiveReadingState] = useState<HexagramLines | null>(null);
    const [movingLines, setMovingLines] = useState<number[]>([]);

    const setActiveReading = (newReading: HexagramLines | null) => {
        setActiveReadingState(newReading);
        if (newReading) {
            const lines = getMovingLines(newReading);
            setMovingLines(lines);
        } else {
            setMovingLines([]);
        }
    };

    const clearReading = () => {
        setActiveReadingState(null);
        setMovingLines([]);
    };

    return (
        <ActiveReadingContext.Provider value={{
            activeReading,
            movingLines,
            setActiveReading,
            clearReading
        }}>
            {children}
        </ActiveReadingContext.Provider>
    );
};

export const useActiveReading = () => {
    const context = useContext(ActiveReadingContext);
    if (context === undefined) {
        throw new Error('useHexagram must be used within an ActiveReadingProvider');
    }
    return context;
};

export default ActiveReadingContext;