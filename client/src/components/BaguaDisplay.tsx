import React, { useState } from 'react';
import trigrams from '../constants/trigram';
import { getBinaryFromHexagramNumbers } from '../constants/hexagram';

interface BaguaDisplayProps {
    hexagramNumber: number;
}

const BaguaDisplay: React.FC<BaguaDisplayProps> = ({ hexagramNumber }) => {
    const [isOpen, setIsOpen] = useState(false);

    const hexagramBinary = getBinaryFromHexagramNumbers([hexagramNumber])[0];
    const upperTrigram = hexagramBinary.slice(3, 6);
    const lowerTrigram = hexagramBinary.slice(0, 3);

    const upperInfo = trigrams.trigramsBasicInfo[trigrams.binaryToTrigram[upperTrigram]];
    const lowerInfo = trigrams.trigramsBasicInfo[trigrams.binaryToTrigram[lowerTrigram]];

    return (
        <div className="inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-2xl hover:opacity-70 transition-opacity ml-2"
                title="View trigram analysis"
            >
                {upperInfo.unicode}{lowerInfo.unicode}
            </button>

            {isOpen && (
                <div className="mt-2 p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                    <div className="flex justify-center items-center gap-8">
                        <div className="text-center">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl">{upperInfo.unicode}</span>
                                <div className="text-left">
                                    <p className="font-semibold text-lg">{upperInfo.english}</p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">{upperInfo.pinyin}</span>
                                        {" "}
                                        <span className="text-lg">{upperInfo.hanzi}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="text-3xl font-light text-gray-400">over</div>
                        <div className="text-center">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl">{lowerInfo.unicode}</span>
                                <div className="text-left">
                                    <p className="font-semibold text-lg">{lowerInfo.english}</p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">{lowerInfo.pinyin}</span>
                                        {" "}
                                        <span className="text-lg">{lowerInfo.hanzi}</span>
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

export default BaguaDisplay;