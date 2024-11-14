import { useCoins } from "../../context/CoinsContext";

const CoinRow = () => {
    const { coins } = useCoins();

    return (
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {coins.map((coin, idx) => (
                <img
                    key={idx}
                    src={coin}
                    alt={`Coin ${idx + 1}`}
                    className="w-12 h-12 sm:w-16 sm:h-16"
                />
            ))}
        </div>
    )
};

export default CoinRow;