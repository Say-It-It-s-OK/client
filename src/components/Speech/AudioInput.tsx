import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext, SelectedMenuContext } from "../../context/MainContext";
import { LoadingContext } from "../../context/LoadingContext";
import styled from "styled-components";
import nlp from "../../api/request/nlp";
import useAutoRecorder from "../../api/audioRecord";
import sendAudioToServer from "../../api/request/sendAudioToServer";
import sendTextToServer from "../../api/request/sendTextToServer";
import { handleNLPResponse } from "../../handlers/handleNLPResponse";

const InputAudioBar = styled.input`
    display: flex;
    width: 160%;
    text-align: center;
    font-family: var(--font-main);
    font-size: 270%;
    padding: 10px;
    border: none;
`;

const DivUnderlineBar = styled.div<{ volume: number; $recording: string }>`
    width: 80%;
    height: ${({ volume, $recording }) => {
        const clamped = Math.min(Math.max(volume, 0), 30);
        return $recording === "true" ? `${0.7 + clamped / 100}%` : "0.7%";
    }};
    background: linear-gradient(
        to right,
        var(--light-color),
        var(--secondary-color)
    );
    margin: 0 auto;
    border-radius: 20px;
    transition: height 0.05s ease;
    box-shadow: 0px 0px 10px var(--secondary-color);

    clip-path: ${({ volume, $recording }) => {
        if ($recording !== "true") {
            return `
                polygon(
                    0% 0%,
                    100% 0%,
                    100% 40%,
                    50% 100%,
                    0% 40%
                )
            `;
        }
        const clamped = Math.min(Math.max(volume, 0), 100);
        const tipY = 100 + clamped / 1.5;
        return `
            polygon(
                0% 0%,
                100% 0%,
                100% 40%,
                50% ${tipY}%,
                0% 40%
            )
        `;
    }};
`;

const SpeechComponent = () => {
    const {
        setActiveCategory,
        cartItems,
        setCartItems,
        cartId,
        inputText,
        setInputText,
    } = useContext(MainContext);
    const { isLoading, setIsLoading, setOutputText, setRecommendItems } =
        useContext(LoadingContext)!;
    const { setSelectedMenu } = useContext(SelectedMenuContext);
    const navigate = useNavigate();
    const { audioBlob, recording, volume } = useAutoRecorder();

    // useEffect(() => {
    //     const send = async () => {
    //         if (!audioBlob || isLoading) return;
    //         try {
    //             setIsLoading(true);
    //             const result = await sendAudioToServer(audioBlob);
    //             console.log("🎤 서버 응답:", result);
    //             if (result) {
    //                 setInputText(result);
    //                 try {
    //                     const responseData = await nlp(cartId, result);
    //                     setOutputText(responseData.response.speech);
    //                     try {
    //                         await sendTextToServer(
    //                             responseData.response.speech
    //                         );
    //                     } catch (error) {
    //                         console.error("TTS 처리 요청 중 오류 발생", error);
    //                         setActiveCategory("커피");
    //                     }
    //                     handleNLPResponse(
    //                         responseData,
    //                         cartId,
    //                         setActiveCategory,
    //                         setRecommendItems,
    //                         setSelectedMenu,
    //                         setCartItems,
    //                         cartItems,
    //                         navigate
    //                     );
    //                 } catch (error) {
    //                     console.error("자연어 처리 요청 중 오류 발생", error);
    //                     setActiveCategory("커피");
    //                 } finally {
    //                     setIsLoading(false);
    //                 }
    //             } else {
    //                 console.log("잘못된 음성 입력");
    //                 setActiveCategory("커피");
    //                 setIsLoading(false);
    //             }
    //         } catch (error) {
    //             console.error("STT 또는 NLP 처리 중 오류 발생:", error);
    //             setActiveCategory("커피");
    //             setIsLoading(false);
    //         }
    //     };
    //     send();
    // }, [audioBlob]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        setIsLoading(true);
        setActiveCategory("로딩");
        event.preventDefault();
        try {
            const responseData = await nlp(cartId, inputText);
            if (responseData.response.results.length === 1) {
                const result = responseData.response.results[0];
                setOutputText(result.speech);
                try {
                    await sendTextToServer(result.speech);
                } catch (error) {
                    console.error("TTS 처리 요청 중 오류 발생", error);
                }
                await handleNLPResponse(
                    result,
                    cartId,
                    setActiveCategory,
                    setRecommendItems,
                    setSelectedMenu,
                    setCartItems,
                    cartItems,
                    navigate
                );
            }
        } catch (error) {
            console.error("자연어 처리 요청 중 오류 발생", error);
            setActiveCategory("커피");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <OutputBar />
            <form
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
                onSubmit={handleSubmit}
            >
                <InputAudioBar
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="음성으로 주문을 해주세요!"
                />
            </form>
            <DivUnderlineBar
                volume={volume}
                $recording={recording.toString()}
            />
        </>
    );
};

const DivOutputTextBar = styled.div`
    display: flex;
    width: 90%;
    height: 4%;
    justify-content: center;
    align-items: center;
    margin: 13% auto;
    padding: 10px;
    font-family: var(--font-main);
    font-size: 250%;
    background: linear-gradient(
        135deg,
        var(--primary-color),
        var(--light-color)
    );
    border-radius: 15px;
    text-align: center;
    color: var(--accent-color);
    box-shadow: 0px 0px 10px var(--secondary-color);
`;

const OutputBar = () => {
    const { outputText } = useContext(LoadingContext)!;
    return <DivOutputTextBar>{outputText}</DivOutputTextBar>;
};

export { SpeechComponent, OutputBar };
