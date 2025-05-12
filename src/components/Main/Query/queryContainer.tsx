import styled from "styled-components";
import { useContext } from "react";
import { LoadingContext } from "../../../context/LoadingContext";
import { RecommendCard } from "../../Card/Card";
import Details from "../../Details/details";
import { MainContext } from "../../../context/MainContext";

const DivQueryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-center;
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 1%;
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

const QueryContainer = () => {
    const { outputText, recommendItems } = useContext(LoadingContext)!;
    const { activeCategory, cartItems } = useContext(MainContext);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <DivQueryContainer>
            <DivQueryTitle>{outputText}</DivQueryTitle>
            <DivQueryContainerBody>
                {recommendItems.map((item) => (
                    <RecommendCard key={item.id} item={item} />
                ))}
            </DivQueryContainerBody>
            <Details key={null} cartItems={cartItems} totalPrice={totalPrice} />
        </DivQueryContainer>
    );
};

export default QueryContainer;
