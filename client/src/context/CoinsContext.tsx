import React, { createContext, useContext, useState } from 'react';
import { coinBlended, coinHeads, coinTails } from '../assets/images';
import { CoinType } from '../types/index';
import { useActiveReading } from './ActiveReadingContext';
import { getHexagramFromValues } from '../constants/hexagram';

interface CoinsContextType {
    coins: CoinType[];
    flipCoins: () => void;
    resetCoins: () => void;
}

const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

export const CoinsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [coins, setCoins] = useState<CoinType[]>([coinBlended, coinBlended, coinBlended]);
    const { hexagramLines, setHexagramLines, setActiveReading } = useActiveReading();

    const flipCoins = () => {
        if (hexagramLines.length >= 6) return;

        const newCoins: CoinType[] = coins.map(() =>
            Math.random() < 0.5 ? coinHeads : coinTails
        );
        setCoins(newCoins);

        const headsCount = newCoins.filter(c => c === coinHeads).length;
        const result = (headsCount * 3) + ((3 - headsCount) * 2);

        const newHexagram = [...hexagramLines, result];
        setHexagramLines(newHexagram);

        if (newHexagram.length === 6) {
            const hexagramNumbers = getHexagramFromValues(newHexagram);
            setActiveReading(hexagramNumbers);
        }
    };

    const resetCoins = () => {
        setCoins([coinBlended, coinBlended, coinBlended]);
    };

    return (
        <CoinsContext.Provider value={{ coins, flipCoins, resetCoins }}>
            {children}
        </CoinsContext.Provider>
    );
};

export const useCoins = () => {
    const context = useContext(CoinsContext);
    if (!context) {
        throw new Error('useCoins must be used within a CoinsProvider');
    }
    return context;
};