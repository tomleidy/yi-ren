export interface YijingTitleObject {
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

export interface YijingHexagram {
    [key: string]: string | null;
}

export interface YijingSourceObject {
    title: YijingTitleObject;
    [key: number]: YijingHexagram;
}

export type YijingSourceArray = YijingSourceObject[];

export interface YijingTextDisplayProps {
    displayReading: boolean;
}


export interface YijingTextDisplaySingleProps {
    entry: YijingSourceObject;
    hexagramNumber: number;
    sourceIndex: number;
}

export interface YijingTitleDisplayProps {
    yijingTitleObject: YijingTitleObject;
}
