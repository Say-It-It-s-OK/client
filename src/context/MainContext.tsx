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
}

interface ContextProps {
    children: ReactNode;
}

interface MainContextType {
    activeCategory: string;
    setActiveCategory: Dispatch<SetStateAction<string>>;
    cartItems: CartItem[];
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}

export const MainContext = createContext<MainContextType>({
    activeCategory: "요구사항",
    setActiveCategory: () => {},
    cartItems: [],
    setCartItems: () => {},
});

export const MainProvider = ({ children }: ContextProps) => {
    const [activeCategory, setActiveCategory] = useState<string>("커피");
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        console.log("장바구니에 담긴 제품", cartItems);
    }, [cartItems]);

    return (
        <MainContext.Provider
            value={{
                activeCategory,
                setActiveCategory,
                cartItems,
                setCartItems,
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
