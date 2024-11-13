import { HexagramLines, YijingSourceArray } from "./index";

export interface UserInfo {
    username: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string | null;
    profilePicture?: string | null;
    address?: string;
    phoneNumber?: string | null;

}

export interface UserContextType {
    userInfo: UserInfo | null;
    setUserInfo: (userInfo: UserInfo | null) => void;
}

export interface VisibilityState {
    [key: string]: boolean;
}

export interface VisibilityContextType {
    visibility: VisibilityState;
    toggle: (key: string) => void;
    show: (key: string) => void;
    hide: (key: string) => void;
}

export interface ActiveReadingContextType {
    activeReading: HexagramLines | null;
    hexagramLines: number[];
    movingLines: number[];
    yijingSourceArray: YijingSourceArray;
    topic: string;
    setTopic: (topic: string) => void;
    setActiveReading: (activeReading: HexagramLines | null) => void;
    setHexagramLines: (lines: number[]) => void;
    clearReading: () => void;
}
