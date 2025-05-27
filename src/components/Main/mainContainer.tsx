import { useContext, useEffect } from "react";
import {
    MainContext,
    SelectedCartProvider,
    SelectedMenuProvider,
} from "../../context/MainContext";
import { LoadingContext } from "../../context/LoadingContext";
import styled from "styled-components";
import { MenuButtonPrimary, MenuButtonSecondary } from "../Buttons/buttons";
import QueryContainer from "./Query/queryContainer";
import MenuContainer from "./Menu/menuContainer";
import CartContainer from "./Cart/cartContainer";
import CartOptionContainer from "./Cart/cartOptionContainer";
import OptionContainer from "./Option/optionContainer";
import LoadingContainer from "./Loading/loadingContainer";

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

const MainContainer = () => {
    const {
        activeCategory,
        setActiveCategory,
        multiOrder,
        setMultiOrder,
        setMultiResults,
    } = useContext(MainContext);
    const { isLoading } = useContext(LoadingContext)!;

    const renderContent = () => {
        switch (activeCategory) {
            case "요구사항":
                return <QueryContainer />;
            case "장바구니":
                return <CartContainer />;
            case "장바구니 옵션":
                return <CartOptionContainer />;
            case "커피":
            case "음료":
            case "디카페인":
            case "디저트":
                return <MenuContainer />;
            case "옵션":
                return <OptionContainer />;
            case "로딩":
                return <LoadingContainer />;
        }
    };

    useEffect(() => {
        if (isLoading) {
            setActiveCategory("로딩");
        }
    }, [isLoading]);

    useEffect(() => {
        if (
            multiOrder &&
            (activeCategory === "커피" ||
                activeCategory === "음료" ||
                activeCategory === "디카페인" ||
                activeCategory === "디저트")
        ) {
            setMultiOrder(false);
            setMultiResults([]);
        }
    }, [activeCategory]);

    return (
        <DivMainContainer>
            <DivMenuButtonContainer>
                <MenuButtonSecondary
                    children="커피"
                    active={activeCategory === "커피"}
                    onClick={() => setActiveCategory("커피")}
                    disabled={isLoading}
                />
                <MenuButtonPrimary
                    children="음료"
                    active={activeCategory === "음료"}
                    onClick={() => setActiveCategory("음료")}
                    disabled={isLoading}
                />
                <MenuButtonSecondary
                    children="디카페인"
                    active={activeCategory === "디카페인"}
                    onClick={() => setActiveCategory("디카페인")}
                    disabled={isLoading}
                />
                <MenuButtonPrimary
                    children="디저트"
                    active={activeCategory === "디저트"}
                    onClick={() => setActiveCategory("디저트")}
                    disabled={isLoading}
                />
            </DivMenuButtonContainer>
            <SelectedCartProvider>
                <DivMainContainerBody>{renderContent()}</DivMainContainerBody>
            </SelectedCartProvider>
        </DivMainContainer>
    );
};

export default MainContainer;
