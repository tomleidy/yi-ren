import { useActiveReading } from "../../context/ActiveReadingContext";



const HexagramNumberDisplay = () => {
    const { activeReading } = useActiveReading();
    return (
        <div className='h-6 p-6'>
            <span>{activeReading && activeReading.join(" -> ")}</span>
        </div>
    )
}


export default HexagramNumberDisplay;