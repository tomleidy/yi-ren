import { HexagramLinesProps } from "../../types/index";

interface ExtendedHexagramLinesProps extends HexagramLinesProps {
    isSecondHexagram?: boolean;  // false = single or left hexagram, true = right hexagram
    showTwoHexagrams?: boolean;  // whether we're in two-hexagram mode
}

const HexagramLinesDisplay = ({
    hexagramLines,
    isSecondHexagram = false,
    showTwoHexagrams = false
}: ExtendedHexagramLinesProps) => {
    const getLineStyle = (value: number) => {
        if (!value && value !== 0) return "bg-gray-200 dark:bg-gray-700";

        // In two hexagram mode
        if (showTwoHexagrams) {
            if (isSecondHexagram) {
                // Right hexagram: 6->solid, 7->solid, 8->broken, 9->broken
                return (value === 6 || value === 7)
                    ? "bg-black dark:bg-white"
                    : "flex justify-between";
            } else {
                // Left hexagram: show lines without movement indicators
                return (value === 7 || value === 9)
                    ? "bg-black dark:bg-white"
                    : "flex justify-between";
            }
        }

        // Single hexagram mode with movement indicators
        switch (value) {
            case 6: // yin moving (broken with dot)
                return "flex justify-between relative";
            case 7: // yang (solid)
                return "bg-black dark:bg-white";
            case 8: // yin (broken)
                return "flex justify-between";
            case 9: // yang moving (solid with x)
                return "bg-black dark:bg-white relative after:absolute after:content-['×'] after:text-white dark:after:text-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-base sm:after:text-lg after:font-bold";
            default:
                return "bg-gray-200 dark:bg-gray-700";
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 py-2 sm:py-4">
            {[5, 4, 3, 2, 1, 0].map((line, index) => {
                const value = hexagramLines[line];
                const isYin = !showTwoHexagrams
                    ? (value === 6 || value === 8)
                    : isSecondHexagram
                        ? (value === 8 || value === 9)  // right hexagram
                        : (value === 6 || value === 8); // left hexagram
                const isYinMoving = !showTwoHexagrams && value === 6;

                return (
                    <div
                        key={index}
                        className={`w-[80px] sm:w-[100px] h-[6px] sm:h-[8px] ${getLineStyle(value)}`}
                    >
                        {isYin && (
                            <>
                                <div className="w-[35%] h-full bg-black dark:bg-white"></div>
                                {isYinMoving && (
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                )}
                                <div className="w-[35%] h-full bg-black dark:bg-white"></div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default HexagramLinesDisplay;