import styled from "styled-components";
import Details from "../../Details/details";
import { CartCard } from "../../Card/Card";
import { useContext } from "react";
import { MainContext } from "../../../context/MainContext";

const DivCartContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-center;
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 1%;
`;

const DivCartTitle = styled.div`
    display: flex;
    width: 60%;
    height: 8%;
    background-color: var(--secondary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0px 0px 10px var(--primary-color);
`;

const DivCartContainerBody = styled.div`
    display: flex;
    width: 100%;
    height: 56%;
    align-content: flex-start;
    border: none;
    flex-wrap: wrap;
    position: absolute;
    left: 50%;
    bottom: 33%;
    transform: translateX(-50%);
    max-height: 56%;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 15px;
        background: var(--accent-color);
    }
`;

const CartContainer = () => {
    const { cartItems } = useContext(MainContext);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    return (
        <DivCartContainer>
            <DivCartTitle>장바구니</DivCartTitle>
            <DivCartContainerBody>
                {cartItems.map((item, index) => (
                    <CartCard
                        key={index}
                        item={{ ...item, cartIndex: index }}
                    />
                ))}
            </DivCartContainerBody>
            <Details key={null} cartItems={cartItems} totalPrice={totalPrice} />
        </DivCartContainer>
    );
};

export default CartContainer;
