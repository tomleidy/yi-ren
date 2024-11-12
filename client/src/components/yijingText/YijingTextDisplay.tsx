import { YijingSourceObject } from '../types';
import { YijingTextDisplayProps } from '../types';
import { useActiveReading } from '../../context/ActiveReadingContext';
import YijingTextDisplaySingle from './YijingTextDisplaySingle';
import YijingTitleDisplay from './YijingTitleDisplay';

const YijingTextDisplay = ({ displayReading }: YijingTextDisplayProps) => {
    const { yijingSourceArray } = useActiveReading();
    const { activeReading } = useActiveReading();

    return (
        <div className="max-w-screen-lg mx-auto">
            {displayReading && activeReading &&
                yijingSourceArray.map((entry: YijingSourceObject, index: number) => (
                    <div key={`source-${index}`} className="mb-6 sm:mb-8">
                        <YijingTitleDisplay yijingTitleObject={entry.title} />
                        {activeReading.map(hexNumber => (
                            <YijingTextDisplaySingle
                                key={`${index}-${hexNumber}`}
                                entry={entry}
                                hexagramNumber={hexNumber}
                            />
                        ))}
                    </div>
                ))
            }
        </div>
    );
};

export default YijingTextDisplay;