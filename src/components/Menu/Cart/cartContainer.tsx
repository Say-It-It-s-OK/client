import styled from "styled-components";
import { PaymentButton } from "../../Buttons/buttons";

const DivCartContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-center;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 2%;
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
`;

const CartContainer = () => {
    return (
        <DivCartContainer>
            <DivCartTitle>장바구니</DivCartTitle>
            <PaymentButton />
        </DivCartContainer>
    );
};

export default CartContainer;
