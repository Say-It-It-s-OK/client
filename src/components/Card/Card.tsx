import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import {
    CartItem,
    MainContext,
    Menu,
    SelectedCartContext,
    SelectedMenuContext,
} from "../../context/MainContext";
import deleteCart from "../../api/request/deleteCart";
import addCart from "../../api/request/addCart";
import fetchCarts from "../../api/request/cartLists";
import { LoadingContext } from "../../context/LoadingContext";
import appendSubjectParticle from "../../handlers/handleAppendSubjectParticle";

const DivMenuCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    height: 46%;
    margin-top: 2%;
    position: relative;
`;

const ImgMenuCard = styled.img`
    width: 73%;
    aspect-ratio: 1 / 1;
    background-color: #ffffff;
    border: none;
    border-radius: 15px;
    margin-bottom: 5%;
    cursor: pointer;
    box-shadow: 0px 0px 15px var(--primary-color);
    object-fit: contain;
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
    box-shadow: 0px 0px 15px var(--primary-color);
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
    box-shadow: 0px 0px 15px var(--primary-color);
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
            <ImgMenuCard
                onClick={handleMenuClick}
                src={menu.image}
                alt={menu.name}
            ></ImgMenuCard>
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
    width: 45%;
    height: 70%;
    margin-top: 2%;
`;

const ImgOptionCard = styled.img`
    width: 73%;
    aspect-ratio: 1 / 1;
    background-color: #ffffff;
    border: none;
    border-radius: 15px;
    margin-bottom: 5%;
    box-shadow: 0px 0px 15px var(--primary-color);
    object-fit: contain;
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
    top: 4.5%;
    left: 7.5%;
    box-shadow: 0px 0px 15px var(--primary-color);
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
    box-shadow: 0px 0px 15px var(--primary-color);
`;

const OptionCard = ({ menu }: MenuProps) => {
    if (!menu) {
        console.log("제품이 없습니다.");
        return;
    }
    return (
        <DivOptionCardContainer>
            <ImgOptionCard src={menu.image} alt={menu.name} />
            <DivoptionCardPrice>{menu.price}원</DivoptionCardPrice>
            <DivOptionCardName>{menu.name}</DivOptionCardName>
        </DivOptionCardContainer>
    );
};
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DivCartCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 30%;
    background: linear-gradient(
        180deg,
        var(--card-color) 0%,
        var(--gradient-color) 100%
    );
    border: none;
    border-radius: 15px;
    position: relative;
    padding: 3.5%;
    margin: 1%;
    box-shadow: 0px 0px 15px var(--primary-color);
    gap: 3%;
    cursor: pointer;
    border-radius: 15px;
    border: 2px solid var(--border-color);
    animation: ${fadeIn} 0.5s ease-in-out;
`;

const ImgCartCard = styled.img`
    width: 19%;
    aspect-ratio: 1 / 1;
    background-color: #ffffff;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 0px 0px 15px var(--primary-color);
    object-fit: contain;
`;

const DivCartCardPrice = styled.div`
    display: flex;
    width: 13%;
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
    top: 7.5%;
    left: 3.5%;
`;

const ButtonCartCardAdd = styled.button`
    display: flex;
    width: 35%;
    height: 20%;
    background-color: var(--light-color);
    border-radius: 15px;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 135%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0px 0px 15px var(--primary-color);
    position: absolute;
    top: 78%;
    left: 25%;

    &:hover {
        background-color: var(--accent-color);
    }
`;

const ButtonCartCardExtract = styled.button`
    display: flex;
    width: 35%;
    height: 20%;
    background-color: var(--secondary-color);
    border-radius: 15px;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 135%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0px 0px 15px var(--primary-color);
    position: absolute;
    top: 78%;
    left: 60%;

    &:hover {
        background-color: var(--accent-color);
    }
`;
const DivCartCardName = styled.div`
    display: flex;
    width: 70%;
    height: 18%;
    background-color: var(--primary-color);
    border-radius: 15px;
    border: 4px solid var(--border-color);
    color: white;
    font-family: var(--font-main);
    font-size: 105%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: absolute;
    top: 2%;
    left: 25%;
    box-shadow: 0px 0px 15px var(--primary-color);
`;

const DivCartContentContainer = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const DivCartContentNoneContainer = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: var(--font-main);
    font-size: 180%;
    margin-left: 10%;
`;

const DivOptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 2%;
    gap: 2%;
`;

const DivOptionName = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 88%;
    color: white;
    font-family: var(--font-main);
    font-size: 130%;
    background: linear-gradient(
        135deg,
        var(--primary-color),
        var(--light-color)
    );
    border-radius: 8px;
    border: 4px solid var(--border-color);
`;

const DivOptionValue = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 65%;
    height: 90%;
    color: white;
    font-family: var(--font-main);
    font-size: 140%;
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
            <ImgOptionCard src={item.image} alt={item.name} />
            <DivoptionCardPrice>{item.price}원</DivoptionCardPrice>
            <DivOptionCardName>{item.name}</DivOptionCardName>
        </DivOptionCardContainer>
    );
};

const CartCard = ({ item }: ItemProps) => {
    const { setActiveCategory, setCartItems, cartId } = useContext(MainContext);
    const { setSelectedCart } = useContext(SelectedCartContext);
    const { setOutputText } = useContext(LoadingContext)!;

    const handleMenuClick = () => {
        setActiveCategory("장바구니 옵션");
        setSelectedCart(item);
    };

    const handleAdd = async () => {
        if (!item) {
            return console.log("제품이 없습니다.");
        }
        await addCart(cartId, item);
        const currentCarts = await fetchCarts(cartId);
        setCartItems(currentCarts?.items || []);
        setOutputText(
            `${appendSubjectParticle(item.name)} 장바구니에 추가되었습니다`
        );
    };

    const handleRemove = async () => {
        if (!item) {
            return console.log("제품이 없습니다.");
        }
        await deleteCart(cartId, item);
        const currentCarts = await fetchCarts(cartId);
        setCartItems(currentCarts?.items || []);
        setOutputText(
            `${appendSubjectParticle(item.name)} 장바구니에서 삭제되었습니다`
        );
    };

    if (!item) {
        return <div>제품이 없습니다.</div>;
    }

    const setOption = () => {
        const entries = Object.entries(item.selectedOptions);
        const options = entries.map(([optionName, optionValues], index) => {
            if (index !== 3) {
                return (
                    <DivOptionContainer key={optionName + optionValues}>
                        <DivOptionName>{optionName}</DivOptionName>
                        <DivOptionValue>{optionValues}</DivOptionValue>
                    </DivOptionContainer>
                );
            }
            return null;
        });

        const filtered = options.filter(Boolean);
        if (filtered.length === 0) {
            return (
                <DivCartContentNoneContainer>
                    옵션이 제공되지 않는 제품입니다
                </DivCartContentNoneContainer>
            );
        }

        return filtered;
    };

    return (
        <DivCartCardContainer>
            <ImgCartCard
                src={item.image}
                alt={item.name}
                onClick={handleMenuClick}
            />
            <DivCartCardName>{item.name}</DivCartCardName>
            <DivCartCardPrice>{item.price}</DivCartCardPrice>
            <ButtonCartCardAdd onClick={handleAdd}>+</ButtonCartCardAdd>
            <ButtonCartCardExtract onClick={handleRemove}>
                -
            </ButtonCartCardExtract>
            <DivCartContentContainer onClick={handleMenuClick}>
                {setOption()}
            </DivCartContentContainer>
        </DivCartCardContainer>
    );
};

const DivPayContentContainer = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 4%;
    gap: 3%;
`;

const DivPayCardPrice = styled.div`
    display: flex;
    width: 13%;
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
    top: 5.5%;
    left: 3.5%;
`;

const ItemCard = ({ item }: ItemProps) => {
    if (!item) {
        return <div>제품이 없습니다.</div>;
    }

    const setOption = () => {
        return Object.entries(item.selectedOptions).map(
            ([optionName, optionValues], index) => {
                if (index !== 3)
                    return (
                        <DivOptionContainer>
                            <DivOptionName key={index}>
                                {optionName}
                            </DivOptionName>
                            <DivOptionValue key={index + 3}>
                                {optionValues}
                            </DivOptionValue>
                        </DivOptionContainer>
                    );
            }
        );
    };

    return (
        <DivCartCardContainer>
            <ImgCartCard src={item.image} alt={item.name} />
            <DivCartCardName>{item.name}</DivCartCardName>
            <DivPayCardPrice>{item.price}</DivPayCardPrice>
            <DivPayContentContainer>{setOption()}</DivPayContentContainer>
        </DivCartCardContainer>
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

const ImgRecommendCard = styled.img`
    width: 65%;
    aspect-ratio: 1 / 1;
    background-color: #ffffff;
    border: none;
    border-radius: 15px;
    margin-bottom: 5%;
    cursor: pointer;
    box-shadow: 0px 0px 15px var(--primary-color);
    object-fit: contain;
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
    box-shadow: 0px 0px 15px var(--primary-color);
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
    box-shadow: 0px 0px 15px var(--primary-color);
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
            <ImgRecommendCard
                src={item.image}
                alt={item.name}
                onClick={handleMenuClick}
            />
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
