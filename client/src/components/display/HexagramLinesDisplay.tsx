import { HexagramLinesProps } from "../types";

const HexagramLinesDisplay = ({ hexagramLines }: HexagramLinesProps) => {

    const getLineClass = (value: number) => {
        const classes: { [key: number]: string } = {
            6: "hexagram-line-yin-moving",
            7: "hexagram-line-yang",
            8: "hexagram-line-yin",
            9: "hexagram-line-yang-moving"
        };
        return classes[value] ?? "hexagram-line-faded";
    };
    return (
        <div>
            {[5, 4, 3, 2, 1, 0].map((line, index) => (
                <div key={index} className={`hexagram-line-base ${getLineClass(hexagramLines[line] ?? 0)}`}>
                    <span></span>
                </div>
            ))}
        </div>
    )
}

export default HexagramLinesDisplay;