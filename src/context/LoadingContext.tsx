import sendTextToServer from "../api/request/sendTextToServer";
import { MainContext, Menu } from "./MainContext";
import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
    useEffect,
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

    useEffect(() => {
        const send = async () => {
            try {
                await sendTextToServer(outputText);
            } catch (error) {
                console.error("TTS 처리 요청 중 오류 발생", error);
            }
        };
        if (outputText === "말하면 OK!") return;
        send();
    }, [outputText]);

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
