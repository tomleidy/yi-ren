import React, { useState, useEffect } from 'react';
import { getHexagramFromValues } from '../constants/hexagram';
import { queryYijingTextDbForHexagrams } from '../services/yijingApi';
import CoinRow from './CoinRow';
import { coinBlended, coinHeads, coinTails } from '../assets/images';
import { CoinType, DisplayReadingType, HexagramLines, HexagramLinesProps, HexagramKingWenResult, HexagramKingWenResultProps, YijingTextDisplayProps, YijingSourceObject } from './types';
import { useActiveReading } from '../context/ActiveReadingContext';

const YijingTextDisplay = ({ displayReading, sourceArray }: YijingTextDisplayProps) => {
    return (
        <div>
            {displayReading && JSON.stringify(sourceArray)}
        </div>
    )
}

const DisplayHexagramNumber = () => {
    const { activeReading } = useActiveReading();
    return (
        <div className='h-6 p-6'>
            <span>{activeReading && activeReading.join(" -> ")}</span>
        </div>
    )
}

const DisplayHexagramLines = ({ hexagramLines }: HexagramLinesProps) => {
    const getLineClass = (value: number) => {
        const classes: { [key: number]: string } = {
            6: "hexagram-line-yin-moving",
            7: "hexagram-line-yang",
            8: "hexagram-line-yin",
            9: "hexagram-line-yang-moving"
        };
        return classes[value] ?? "hexagram-line-faded";
    };
    return (
        <div>
            {[5, 4, 3, 2, 1, 0].map((line, index) => (
                <div key={index} className={`hexagram-line-base ${getLineClass(hexagramLines[line] ?? 0)}`}>
                    <span></span>
                </div>
            ))}
        </div>
    )
}

const YijingDivination: React.FC = () => {
    const [hexagramLines, setHexagramLines] = useState<HexagramLines>([]);
    const [coins, setCoins] = useState<CoinType[]>([coinBlended, coinBlended, coinBlended]);
    const [yijingText, setYijingText] = useState<YijingSourceObject[]>([]);
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
            const readingResult = await queryYijingTextDbForHexagrams(hexagramNumbers);
            setYijingText(readingResult || []);
        }

    };

    const resetReading = () => {
        setHexagramLines([]);
        setCoins(coins.map(() => coinBlended));
        setYijingText([]);
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
            <DisplayHexagramLines hexagramLines={hexagramLines} />
            <DisplayHexagramNumber />
            <CoinRow coins={coins} />


            <div>
                <button onClick={hexagramLines.length >= 6 ? showReading : flipCoins}>
                    {hexagramLines.length === 6 ? 'Show Yijing Text' : 'Flip Coins'}
                </button>
                <button onClick={resetReading}>Reset</button>
            </div>

            <YijingTextDisplay displayReading={displayReading} sourceArray={yijingText} />
        </div>
    );
};

export default YijingDivination;
