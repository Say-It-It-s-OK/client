import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

export interface Item {
    _id: string;
    id: string;
    name: string;
    price: number;
    type: string;
    options: { [key: string]: string[] };
}

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    outputText: string;
    setOutputText: Dispatch<SetStateAction<string>>;
    recommendItems: Item[];
    setRecommendItems: Dispatch<SetStateAction<Item[]>>;
}

interface LoadingProviderProps {
    children: ReactNode;
}

export const defaultItems: Item[] = [
    {
        _id: "item-001",
        id: "americano",
        name: "아메리카노",
        price: 3000,
        type: "coffee",
        options: {
            size: ["S", "M", "L"],
            shot: ["연하게", "기본", "진하게"],
            temperature: ["ICE", "HOT"],
        },
    },
    {
        _id: "item-002",
        id: "latte",
        name: "카페라떼",
        price: 3500,
        type: "coffee",
        options: {
            size: ["S", "M", "L"],
            shot: ["기본", "진하게"],
            temperature: ["ICE", "HOT"],
        },
    },
    {
        _id: "item-003",
        id: "mocha",
        name: "카페모카",
        price: 4000,
        type: "coffee",
        options: {
            size: ["S", "M", "L"],
            temperature: ["ICE", "HOT"],
        },
    },
    // {
    //     _id: "item-004",
    //     id: "lemonade",
    //     name: "레몬에이드",
    //     price: 3800,
    //     type: "drink",
    //     options: {
    //         size: ["S", "M", "L"],
    //     },
    // },
    // {
    //     _id: "item-005",
    //     id: "cheesecake",
    //     name: "치즈케이크",
    //     price: 4500,
    //     type: "dessert",
    //     options: {
    //         sweetness: ["저당", "보통"],
    //     },
    // },
];

export const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [outputText, setOutputText] = useState("");
    const [recommendItems, setRecommendItems] = useState<Item[]>(defaultItems);

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
