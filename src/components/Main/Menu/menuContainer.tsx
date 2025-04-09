import styled from "styled-components";
import { MenuCard } from "../../Card/Card";
import Details from "../../Details/details";

const DivMenuContainer = styled.div`
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    position: relative;
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
            <Details />
        </DivMenuContainer>
    );
};

export default MenuContainer;
