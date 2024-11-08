import { createContext, useState } from "react";

interface UserInfo {
    username: string;
    email?: string;
    userId: string;
}

interface UserContextType {
    userInfo: UserInfo | null;
    setUserInfo: (userInfo: UserInfo | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
}
