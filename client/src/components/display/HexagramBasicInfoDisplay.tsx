import React from 'react';
import { getHexagramBasicInfo } from '../../constants/hexagram';
import { useVisibility } from '../../context/VisibilityContext';

interface HexagramBasicInfoDisplayProps {
    hexagramNumber: number;
}

const HexagramBasicInfoDisplay: React.FC<HexagramBasicInfoDisplayProps> = ({ hexagramNumber }) => {
    const { visibility, show, hide } = useVisibility();
    const hexagramInfo = getHexagramBasicInfo([hexagramNumber])[0];
    const hexagramKey = `hexagram-info-${hexagramNumber}`;
    const baguaKey = `bagua-info-${hexagramNumber}`;

    const handleClick = () => {
        if (visibility[hexagramKey]) {
            hide(hexagramKey);
        } else {
            hide(baguaKey);
            show(hexagramKey);
        }
    };

    return (
        <div className="inline-block relative">
            <div className="w-16 sm:w-20 text-center">
                <button
                    onClick={handleClick}
                    className="p-2 sm:p-3 text-2xl sm:text-3xl hover:opacity-70 transition-opacity min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="View hexagram information"
                >
                    {hexagramInfo.unicode}
                </button>
            </div>

            {visibility[hexagramKey] && (
                <div className="absolute z-10 right-0 mt-2 w-full sm:w-64 max-w-[calc(100vw-2rem)]">
                    <div className="p-3 sm:p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                        <div className="text-center">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <span className="text-3xl sm:text-4xl w-12 sm:w-16 text-center">
                                    {hexagramInfo.unicode}
                                </span>
                                <div className="text-left flex-1 text-sm sm:text-base">
                                    <p className="font-semibold">
                                        Hexagram {hexagramInfo.kingwen}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">{hexagramInfo.pinyin}</span>
                                        {" "}
                                        <span>{hexagramInfo.hanzi}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HexagramBasicInfoDisplay;