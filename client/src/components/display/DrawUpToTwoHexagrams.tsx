import { useVisibility } from "../../context/VisibilityContext";
import { useActiveReading } from "../../context/ActiveReadingContext";


const Line = ({ drawValue }: { drawValue: number }) => {
    switch (drawValue) {
        case 6:
            return (
                <div className="w-[80px] sm:w-[100px] h-[6px] sm:h-[8px] flex justify-between relative">
                    <div className="w-[35%] h-full bg-black dark:bg-white" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black dark:text-white">×</span>
                    <div className="w-[35%] h-full bg-black dark:bg-white" />
                </div>
            );

        case 7:
            return (
                <div className="w-[80px] sm:w-[100px] h-[6px] sm:h-[8px] bg-black dark:bg-white" />
            );
        case 8:
            return (
                <div className="w-[80px] sm:w-[100px] h-[6px] sm:h-[8px] flex justify-between">
                    <div className="w-[35%] h-full bg-black dark:bg-white" />
                    <div className="w-[35%] h-full bg-black dark:bg-white" />
                </div>
            );
        case 9:
            return (
                <div className="w-[80px] sm:w-[100px] h-[6px] sm:h-[8px] bg-black dark:bg-white relative">
                    <span className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-current" />
                </div>
            );
        default:
            return (
                <div className="w-[80px] sm:w-[100px] h-[6px] sm:h-[8px] bg-gray-400 dark:bg-gray-600" />
            )
    }

};

const DrawSixLines = ({ hexagramLineValues }: { hexagramLineValues: number[] }) => {
    console.log(hexagramLineValues);
    const lines = [...hexagramLineValues, ...Array(6 - hexagramLineValues.length).fill(0)];
    console.log(lines);
    return (
        < div className="flex flex-col-reverse items-center gap-2 py-2 sm:py-4" >
            {lines.map((line, idx) => <Line drawValue={line} key={`line-${idx}`} />)}
        </div >
    )
}

const DrawUpToTwoHexagrams = () => {
    const { visibility } = useVisibility();
    const { hexagramLines, getNumberOfHexagrams } = useActiveReading();
    const { getHexagramOneLines, getHexagramTwoLines } = useActiveReading();
    const showTwoHexagrams = visibility['twoHexagramDisplay']
    let displayValues = [hexagramLines];
    if (getNumberOfHexagrams() > 1 && showTwoHexagrams) {
        displayValues = [getHexagramOneLines(), getHexagramTwoLines()]
    }
    return (
        <>
            {
                displayValues.map((sixLines, idx) => (<DrawSixLines hexagramLineValues={sixLines} key={`sixlines-${idx}`} />))
            }
        </>
    )
}

export default DrawUpToTwoHexagrams;