import { coinBlended, coinHeads, coinTails } from '../assets/images';

export type CoinType = typeof coinHeads | typeof coinTails | typeof coinBlended;

export interface CoinsProps {
    coins: CoinType[];
}

export type DisplayReadingType = boolean;
