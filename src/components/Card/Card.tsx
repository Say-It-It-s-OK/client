import styled from "styled-components";

const DivMenuCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    height: 30%;
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
    font-size: 170%;
    justify-content: center;
    align-items: center;
`;

const MenuCard = ({ menu }) => {
    return (
        <DivMenuCardContainer>
            <DivMenuCardPrice>{menu.price}원</DivMenuCardPrice>
            <DivMenuCard />
            <DivMenuCardName>{menu.name}</DivMenuCardName>
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

const DivOptionCardName = styled.div`
    width: 85%;
    height: 12%;
    background-color: var(--primary-color);
    border-radius: 15px;
    border: 4px solid var(--border-color);
`;

const OptionCard = () => {
    return (
        <DivOptionCardContainer>
            <DivOptionCard />
            <DivOptionCardName />
        </DivOptionCardContainer>
    );
};

const DivCartCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    height: 50%;
    margin-top: 1%;
`;

const DivCartCard = styled.div`
    width: 60%;
    aspect-ratio: 1 / 1;
    background-color: #ffffff;
    border: none;
    border-radius: 15px;
    margin-bottom: 5%;
`;

const DivCartCardName = styled.div`
    width: 75%;
    height: 18%;
    background-color: var(--primary-color);
    border-radius: 15px;
    border: 4px solid var(--border-color);
`;

const CartCard = () => {
    return (
        <DivCartCardContainer>
            <DivCartCard />
            <DivCartCardName />
        </DivCartCardContainer>
    );
};

export { MenuCard, OptionCard, CartCard };
