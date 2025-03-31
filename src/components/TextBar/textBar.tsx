import styled from "styled-components";

const DivInputTextBar = styled.div`
    width: 100%;
    text-align: center;
    font-family: var(--font-main);
    font-size: 300%;
    margin-bottom: 5%;
`;

const InputText = () => {
    return <DivInputTextBar>입력 텍스트</DivInputTextBar>;
};

const DivOutputTextBar = styled.div`
    width: 100%;
    text-align: center;
    margin: 13%;
    font-family: var(--font-main);
    font-size: 350%;
`;

const OutputText = () => {
    return <DivOutputTextBar>출력 텍스트</DivOutputTextBar>;
};

export { InputText, OutputText };
