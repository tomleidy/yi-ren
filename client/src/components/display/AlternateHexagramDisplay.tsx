import { useActiveReading } from "../../context/ActiveReadingContext";

const AlternateHexagramDisplay = () => {
    const { hexagramLines, movingLines } = useActiveReading();

    const getLineStyle = (value: number, isSecondHexagram: boolean) => {
        if (!value) return "";

        // For first hexagram: 6,8=broken, 7,9=solid
        const isFirstSolid = value === 7 || value === 9;
        // For second hexagram: 6,7=solid, 8,9=broken
        const isSecondSolid = value === 6 || value === 7;

        const isSolid = isSecondHexagram ? isSecondSolid : isFirstSolid;

        return isSolid ? (
            "bg-black dark:bg-white"
        ) : (
            "flex justify-between"
        );
    };

    const renderHexagram = (isSecondHexagram: boolean) => (
        <div className="flex flex-col items-center gap-2 py-2 sm:py-4">
            {[5, 4, 3, 2, 1, 0].map((lineIndex) => {
                const value = hexagramLines[lineIndex];
                const lineStyle = getLineStyle(value, isSecondHexagram);
                const isBroken = !lineStyle.includes("bg-black");

                return (
                    <div
                        key={lineIndex}
                        className={`w-[80px] sm:w-[100px] h-[6px] sm:h-[8px] ${lineStyle}`}
                    >
                        {isBroken && (
                            <>
                                <div className="w-[35%] h-full bg-black dark:bg-white"></div>
                                <div className="w-[35%] h-full bg-black dark:bg-white"></div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );

    if (!hexagramLines || hexagramLines.length === 0) return null;

    return (
        <div className="flex justify-center items-center gap-8 sm:gap-12">
            {renderHexagram(false)}
            {movingLines.length > 0 && (
                <>
                    <div className="text-2xl">→</div>
                    {renderHexagram(true)}
                </>
            )}
        </div>
    );
};

export default AlternateHexagramDisplay;