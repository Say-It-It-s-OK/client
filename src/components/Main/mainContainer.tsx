import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { MenuButtonPrimary, MenuButtonSecondary } from "../Buttons/buttons";
import QueryContainer from "./Query/queryContainer";
import MenuContainer from "./Menu/menuContainer";
import OptionContainer from "./Option/optionContainer";
import CartContainer from "./Cart/cartContainer";

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
    menus: any;
}

const MainContainer = ({
    activeCategory,
    setActiveCategory,
    menus,
}: CategoryProps) => {
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const renderContent = () => {
        switch (activeCategory) {
            case "요구사항":
                return <QueryContainer />;
            case "장바구니":
                return <CartContainer />;
            case "커피":
            case "음료":
            case "티":
            case "디저트":
                return (
                    <MenuContainer
                        menus={menus.filter(
                            (menu) => menu.type === activeCategory
                        )}
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
                    children="티"
                    active={activeCategory === "티"}
                    onClick={() => handleCategoryClick("티")}
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
