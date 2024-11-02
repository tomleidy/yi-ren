import { coinBlended, coinHeads, coinTails } from '../assets/images';


type CoinType = typeof coinHeads | typeof coinTails | typeof coinBlended;

interface CoinsProps {
    coins: CoinType[];
}

type DisplayReadingType = boolean;

interface HexagramInfo {
    [key: number]: {
        kingwen: number;
        pinyin: string;
        hanzi: string;
        unicode: string;
    }
}

type HexagramLines = number[];
interface HexagramLinesProps {
    hexagramLines: HexagramLines;
}

type HexagramKingWenResult = string;
interface HexagramKingWenResultProps {
    hexagramKingWenResult: HexagramKingWenResult;
};

type ReadingStateType = string;

interface YijingTextDisplayProps {
    displayReading: boolean;
    reading: string[];
}

// hexagrams.ts

interface BinaryToHexagram {
    [key: string]: number;
}
interface ValueToBinary {
    [key: number]: [string, string];
}



export type {
    CoinType,
    CoinsProps,
    DisplayReadingType,
    HexagramInfo,
    HexagramLines,
    HexagramLinesProps,
    HexagramKingWenResult,
    HexagramKingWenResultProps,
    ReadingStateType,
    YijingTextDisplayProps,
    BinaryToHexagram,
    ValueToBinary
};