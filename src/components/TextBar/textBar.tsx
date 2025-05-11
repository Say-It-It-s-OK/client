import { useContext, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { LoadingContext } from "../../context/LoadingContext";
import styled from "styled-components";
import nlp from "../../api/request/nlp";

const InputTextBar = styled.input`
    display: flex;
    width: 80%;
    text-align: center;
    font-family: var(--font-main);
    font-size: 300%;
    margin-bottom: 5%;
    padding: 10px;
    border: 4px solid #ccc;
    border-radius: 15px;
    box-sizing: border-box;
`;

const InputText = () => {
    const { setActiveCategory } = useContext(MainContext);
    const [inputText, setInputText] = useState("");
    const { setIsLoading, setOutputText } = useContext(LoadingContext)!;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        setIsLoading(true);
        setActiveCategory("로딩");
        event.preventDefault();
        try {
            const responseData = await nlp(inputText);
            setOutputText(responseData.response.speech);
        } catch (error) {
            console.error("자연어 처리 요청 중 오류 발생", error);
        } finally {
            setIsLoading(false);
            setActiveCategory("요구사항");
        }
    };

    return (
        <form
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
            onSubmit={handleSubmit}
        >
            <InputTextBar
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="텍스트를 입력하세요"
            />
        </form>
    );
};

const DivOutputTextBar = styled.div`
    width: 100%;
    height: 5%;
    text-align: center;
    margin: 13%;
    font-family: var(--font-main);
    font-size: 350%;
`;

const OutputText = () => {
    const { outputText } = useContext(LoadingContext)!;
    return <DivOutputTextBar>{outputText}</DivOutputTextBar>;
};

export { InputText, OutputText };
