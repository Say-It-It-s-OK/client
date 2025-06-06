import {
    createContext,
    useState,
    useEffect,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

export interface Menu {
    _id: string;
    id: string;
    name: string;
    type: string;
    price: number;
    options: { [key: string]: string[] };
    selectedOptions?: { [key: string]: string };
    image: string;
}

export interface CartItem {
    _id: string;
    id?: string;
    name: string;
    type: string;
    price: number;
    options: { [key: string]: string[] };
    selectedOptions: { [key: string]: string };
    cartIndex?: number;
    image: string;
}

export interface CartId {
    sessionId: string;
    items?: CartItem[];
}

interface ContextProps {
    children: ReactNode;
}

interface MainContextType {
    activeCategory: string;
    setActiveCategory: Dispatch<SetStateAction<string>>;
    cartItems: CartItem[];
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    cartId: CartId;
    setCartId: (id: CartId) => void;
    inputText: string;
    setInputText: Dispatch<SetStateAction<string>>;
    multiOrder: boolean;
    setMultiOrder: Dispatch<SetStateAction<boolean>>;
    multiResults: any[];
    setMultiResults: Dispatch<SetStateAction<any[]>>;
}

export const MainContext = createContext<MainContextType>({
    activeCategory: "요구사항",
    setActiveCategory: () => {},
    cartItems: [],
    setCartItems: () => {},
    cartId: {
        sessionId: "",
    },
    setCartId: () => {},
    inputText: "",
    setInputText: () => {},
    multiOrder: false,
    setMultiOrder: () => {},
    multiResults: [],
    setMultiResults: () => {},
});

export const MainProvider = ({ children }: ContextProps) => {
    const [activeCategory, setActiveCategory] = useState<string>("커피");
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartId, setCartId] = useState<CartId>({
        sessionId: crypto.randomUUID(),
    });
    const [inputText, setInputText] = useState<string>("");
    const [multiOrder, setMultiOrder] = useState<boolean>(false);
    const [multiResults, setMultiResults] = useState<any[]>([]);

    useEffect(() => {
        console.log("장바구니에 담긴 제품", cartItems);
    }, [cartItems]);

    useEffect(() => {
        console.log("장바구니 ID", cartId);
    }, [cartId]);

    useEffect(() => {
        if (multiOrder) console.log("다중 주문 활성화");
        else console.log("다중 주문 비활성화");
    }, [multiOrder]);

    useEffect(() => {
        if (multiOrder) {
            console.log("다중 주문 요청 결과", multiResults);
        }
    }, [multiResults]);

    return (
        <MainContext.Provider
            value={{
                activeCategory,
                setActiveCategory,
                cartItems,
                setCartItems,
                cartId,
                setCartId,
                inputText,
                setInputText,
                multiOrder,
                setMultiOrder,
                multiResults,
                setMultiResults,
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

interface SelectedMenuContextType {
    selectedMenu: Menu | undefined;
    setSelectedMenu: Dispatch<SetStateAction<Menu | undefined>>;
}

export const SelectedMenuContext = createContext<SelectedMenuContextType>({
    selectedMenu: undefined,
    setSelectedMenu: () => {},
});

export const SelectedMenuProvider = ({ children }: ContextProps) => {
    const [selectedMenu, setSelectedMenu] = useState<Menu>();

    useEffect(() => {
        console.log("선택된 제품(메인 메뉴)", selectedMenu);
    }, [selectedMenu]);

    return (
        <SelectedMenuContext.Provider
            value={{
                selectedMenu,
                setSelectedMenu,
            }}
        >
            {children}
        </SelectedMenuContext.Provider>
    );
};
interface SelectedCartContextType {
    selectedCart: CartItem | undefined;
    setSelectedCart: Dispatch<SetStateAction<CartItem | undefined>>;
}

export const SelectedCartContext = createContext<SelectedCartContextType>({
    selectedCart: undefined,
    setSelectedCart: () => {},
});

export const SelectedCartProvider = ({ children }: ContextProps) => {
    const [selectedCart, setSelectedCart] = useState<CartItem>();

    useEffect(() => {
        console.log("선택된 제품(장바구니)", selectedCart);
    }, [selectedCart]);

    return (
        <SelectedCartContext.Provider
            value={{
                selectedCart,
                setSelectedCart,
            }}
        >
            {children}
        </SelectedCartContext.Provider>
    );
};
