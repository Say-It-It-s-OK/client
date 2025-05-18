import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext, SelectedMenuContext } from "../../context/MainContext";
import { LoadingContext } from "../../context/LoadingContext";
import styled from "styled-components";
import nlp from "../../api/request/nlp";
import fetchCarts from "../../api/request/cartLists";
import useAutoRecorder from "../../api/audioRecord";
import sendAudioToServer from "../../api/request/sendAudioToServer";
import sendTextToServer from "../../api/request/sendTextToServer";

const InputAudioBar = styled.input`
    display: flex;
    width: 95%;
    text-align: center;
    font-family: var(--font-main);
    font-size: 300%;
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
    const { setActiveCategory, cartItems, setCartItems, cartId } =
        useContext(MainContext);
    const [inputText, setInputText] = useState("");
    const { setIsLoading, setOutputText, setRecommendItems } =
        useContext(LoadingContext)!;
    const { setSelectedMenu } = useContext(SelectedMenuContext);
    const navigate = useNavigate();

    const { audioBlob, recording, volume } = useAutoRecorder();
    const [transcript, setTranscript] = useState("");

    useEffect(() => {
        const send = async () => {
            if (!audioBlob) return;
            try {
                setIsLoading(true);
                const result = await sendAudioToServer(audioBlob);
                console.log("🎤 서버 응답:", result);
                setTranscript(result);
                setInputText(result);
                try {
                    const responseData = await nlp(result);
                    setOutputText(responseData.response.speech);
                    try {
                        await sendTextToServer(responseData.response.speech);
                    } catch (error) {
                        console.error("TTS 처리 요청 중 오류 발생", error);
                        setActiveCategory("커피");
                    }
                    handleResponse(responseData);
                } catch (error) {
                    console.error("자연어 처리 요청 중 오류 발생", error);
                    setActiveCategory("커피");
                } finally {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("STT 또는 NLP 처리 중 오류 발생:", error);
                setActiveCategory("커피");
                setIsLoading(false);
            }
        };
        send();
    }, [audioBlob]);

    const handleResponse = async (responseData: any) => {
        // query.recommend
        if (responseData.response.response === "query.recommend") {
            setActiveCategory("요구사항");
            setRecommendItems(responseData.response.items);
            console.log("추천된 제품:", responseData.response.items);

            // query.confirm
        } else if (responseData.response.response === "query.confirm") {
            console.log("요청한 메뉴:", responseData.response.page);
            if (responseData.response.page === "커피") {
                setActiveCategory("커피");
            } else if (responseData.response.page === "음료") {
                setActiveCategory("음료");
            } else if (responseData.response.page === "디카페인") {
                setActiveCategory("디카페인");
            } else if (responseData.response.page === "디저트") {
                setActiveCategory("디저트");
            } else if (responseData.response.page === "menu") {
                setActiveCategory("요구사항");
                setRecommendItems(responseData.response.items);
            }

            // query.order
        } else if (responseData.response.response.startsWith("query.order")) {
            console.log("요청한 제품:", responseData.response.items);
            if (responseData.response.response === "query.order.add") {
                if ((responseData.response.page = "order_add")) {
                    const currentCarts = await fetchCarts(cartId);
                    setCartItems(currentCarts?.items || []);
                    setActiveCategory("장바구니");
                } else if (
                    responseData.response.page === "order_optioon_required"
                ) {
                    setSelectedMenu(responseData.response.items);
                    setActiveCategory("옵션");
                }
            } else if (
                responseData.response.response === "query.order.update"
            ) {
                const currentCarts = await fetchCarts(cartId);
                setCartItems(currentCarts?.items || []);
                setActiveCategory("장바구니");
            } else if (
                responseData.response.response === "query.order.delete"
            ) {
                const currentCarts = await fetchCarts(cartId);
                setCartItems(currentCarts?.items || []);
                setActiveCategory("장바구니");
            } else if (responseData.response.response === "query.order.pay") {
                const totalPrice = cartItems.reduce(
                    (sum, item) => sum + item.price,
                    0
                );
                navigate("/payment", {
                    state: {
                        sessionId: cartId,
                        cartItems: cartItems,
                        totalPrice: totalPrice,
                    },
                });
            }

            // query.help
        } else if (responseData.response.response === "query.help") {
            setActiveCategory("도움");

            // query.exit
        } else if (responseData.response.response === "query.exit") {
            navigate("/");

            // query.error
        } else {
            setActiveCategory("커피피");
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        setIsLoading(true);
        setActiveCategory("로딩");
        event.preventDefault();
        try {
            const responseData = await nlp(cartId, inputText);
            setOutputText(responseData.response.speech);
            try {
                await sendTextToServer(responseData.response.speech);
            } catch (error) {
                console.error("TTS 처리 요청 중 오류 발생", error);
            }
            handleResponse(responseData);
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
    background-color: var(--light-color);
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
