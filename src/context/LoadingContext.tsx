import { Menu } from "./MainContext";
import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    outputText: string;
    setOutputText: Dispatch<SetStateAction<string>>;
    recommendItems: Menu[];
    setRecommendItems: Dispatch<SetStateAction<Menu[]>>;
}

interface LoadingProviderProps {
    children: ReactNode;
}

export const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [outputText, setOutputText] = useState("말하면 OK!");
    const [recommendItems, setRecommendItems] = useState<Menu[]>([]);

    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                setIsLoading,
                outputText,
                setOutputText,
                recommendItems,
                setRecommendItems,
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};
