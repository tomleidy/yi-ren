import { useState } from 'react';
import CoinRow from '../display/CoinRow';
import { DisplayReadingType } from '../../types/index';
import { useActiveReading } from '../../context/ActiveReadingContext';
import YijingTextDisplay from '../yijingText/YijingTextDisplay';
import TopicComponent from '../display/TopicComponent';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { useVisibility } from '../../context/VisibilityContext';
import HexagramInfoDisplay from '../display/HexagramInfoDisplay';
import { useCoins } from '../../context/CoinsContext';
import DrawUpToTwoHexagrams from '../display/DrawUpToTwoHexagrams';

interface CoinReadingButtonsProps {
    setDisplayReading: (setDisplayReading: boolean) => void;
}

const CoinReadingButtons = ({ setDisplayReading }: CoinReadingButtonsProps) => {
    const { flipCoins } = useCoins();
    const { clearReading } = useActiveReading();
    const { resetCoins } = useCoins();
    const { hexagramLines } = useActiveReading();

    const resetReading = () => {
        resetCoins();
        clearReading();
    };
    const showReading = () => hexagramLines.length === 6 && setDisplayReading(true);

    return (
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
        </div>);
}

const ToggleDisplayOneOrTwoHexagrams = () => {
    const { toggle } = useVisibility();
    return (
        <button
            onClick={() => toggle('twoHexagramDisplay')}
            className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            title="Toggle display mode"
        >
            <ArrowsRightLeftIcon className="h-5 w-5" />
        </button>
    )


}

const YijingDivination: React.FC = () => {
    const [displayReading, setDisplayReading] = useState<DisplayReadingType>(false);

    return (
        <div className="px-2 sm:px-4 py-4 sm:py-6 max-w-screen-lg mx-auto">
            <div className="space-y-4 sm:space-y-6">
                <div className="relative">
                    <div className="flex justify-center items-center gap-8 sm:gap-12">
                        <DrawUpToTwoHexagrams />
                    </div>
                    <TopicComponent />
                    <ToggleDisplayOneOrTwoHexagrams />
                </div>
                <CoinRow />
                <CoinReadingButtons setDisplayReading={setDisplayReading} />

                <HexagramInfoDisplay />
                <YijingTextDisplay displayReading={displayReading} />
            </div>
        </div>
    );
};

export default YijingDivination;