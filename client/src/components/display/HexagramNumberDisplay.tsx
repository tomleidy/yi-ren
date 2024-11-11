import { useActiveReading } from "../../context/ActiveReadingContext";

const HexagramNumberDisplay = () => {
    const { activeReading } = useActiveReading();

    return (
        <div className="min-h-[24px] sm:min-h-[32px] py-2 sm:py-3 text-sm sm:text-base text-center">
            <span>{activeReading && activeReading.join(" -> ")}</span>
        </div>
    );
};

export default HexagramNumberDisplay;