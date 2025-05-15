import { CartItem } from "./MainContext";
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
    recommendItems: CartItem[];
    setRecommendItems: Dispatch<SetStateAction<CartItem[]>>;
}

interface LoadingProviderProps {
    children: ReactNode;
}

export const defaultItems: CartItem[] = [
    {
        _id: "item-001",
        sessionId: "americano",
        name: "아메리카노",
        price: 3000,
        type: "coffee",
        options: {
            size: ["S", "M", "L"],
            shot: ["연하게", "기본", "진하게"],
            temperature: ["ICE", "HOT"],
        },
        selectedOptions: {
            size: "S",
            shot: "기본",
            temperature: "ICE",
        },
    },
];

export const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [outputText, setOutputText] = useState("");
    // const [recommendItems, setRecommendItems] = useState<Item[]>(defaultItems);
    const [recommendItems, setRecommendItems] = useState<CartItem[]>([]);

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
