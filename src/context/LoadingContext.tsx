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
}

interface LoadingProviderProps {
    children: ReactNode;
}

export const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [outputText, setOutputText] = useState("");

    return (
        <LoadingContext.Provider
            value={{ isLoading, setIsLoading, outputText, setOutputText }}
        >
            {children}
        </LoadingContext.Provider>
    );
};
