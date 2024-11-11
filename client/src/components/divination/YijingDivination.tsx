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
    const { setActiveReading } = useActiveReading();

    const showReading = () => hexagramLines.length === 6 && setDisplayReading(true);

    const flipCoins = async () => {
        if (hexagramLines.length >= 6) return;
        const newCoins: string[] = coins.map(() => Math.random() < 0.5 ? coinHeads : coinTails);
        setCoins(newCoins);

        const headsCount = coins.filter(c => c === coinHeads).length;
        const result = (headsCount * 3) + ((3 - headsCount) * 2);

        const newHexagram = [...hexagramLines, result];
        setHexagramLines(newHexagram);

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

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
        }
    }, []);

    return (
        <div className="px-2 sm:px-4 py-4 sm:py-6 max-w-screen-lg mx-auto">
            <div className="space-y-4 sm:space-y-6">
                <HexagramLinesDisplay hexagramLines={hexagramLines} />
                <HexagramNumberDisplay />
                <CoinRow coins={coins} />

                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 pt-2 sm:pt-4">
                    <button
                        onClick={hexagramLines.length >= 6 ? showReading : flipCoins}
                        className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm sm:text-base min-h-[44px]"
                    >
                        {hexagramLines.length === 6 ? 'Show Yijing Text' : 'Flip Coins'}
                    </button>
                    <button
                        onClick={resetReading}
                        className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm sm:text-base min-h-[44px]"
                    >
                        Reset
                    </button>
                </div>

                <YijingTextDisplay displayReading={displayReading} />
            </div>
        </div>
    );
};

export default YijingDivination;