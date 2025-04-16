import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

export interface Menu {
    _id: string;
    id: string;
    name: string;
    price: number;
    type: string;
    options: { [key: string]: string[] };
}

interface MenuContextType {
    menus: Menu[];
    setMenus: Dispatch<SetStateAction<Menu[]>>;
}

interface MenuProviderProps {
    children: ReactNode;
}

export const MenuContext = createContext<MenuContextType | null>(null);

export const MenuProvider = ({ children }: MenuProviderProps) => {
    const [menus, setMenus] = useState<Menu[]>([]);

    return (
        <MenuContext.Provider value={{ menus, setMenus }}>
            {children}
        </MenuContext.Provider>
    );
};
