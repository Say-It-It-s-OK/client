import styled from "styled-components";
import { useContext } from "react";
import { LoadingContext } from "../../../context/LoadingContext";
import { RecommendCard } from "../../Card/Card";

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
    const { outputText, recommendItems } = useContext(LoadingContext)!;

    return (
        <DivQueryContainer>
            <DivQueryTitle>{outputText}</DivQueryTitle>
            <DivQueryContainerBody>
                {recommendItems.length === 3
                    ? recommendItems.map((item) => (
                          <RecommendCard item={item} />
                      ))
                    : recommendItems.map((item) => (
                          <RecommendCard key={item.id} item={item} />
                      ))}
            </DivQueryContainerBody>
        </DivQueryContainer>
    );
};

export default QueryContainer;
