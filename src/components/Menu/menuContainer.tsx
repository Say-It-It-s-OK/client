import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { MenuButtonPrimary, MenuButtonSecondary } from "../Buttons/buttons";
import { MenuCard } from "../Card/Card";
import CartContainer from "./Cart/cartContainer";

const DivMenuContainer = styled.div`
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
`;

const DivMenuButtonContainer = styled.div`
    width: 100%;
    height: 8%;
`;

const DivMenuContainerBody = styled.div`
    display: flex;
    width: 100%;
    height: 92%;
    align-content: flex-start;
    background: line;
    background: linear-gradient(
        180deg,
        var(--light-color) 0%,
        var(--secondary-color) 100%
    );
    border: none;
    flex-wrap: wrap;
    position: absolute;
    bottom: 0;
`;

interface CategoryProps {
    activeCategory: string;
    setActiveCategory: Dispatch<SetStateAction<string | undefined>>;
}

const MenuContainer = ({
    activeCategory,
    setActiveCategory,
}: CategoryProps) => {
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    return (
        <DivMenuContainer>
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
            <DivMenuContainerBody>
                {activeCategory === "장바구니" ? (
                    <CartContainer />
                ) : (
                    <>
                        <MenuCard />
                        <MenuCard />
                        <MenuCard />
                        <MenuCard />
                        <MenuCard />
                        <MenuCard />
                        <MenuCard />
                        <MenuCard />
                    </>
                )}
            </DivMenuContainerBody>
        </DivMenuContainer>
    );
};

export default MenuContainer;
