import React, { useState, useEffect } from 'react';
import { getHexagramFromValues } from '../../constants/hexagram';
import CoinRow from '../display/CoinRow';
import { coinBlended, coinHeads, coinTails } from '../../assets/images';
import { CoinType, DisplayReadingType } from '../types';
import { useActiveReading } from '../../context/ActiveReadingContext';
import HexagramLinesDisplay from '../display/HexagramLinesDisplay';
import AlternateHexagramDisplay from '../display/AlternateHexagramDisplay';
import HexagramNumberDisplay from '../display/HexagramNumberDisplay';
import YijingTextDisplay from '../yijingText/YijingTextDisplay';
import TopicComponent from '../display/TopicComponent';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { useVisibility } from '../../context/VisibilityContext';

const YijingDivination: React.FC = () => {
    const [coins, setCoins] = useState<CoinType[]>([coinBlended, coinBlended, coinBlended]);
    const [displayReading, setDisplayReading] = useState<DisplayReadingType>(false);
    const { hexagramLines, setHexagramLines, setActiveReading, clearReading } = useActiveReading();
    const { visibility, toggle } = useVisibility();
    const useAlternateDisplay = visibility['alternateHexagramDisplay'];

    const showReading = () => hexagramLines.length === 6 && setDisplayReading(true);

    const flipCoins = async () => {
        if (hexagramLines.length >= 6) return;
        const newCoins: string[] = coins.map(() => Math.random() < 0.5 ? coinHeads : coinTails);
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

    const resetReading = () => {
        setCoins(coins.map(() => coinBlended));
        clearReading();
        setDisplayReading(false);
    };

    return (
        <div className="px-2 sm:px-4 py-4 sm:py-6 max-w-screen-lg mx-auto">
            <div className="space-y-4 sm:space-y-6">
                <div className="relative">
                    {useAlternateDisplay ? (
                        <AlternateHexagramDisplay />
                    ) : (
                        <HexagramLinesDisplay hexagramLines={hexagramLines} />
                    )}
                    <TopicComponent />
                    {hexagramLines.length > 0 && (
                        <button
                            onClick={() => toggle('alternateHexagramDisplay')}
                            className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            title="Toggle display mode"
                        >
                            <ArrowsRightLeftIcon className="h-5 w-5" />
                        </button>
                    )}
                </div>

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