import React from 'react';
import { useVisibility } from '../../context/VisibilityContext';
import { useActiveReading } from '../../context/ActiveReadingContext';
import { getBinaryFromHexagramNumbers, getHexagramBasicInfo } from '../../constants/hexagram';
import trigrams from '../../constants/trigram';

interface HexagramBaguaButtonProps {
    hexagramNumber: number;
    infoKey: string;
    onClick: () => void;
}

const HexagramBaguaButton: React.FC<HexagramBaguaButtonProps> = ({ hexagramNumber, infoKey, onClick }) => {
    const info = getHexagramBasicInfo([hexagramNumber])[0];
    const binary = getBinaryFromHexagramNumbers([hexagramNumber])[0];
    const upperTri = trigrams.trigramsBasicInfo[trigrams.binaryToTrigram[binary.slice(3, 6)]];
    const lowerTri = trigrams.trigramsBasicInfo[trigrams.binaryToTrigram[binary.slice(0, 3)]];

    return (
        <button
            onClick={onClick}
            className="flex items-center gap-4"
            title="View hexagram information"
        >
            <div className="flex items-center gap-4">
                <span className="text-5xl">{info.unicode}</span>
                <div className="flex flex-col">
                    <span className="text-xl">{upperTri.unicode}</span>
                    <span className="text-xl">{lowerTri.unicode}</span>
                </div>
            </div>
        </button>
    );
};

interface HexagramBaguaInfoProps {
    hexagramNumber: number;
}

const HexagramBaguaInfo: React.FC<HexagramBaguaInfoProps> = ({ hexagramNumber }) => {
    const info = getHexagramBasicInfo([hexagramNumber])[0];
    const binary = getBinaryFromHexagramNumbers([hexagramNumber])[0];
    const upperTri = trigrams.trigramsBasicInfo[trigrams.binaryToTrigram[binary.slice(3, 6)]];
    const lowerTri = trigrams.trigramsBasicInfo[trigrams.binaryToTrigram[binary.slice(0, 3)]];

    return (
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <div className="grid grid-cols-[auto,1fr,auto] gap-x-4 gap-y-6 mb-4">
                <div className="text-5xl">{info.unicode}</div>
                <div className="text-center self-center">
                    <p>#{info.kingwen}: {info.pinyin}</p>
                </div>
                <div className='text-5xl self-center'>{info.hanzi}</div>
            </div>
            <div className="grid grid-cols-[auto,1fr,auto] gap-x-4 gap-y-6">
                <div className="text-4xl">{upperTri.unicode}</div>
                <div className="text-center self-center">
                    <p>{upperTri.pinyin}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{upperTri.english}</p>
                </div>
                <div className='text-4xl self-center'>{upperTri.hanzi}</div>

                <div className="text-4xl">{lowerTri.unicode}</div>
                <div className="text-center self-center">
                    <p>{lowerTri.pinyin}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{lowerTri.english}</p>
                </div>
                <div className='text-4xl self-center'>{lowerTri.hanzi}</div>
            </div>
        </div>
    );
};
const HexagramInfoDisplay: React.FC = () => {
    const { activeReading } = useActiveReading();
    const { visibility, show, hide } = useVisibility();

    if (!activeReading) return null;

    const [firstHexagram, secondHexagram] = activeReading;

    const handleClick = (infoKey: string) => () => {
        visibility[infoKey] ? hide(infoKey) : show(infoKey);
        // Hide the other info display if it's visible
        const otherKey = infoKey === 'hexagramInfo1' ? 'hexagramInfo2' : 'hexagramInfo1';
        if (visibility[otherKey]) hide(otherKey);
    };

    return (
        <div className="flex justify-center items-center gap-8">
            <div className="relative">
                <HexagramBaguaButton
                    hexagramNumber={firstHexagram}
                    infoKey="hexagramInfo1"
                    onClick={handleClick('hexagramInfo1')}
                />
                {visibility['hexagramInfo1'] && (
                    <div
                        className="absolute z-10 mt-2 w-64 transform -translate-x-1/2 left-1/2"
                        style={{ top: '100%', marginTop: '8px' }}
                    >
                        <HexagramBaguaInfo hexagramNumber={firstHexagram} />
                    </div>
                )}
            </div>

            {secondHexagram && (
                <>
                    <span className="text-2xl">→</span>
                    <div className="relative">
                        <HexagramBaguaButton
                            hexagramNumber={secondHexagram}
                            infoKey="hexagramInfo2"
                            onClick={handleClick('hexagramInfo2')}
                        />
                        {visibility['hexagramInfo2'] && (
                            <div
                                className="absolute z-10 mt-2 w-64 transform -translate-x-1/2 left-1/2"
                                style={{ top: '100%', marginTop: '8px' }}
                            >
                                <HexagramBaguaInfo hexagramNumber={secondHexagram} />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default HexagramInfoDisplay;