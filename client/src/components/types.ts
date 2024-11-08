import { coinBlended, coinHeads, coinTails } from '../assets/images';


type CoinType = typeof coinHeads | typeof coinTails | typeof coinBlended;

interface CoinsProps {
    coins: CoinType[];
}

type DisplayReadingType = boolean;

interface HexagramEntriesBasicInfoObject {
    [key: number]: {
        kingwen: number;
        pinyin: string;
        hanzi: string;
        unicode: string;
    }
}

interface HexagramSingleEntryBasicInfo {
    kingwen: number;
    pinyin: string;
    hanzi: string;
    unicode: string;
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


interface BinaryToHexagram {
    [key: string]: number;
}
interface ValueToBinary {
    [key: number]: [string, string];
}


interface YijingTitleObject {
    userId: string;
    title: string;
    author: string;
    translator: (string | null);
    kingwenField: string;
    year: (number | null);
    columnOrder: string[];
}


interface YijingEntryObject {
    userId: (string | null);
    titleId: YijingTitleObject,
    kingwen: number;
    deletedAt: (string | null);
    deletedPermanent: boolean;
    columns: {
        [key: string]: string | null;
    }
    publicReference: boolean;
}
type YijingEntryArray = YijingEntryObject[];



export type {
    CoinType,
    CoinsProps,
    DisplayReadingType,
    HexagramEntriesBasicInfoObject,
    HexagramLines,
    HexagramLinesProps,
    HexagramKingWenResult,
    HexagramKingWenResultProps,
    HexagramSingleEntryBasicInfo,
    ReadingStateType,
    YijingTextDisplayProps,
    YijingTitleObject,
    YijingEntryObject,
    YijingEntryArray,
    BinaryToHexagram,
    ValueToBinary
};