import { createContext, useContext, useState } from "react";

interface VisibilityState {
    [key: string]: boolean;
}

interface VisibilityContextType {
    visibility: VisibilityState;
    toggle: (key: string) => void;
    show: (key: string) => void;
    hide: (key: string) => void;
}

const VisibilityContext = createContext<VisibilityContextType>({
    visibility: {},
    toggle: () => { },
    show: () => { },
    hide: () => { },
});

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [visibility, setVisibility] = useState<VisibilityState>({});

    const toggle = (key: string) => {
        setVisibility(prev => ({ ...prev, [key]: !prev[key] }));
    };
    const show = (key: string) => {
        setVisibility(prev => ({ ...prev, [key]: true }));
    };
    const hide = (key: string) => {
        setVisibility(prev => ({ ...prev, [key]: false }));
    };

    return (
        <VisibilityContext.Provider value={{ visibility, toggle, show, hide }}>
            {children}
        </VisibilityContext.Provider>
    );
}

export const useVisibility = () => useContext(VisibilityContext);