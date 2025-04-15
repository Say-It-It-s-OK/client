import styled from "styled-components";
import { PaymentButton } from "../Buttons/buttons";

const DivDetailsWholeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;
    height: 25%;
    position: absolute;
    bottom: 6%;
    left: 78%;
    transform: translateX(-50%);
`;

const DivDetailsText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 25%;
    background-color: var(--primary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 150%;
    border: 4px solid var(--border-color);
    border-bottom: none; /* 하단 보더 제외 */
    border-radius: 15px 15px 0 0;
    margin-left: 5%;
`;

const DivDetailsContainer = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85%;
    background-color: var(--light-color);
    border-radius: 15px;
    border: 4px solid var(--border-color);
`;

const DivDetailsPayAmount = styled.div`
    color: var(--accent-color);
    font-family: var(--font-main);
    font-size: 250%;
    margin-bottom: 5%;
    text-align: center;
`;

const Details = ({ cartItems, totalPrice }) => {
    return (
        <DivDetailsWholeContainer>
            <DivDetailsText>결제비용</DivDetailsText>
            <DivDetailsContainer>
                <DivDetailsPayAmount>{totalPrice}원</DivDetailsPayAmount>
                <PaymentButton cartItems={cartItems} totalPrice={totalPrice} />
            </DivDetailsContainer>
        </DivDetailsWholeContainer>
    );
};

export default Details;
