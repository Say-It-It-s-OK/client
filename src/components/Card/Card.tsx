import { useContext } from "react";
import styled from "styled-components";
import {
    CartItem,
    MainContext,
    Menu,
    SelectedCartContext,
    SelectedMenuContext,
} from "../../context/MainContext";
import deleteCart from "../../api/request/deleteCart";
import addCart from "../../api/request/addCart";

const DivMenuCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    height: 46%;
    margin-top: 2%;
    position: relative;
`;

const DivMenuCard = styled.div`
    width: 73%;
    aspect-ratio: 1 / 1;
    background-color: #ffffff;
    border: none;
    border-radius: 15px;
    margin-bottom: 5%;
    cursor: pointer;
`;

const DivMenuCardPrice = styled.div`
    display: flex;
    width: 55%;
    height: 12%;
    background-color: var(--primary-color);
    border-radius: 15px 0 15px 0;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 135%;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 13%;
`;

const DivMenuCardName = styled.div`
    display: flex;
    width: 85%;
    height: 17%;
    background-color: var(--primary-color);
    border-radius: 15px;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 130%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

interface MenuProps {
    menu: Menu | undefined;
}

const MenuCard = ({ menu }: MenuProps) => {
    const { setActiveCategory } = useContext(MainContext);
    const { setSelectedMenu } = useContext(SelectedMenuContext);

    const handleMenuClick = () => {
        setSelectedMenu(menu);
        setActiveCategory("옵션");
    };

    if (!menu) {
        console.log("제품이 없습니다.");
        return;
    }

    return (
        <DivMenuCardContainer>
            <DivMenuCardPrice>{menu.price}원</DivMenuCardPrice>
            <DivMenuCard onClick={handleMenuClick} />
            <DivMenuCardName onClick={handleMenuClick}>
                {menu.name}
            </DivMenuCardName>
        </DivMenuCardContainer>
    );
};

const DivOptionCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 70%;
    margin-top: 2%;
`;

const DivOptionCard = styled.div`
    width: 73%;
    aspect-ratio: 1 / 1;
    background-color: #ffffff;
    border: none;
    border-radius: 15px;
    margin-bottom: 5%;
`;

const DivoptionCardPrice = styled.div`
    display: flex;
    width: 23%;
    height: 6%;
    background-color: var(--primary-color);
    border-radius: 15px 0 15px 0;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 180%;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 4.2%;
    left: 8.5%;
`;

const DivOptionCardName = styled.div`
    display: flex;
    width: 85%;
    height: 12%;
    background-color: var(--primary-color);
    border-radius: 15px;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    justify-content: center;
    align-items: center;
`;

const OptionCard = ({ menu }: MenuProps) => {
    if (!menu) {
        console.log("제품이 없습니다.");
        return;
    }
    return (
        <DivOptionCardContainer>
            <DivOptionCard />
            <DivoptionCardPrice>{menu.price}원</DivoptionCardPrice>
            <DivOptionCardName>{menu.name}</DivOptionCardName>
        </DivOptionCardContainer>
    );
};

const DivCartCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    height: 50%;
    position: relative;
`;

const DivCartCard = styled.div`
    width: 65%;
    aspect-ratio: 1 / 1;
    background-color: #ffffff;
    border: none;
    border-radius: 15px;
    margin-bottom: 5%;
    cursor: pointer;
`;

const DivCartCardPrice = styled.div`
    display: flex;
    width: 40%;
    height: 12%;
    background-color: var(--primary-color);
    border-radius: 15px 0 15px 0;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 115%;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 17.4%;
`;

const ButtonCartCardAdd = styled.button`
    display: flex;
    width: 33.3%;
    height: 12%;
    background-color: var(--primary-color);
    border-radius: 0 0 0 15px;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 135%;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 59%;
    left: 17.4%;
    cursor: pointer;

    &:hover {
        background-color: var(--accent-color);
    }
`;

const ButtonCartCardExtract = styled.button`
    display: flex;
    width: 33.3%;
    height: 12%;
    background-color: var(--secondary-color);
    border-radius: 0 0 15px 0;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 135%;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 59%;
    left: 49.4%;
    cursor: pointer;

    &:hover {
        background-color: var(--accent-color);
    }
`;
const DivCartCardName = styled.div`
    display: flex;
    width: 75%;
    height: 17%;
    background-color: var(--primary-color);
    border-radius: 15px;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 105%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

interface ItemProps {
    item: CartItem | undefined;
}

const OptionCartCard = ({ item }: ItemProps) => {
    if (!item) {
        return <div>제품이 없습니다.</div>;
    }
    return (
        <DivOptionCardContainer>
            <DivOptionCard />
            <DivoptionCardPrice>{item.price}원</DivoptionCardPrice>
            <DivOptionCardName>{item.name}</DivOptionCardName>
        </DivOptionCardContainer>
    );
};

const CartCard = ({ item }: ItemProps) => {
    const { setActiveCategory, setCartItems } = useContext(MainContext);
    const { setSelectedCart } = useContext(SelectedCartContext);

    const handleMenuClick = () => {
        setActiveCategory("장바구니 옵션");
        setSelectedCart(item);
    };

    const handleAdd = () => {
        if (!item) {
            return console.log("제품이 없습니다.");
        }
        addCart(item);
        setCartItems((prev) => {
            const index = prev.findIndex(
                (i) =>
                    i.id === item.id &&
                    JSON.stringify(i.options) === JSON.stringify(item.options)
            );

            if (index === -1) {
                return [...prev, item];
            }

            const newItems = [...prev];
            newItems.splice(index + 1, 0, item);
            return newItems;
        });
    };

    const handleRemove = () => {
        if (!item) {
            return console.log("제품이 없습니다.");
        }
        deleteCart(item);
        setCartItems((prev) => {
            const index = prev.findIndex(
                (i) =>
                    i.id === item.id &&
                    JSON.stringify(i.options) === JSON.stringify(item.options)
            );
            if (index !== -1) {
                const newItems = [...prev];
                newItems.splice(index, 1);
                return newItems;
            }
            return prev;
        });
    };

    if (!item) {
        return <div>제품이 없습니다.</div>;
    }

    return (
        <DivCartCardContainer>
            <DivCartCard onClick={handleMenuClick} />
            <DivCartCardPrice>{item.price}</DivCartCardPrice>
            <ButtonCartCardAdd onClick={handleAdd}>+</ButtonCartCardAdd>
            <ButtonCartCardExtract onClick={handleRemove}>
                -
            </ButtonCartCardExtract>
            <DivCartCardName onClick={handleMenuClick}>
                {item.name}
            </DivCartCardName>
        </DivCartCardContainer>
    );
};

const DivItemCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    height: 50%;
    position: relative;
    margin-bottom: 20px;
`;

const DivItemCard = styled.div`
    width: 65%;
    aspect-ratio: 1 / 1;
    background-color: #ffffff;
    border: none;
    border-radius: 15px;
    margin-bottom: 5%;
    cursor: pointer;
`;

const DivItemCardPrice = styled.div`
    display: flex;
    width: 40%;
    height: 12%;
    background-color: var(--primary-color);
    border-radius: 15px 0 15px 0;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 115%;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 17.4%;
`;

const DivItemCardName = styled.div`
    display: flex;
    width: 75%;
    height: 17%;
    background-color: var(--primary-color);
    border-radius: 15px;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 105%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const ItemCard = ({ item }: ItemProps) => {
    if (!item) {
        return <div>제품이 없습니다.</div>;
    }

    return (
        <DivItemCardContainer>
            <DivItemCard />
            <DivItemCardPrice>{item.price}</DivItemCardPrice>
            <DivItemCardName>{item.name}</DivItemCardName>
        </DivItemCardContainer>
    );
};

const DivRecommendCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    height: 50%;
    position: relative;
    margin-bottom: 20px;
`;

const DivRecommendCard = styled.div`
    width: 65%;
    aspect-ratio: 1 / 1;
    background-color: #ffffff;
    border: none;
    border-radius: 15px;
    margin-bottom: 5%;
    cursor: pointer;
`;

const DivRecommendCardPrice = styled.div`
    display: flex;
    width: 40%;
    height: 12%;
    background-color: var(--primary-color);
    border-radius: 15px 0 15px 0;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 115%;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 17.4%;
`;

const DivRecommendCardName = styled.div`
    display: flex;
    width: 75%;
    height: 17%;
    background-color: var(--primary-color);
    border-radius: 15px;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 105%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

interface RecommendProps {
    item: Menu | undefined;
}

const RecommendCard = ({ item }: RecommendProps) => {
    const { setActiveCategory } = useContext(MainContext);
    const { setSelectedMenu } = useContext(SelectedMenuContext);

    const handleMenuClick = () => {
        setSelectedMenu(item);
        setActiveCategory("옵션");
    };

    if (!item) {
        console.log("제품이 없습니다.");
        return;
    }

    if (!item) {
        return <div>제품이 없습니다.</div>;
    }

    return (
        <DivRecommendCardContainer>
            <DivRecommendCard onClick={handleMenuClick} />
            <DivRecommendCardPrice>{item.price}</DivRecommendCardPrice>
            <DivRecommendCardName onClick={handleMenuClick}>
                {item.name}
            </DivRecommendCardName>
        </DivRecommendCardContainer>
    );
};

export {
    MenuCard,
    OptionCard,
    OptionCartCard,
    CartCard,
    ItemCard,
    RecommendCard,
};
