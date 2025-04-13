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

const MenuContainer = ({ setActiveCategory, setSelectedMenu, menus }) => {
    console.log(`${menus[0].type} 메뉴 목록`, menus);

    return (
        <DivMenuContainer>
            {menus.map((menu) => (
                <MenuCard
                    key={menu._id}
                    menu={menu}
                    setActiveCategory={setActiveCategory}
                    setSelectedMenu={setSelectedMenu}
                />
            ))}
            <Details />
        </DivMenuContainer>
    );
};

export default MenuContainer;
