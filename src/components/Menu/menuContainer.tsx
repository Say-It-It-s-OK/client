import styled from "styled-components";
import { MenuButtonPrimary, MenuButtonSecondary } from "../Buttons/buttons";

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
    width: 100%;
    height: 92%;
    background: linear-gradient(
        180deg,
        var(--background-color) 0%,
        var(--secondary-color) 100%
    );
    border: none;
    position: absolute;
    bottom: 0;
`;

const MenuContainer = () => {
    return (
        <DivMenuContainer>
            <DivMenuButtonContainer>
                <MenuButtonSecondary children="커피" />
                <MenuButtonPrimary children="음료" />
                <MenuButtonSecondary children="디카페인" />
                <MenuButtonPrimary children="디저트" />
            </DivMenuButtonContainer>
            <DivMenuContainerBody></DivMenuContainerBody>
        </DivMenuContainer>
    );
};

export default MenuContainer;
