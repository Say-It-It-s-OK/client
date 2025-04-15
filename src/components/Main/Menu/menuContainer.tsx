import styled from "styled-components";
import { MenuCard } from "../../Card/Card";
import Details from "../../Details/details";

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

const MenuContainer = ({
    setActiveCategory,
    setSelectedMenu,
    menus,
    cartItems,
}) => {
    console.log(`${menus[0].type} 메뉴 목록`, menus);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <DivMenuContainer>
            <DivMenuContainerBody>
                {menus.map((menu) => (
                    <MenuCard
                        key={menu._id}
                        menu={menu}
                        setActiveCategory={setActiveCategory}
                        setSelectedMenu={setSelectedMenu}
                    />
                ))}
            </DivMenuContainerBody>
            <Details key={null} cartItems={cartItems} totalPrice={totalPrice} />
        </DivMenuContainer>
    );
};

export default MenuContainer;
