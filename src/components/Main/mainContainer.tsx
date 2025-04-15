import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { MenuButtonPrimary, MenuButtonSecondary } from "../Buttons/buttons";
import QueryContainer from "./Query/queryContainer";
import MenuContainer from "./Menu/menuContainer";
import CartContainer from "./Cart/cartContainer";
import CartOptionContainer from "./Cart/cartOptionContainer";
import OptionContainer from "./Option/optionContainer";

const DivMainContainer = styled.div`
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
`;

const DivMenuButtonContainer = styled.div`
    width: 100%;
    height: 8%;
`;

const DivMainContainerBody = styled.div`
    display: flex;
    width: 100%;
    height: 92%;

    background: line;
    background: linear-gradient(
        180deg,
        var(--light-color) 0%,
        var(--secondary-color) 100%
    );
    border: none;
    position: absolute;
    bottom: 0;
`;

interface CategoryProps {
    activeCategory: string;
    setActiveCategory: Dispatch<SetStateAction<string | undefined>>;
    cartItems: [];
    setCartItems: Dispatch<SetStateAction<[] | undefined>>;
    menus: any;
}

const MainContainer = ({
    activeCategory,
    setActiveCategory,
    cartItems,
    setCartItems,
    menus,
}: CategoryProps) => {
    const [selectedMenu, setSelectedMenu] = useState(null);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const renderContent = () => {
        switch (activeCategory) {
            case "요구사항":
                return <QueryContainer />;
            case "장바구니":
                return (
                    <CartContainer
                        setActiveCategory={setActiveCategory}
                        setSelectedMenu={setSelectedMenu}
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                    />
                );
            case "장바구니 옵션":
                return (
                    <CartOptionContainer
                        setActiveCategory={setActiveCategory}
                        selectedMenu={selectedMenu}
                        setCartItems={setCartItems}
                    />
                );
            case "커피":
            case "음료":
            case "디카페인":
            case "디저트":
                return (
                    <MenuContainer
                        setActiveCategory={setActiveCategory}
                        setSelectedMenu={setSelectedMenu}
                        menus={menus.filter(
                            (menu) => menu.type === activeCategory
                        )}
                        cartItems={cartItems}
                    />
                );
            case "옵션":
                return (
                    <OptionContainer
                        setActiveCategory={setActiveCategory}
                        selectedMenu={selectedMenu}
                        setCartItems={setCartItems}
                    />
                );
        }
    };

    return (
        <DivMainContainer>
            <DivMenuButtonContainer>
                <MenuButtonSecondary
                    children="커피"
                    active={activeCategory === "커피"}
                    onClick={() => handleCategoryClick("커피")}
                />
                <MenuButtonPrimary
                    children="음료"
                    active={activeCategory === "음료"}
                    onClick={() => handleCategoryClick("음료")}
                />
                <MenuButtonSecondary
                    children="디카페인"
                    active={activeCategory === "디카페인"}
                    onClick={() => handleCategoryClick("디카페인")}
                />
                <MenuButtonPrimary
                    children="디저트"
                    active={activeCategory === "디저트"}
                    onClick={() => handleCategoryClick("디저트")}
                />
            </DivMenuButtonContainer>
            <DivMainContainerBody>{renderContent()}</DivMainContainerBody>
        </DivMainContainer>
    );
};

export default MainContainer;
