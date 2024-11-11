import React, { useState, useEffect } from 'react';
import { getHexagramFromValues } from '../../constants/hexagram';
import CoinRow from '../display/CoinRow';
import { coinBlended, coinHeads, coinTails } from '../../assets/images';
import { CoinType, DisplayReadingType, HexagramLines } from '../types';
import { useActiveReading } from '../../context/ActiveReadingContext';
import HexagramLinesDisplay from '../display/HexagramLinesDisplay';
import HexagramNumberDisplay from '../display/HexagramNumberDisplay';
import YijingTextDisplay from '../yijingText/YijingTextDisplay';

const YijingDivination: React.FC = () => {
    const [hexagramLines, setHexagramLines] = useState<HexagramLines>([]);
    const [coins, setCoins] = useState<CoinType[]>([coinBlended, coinBlended, coinBlended]);

    const [displayReading, setDisplayReading] = useState<DisplayReadingType>(false);
    const showReading = () => hexagramLines.length === 6 && setDisplayReading(true);
    const { setActiveReading } = useActiveReading();

    const flipCoins = async () => {
        if (hexagramLines.length >= 6) return;
        const newCoins: string[] = coins.map(() => Math.random() < 0.5 ? coinHeads : coinTails);
        setCoins(newCoins);

        const headsCount = coins.filter(c => c === coinHeads).length;
        const result = (headsCount * 3) + ((3 - headsCount) * 2);

        // Add new line
        const newHexagram = [...hexagramLines, result];
        setHexagramLines(newHexagram);

        // Check if hexagram is complete
        if (newHexagram.length === 6) {
            const hexagramNumbers = getHexagramFromValues(newHexagram);
            setActiveReading(hexagramNumbers);

        }

    };

    const resetReading = () => {
        setHexagramLines([]);
        setCoins(coins.map(() => coinBlended));
        setActiveReading(null);
        setDisplayReading(false);
    };

    // Detect dark mode
    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
        }
    }, []);

    return (
        <div className="main-content">
            <HexagramLinesDisplay hexagramLines={hexagramLines} />
            <HexagramNumberDisplay />
            <CoinRow coins={coins} />


            <div>
                <button onClick={hexagramLines.length >= 6 ? showReading : flipCoins}>
                    {hexagramLines.length === 6 ? 'Show Yijing Text' : 'Flip Coins'}
                </button>
                <button onClick={resetReading}>Reset</button>
            </div>

            <YijingTextDisplay displayReading={displayReading} />
        </div>
    );
};

export default YijingDivination;
