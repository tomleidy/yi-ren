export interface HexagramEntriesBasicInfoObject {
    [key: number]: {
        kingwen: number;
        pinyin: string;
        hanzi: string;
        unicode: string;
    }
}

export interface HexagramSingleEntryBasicInfo {
    kingwen: number;
    pinyin: string;
    hanzi: string;
    unicode: string;
}


export type HexagramLines = number[];
export interface HexagramLinesProps {
    hexagramLines: HexagramLines;
}

export type HexagramKingWenResult = string;
export interface HexagramKingWenResultProps {
    hexagramKingWenResult: HexagramKingWenResult;
};

export interface BinaryToHexagram {
    [key: string]: number;
}
export interface ValueToBinary {
    [key: number]: [string, string];
}
