import styled from "styled-components";
import { MenuCard } from "../../Card/Card";

const DivMenuContainer = styled.div`
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
`;

const MenuContainer = () => {
    return (
        <DivMenuContainer>
            <MenuCard />
            <MenuCard />
            <MenuCard />
            <MenuCard />
            <MenuCard />
            <MenuCard />
            <MenuCard />
            <MenuCard />
        </DivMenuContainer>
    );
};

export default MenuContainer;
