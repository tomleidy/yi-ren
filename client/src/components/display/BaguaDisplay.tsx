import React from 'react';
import trigrams from '../../constants/trigram';
import { getBinaryFromHexagramNumbers } from '../../constants/hexagram';
import { useVisibility } from '../../context/VisibilityContext';

interface BaguaDisplayProps {
    hexagramNumber: number;
}

const BaguaDisplay: React.FC<BaguaDisplayProps> = ({ hexagramNumber }) => {
    const { visibility, show, hide } = useVisibility();
    const hexagramBinary = getBinaryFromHexagramNumbers([hexagramNumber])[0];
    const upperTrigram = hexagramBinary.slice(3, 6);
    const lowerTrigram = hexagramBinary.slice(0, 3);

    const upperInfo = trigrams.trigramsBasicInfo[trigrams.binaryToTrigram[upperTrigram]];
    const lowerInfo = trigrams.trigramsBasicInfo[trigrams.binaryToTrigram[lowerTrigram]];

    const baguaKey = `bagua-info-${hexagramNumber}`;
    const hexagramKey = `hexagram-info-${hexagramNumber}`;

    const handleClick = () => {
        if (visibility[baguaKey]) {
            hide(baguaKey);
        } else {
            hide(hexagramKey);
            show(baguaKey);
        }
    };

    return (
        <div className="inline-block relative">
            {/* Increased touch target size */}
            <div className="w-16 sm:w-20 text-center">
                <button
                    onClick={handleClick}
                    className="p-2 sm:p-3 text-2xl sm:text-3xl hover:opacity-70 transition-opacity min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="View trigram analysis"
                >
                    {upperInfo.unicode}{lowerInfo.unicode}
                </button>
            </div>

            {visibility[baguaKey] && (
                <div className="absolute z-10 right-0 mt-2 w-full sm:w-64 max-w-[calc(100vw-2rem)]">
                    <div className="p-3 sm:p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                        <div className="space-y-3 sm:space-y-4">
                            <div className="text-center">
                                <div className="flex items-center gap-2 sm:gap-4">
                                    <span className="text-3xl sm:text-4xl w-12 sm:w-16 text-center">{upperInfo.unicode}</span>
                                    <div className="text-left flex-1 text-sm sm:text-base">
                                        <p className="font-semibold">{upperInfo.english}</p>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">{upperInfo.pinyin}</span>
                                            {" "}
                                            <span>{upperInfo.hanzi}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center text-gray-400 text-sm sm:text-base">
                                over
                            </div>

                            <div className="text-center">
                                <div className="flex items-center gap-2 sm:gap-4">
                                    <span className="text-3xl sm:text-4xl w-12 sm:w-16 text-center">{lowerInfo.unicode}</span>
                                    <div className="text-left flex-1 text-sm sm:text-base">
                                        <p className="font-semibold">{lowerInfo.english}</p>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">{lowerInfo.pinyin}</span>
                                            {" "}
                                            <span>{lowerInfo.hanzi}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BaguaDisplay;