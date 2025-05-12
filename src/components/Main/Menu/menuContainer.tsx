import styled from "styled-components";
import { MenuCard } from "../../Card/Card";
import Details from "../../Details/details";
import { useContext } from "react";
import { MainContext } from "../../../context/MainContext";
import { MenuContext } from "../../../context/MenuContext";

const DivMenuContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const DivMenuContainerBody = styled.div`
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 67%;
    position: relative;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 15px;
        background: var(--accent-color);
    }
`;

const MenuContainer = () => {
    const { menus } = useContext(MenuContext)!;
    const { activeCategory, cartItems } = useContext(MainContext);
    const filteredMenus = menus.filter((menu) => menu.type === activeCategory);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <DivMenuContainer>
            <DivMenuContainerBody>
                {filteredMenus.map((menu) => (
                    <MenuCard key={menu.id} menu={menu} />
                ))}
            </DivMenuContainerBody>
            <Details key={null} cartItems={cartItems} totalPrice={totalPrice} />
        </DivMenuContainer>
    );
};

export default MenuContainer;
