import { CoinsProps } from "./types";

const CoinRow = ({ coins }: CoinsProps) => (
    <div className="coin-row">
        {coins.map((coin, idx) => (
            <img key={idx} src={coin} alt={`Coin ${idx + 1}`} width={60} height={60} />
        ))}
    </div>
);

export default CoinRow;
