import styled from "styled-components";

const DivMenuCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    height: 30%;
    margin-top: 2%;
`;

const DivMenuCard = styled.div`
    width: 73%;
    aspect-ratio: 1 / 1;
    background-color: #ffffff;
    border: none;
    border-radius: 15px;
    margin-bottom: 5%;
`;

const DivMenuCardName = styled.div`
    width: 85%;
    height: 17%;
    background-color: var(--primary-color);
    border-radius: 15px;
    border: 4px solid var(--border-color);
`;

const MenuCard = () => {
    return (
        <DivMenuCardContainer>
            <DivMenuCard />
            <DivMenuCardName />
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
    height: 55%;
    margin-top: 2%;
`;

const DivCartCard = styled.div`
    width: 73%;
    aspect-ratio: 1 / 1;
    background-color: #ffffff;
    border: none;
    border-radius: 15px;
    margin-bottom: 5%;
`;

const DivCartCardName = styled.div`
    width: 85%;
    height: 17%;
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
