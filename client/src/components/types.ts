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


interface YijingTextDisplayProps {
    displayReading: boolean;
    sourceArray: YijingSourceArray;
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
    translator: string | null;
    year: number | null;
    columnOrder: string[];
    deletedAt: string | null;
    deletedPermanent: boolean;
    publicReference: boolean;
}

interface YijingHexagram {
    [key: string]: string | null;
}

interface YijingSourceObject {
    title: YijingTitleObject;
    [key: number]: YijingHexagram;
}

type YijingSourceArray = YijingSourceObject[];


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
    YijingTextDisplayProps,
    YijingTitleObject,
    YijingSourceObject,
    YijingSourceArray,
    BinaryToHexagram,
    ValueToBinary
};