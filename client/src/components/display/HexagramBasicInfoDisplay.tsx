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
            hide(baguaKey); // Hide the bagua display for this hexagram
            show(hexagramKey);
        }
    };

    return (
        <div className="inline-block relative">
            <div className="w-16 text-center">
                <button
                    onClick={handleClick}
                    className="text-2xl hover:opacity-70 transition-opacity"
                    title="View hexagram information"
                >
                    {hexagramInfo.unicode}
                </button>
            </div>

            {visibility[hexagramKey] && (
                <div className="absolute z-10 right-0 mt-2 w-64">
                    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                        <div className="text-center">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl w-16 text-center">{hexagramInfo.unicode}</span>
                                <div className="text-left flex-1">
                                    <p className="font-semibold text-lg">
                                        Hexagram {hexagramInfo.kingwen}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">{hexagramInfo.pinyin}</span>
                                        {" "}
                                        <span className="text-lg">{hexagramInfo.hanzi}</span>
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