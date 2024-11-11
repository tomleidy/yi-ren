import { HexagramLinesProps } from "../types";

const HexagramLinesDisplay = ({ hexagramLines }: HexagramLinesProps) => {
    const getLineStyle = (value: number) => {
        switch (value) {
            case 6: // yin moving
                return "flex justify-between relative";
            case 7: // yang
                return "bg-black dark:bg-white";
            case 8: // yin
                return "flex justify-between";
            case 9: // yang moving
                return "bg-black dark:bg-white relative after:absolute after:content-['×'] after:text-white dark:after:text-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-base sm:after:text-lg after:font-bold";
            default: // empty/faded
                return "bg-gray-200 dark:bg-gray-700";
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 py-2 sm:py-4">
            {[5, 4, 3, 2, 1, 0].map((line, index) => {
                const isYin = hexagramLines[line] === 6 || hexagramLines[line] === 8;
                const isYinMoving = hexagramLines[line] === 6;

                return (
                    <div
                        key={index}
                        className={`w-[80px] sm:w-[100px] h-[6px] sm:h-[8px] ${getLineStyle(hexagramLines[line] ?? 0)}`}
                    >
                        {isYin && (
                            <>
                                <div className="w-[35%] h-full bg-black dark:bg-white"></div>
                                {isYinMoving ? (
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                ) : null}
                                <div className="w-[35%] h-full bg-black dark:bg-white"></div>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    );
};

export default HexagramLinesDisplay;