import styled from "styled-components";
import { PaymentButton } from "../../Buttons/buttons";
import { CartCard } from "../../Card/Card";

const DivQueryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-center;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 2%;
`;

const DivQueryTitle = styled.div`
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

const DivQueryContainerBody = styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    align-content: flex-start;
    border: none;
    flex-wrap: wrap;
    position: absolute;
    left: 50%;
    bottom: 37%;
    transform: translateX(-50%);
`;

const QueryContainer = () => {
    return (
        <DivQueryContainer>
            <DivQueryTitle>요구사항</DivQueryTitle>
            <DivQueryContainerBody></DivQueryContainerBody>
        </DivQueryContainer>
    );
};

export default QueryContainer;
