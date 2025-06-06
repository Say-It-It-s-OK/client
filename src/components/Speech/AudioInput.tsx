import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    CartItem,
    MainContext,
    SelectedCartContext,
    SelectedMenuContext,
} from "../../context/MainContext";
import { LoadingContext } from "../../context/LoadingContext";
import styled, { keyframes } from "styled-components";
import nlp from "../../api/request/nlp";
import useAutoRecorder from "../../api/audioRecord";
import sendAudioToServer from "../../api/request/sendAudioToServer";
import { handleNLPResponse } from "../../handlers/handleNLPResponse";
import Logo from "../../assets/icons/logo_small_icon.png";
import fetchCarts from "../../api/request/cartLists";

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
        activeCategory,
        setActiveCategory,
        cartItems,
        setCartItems,
        cartId,
        inputText,
        setInputText,
        multiOrder,
        setMultiOrder,
        multiResults,
        setMultiResults,
    } = useContext(MainContext);
    const { isLoading, setIsLoading, setOutputText, setRecommendItems } =
        useContext(LoadingContext)!;
    const { selectedMenu, setSelectedMenu } = useContext(SelectedMenuContext);
    const { selectedCart, setSelectedCart } = useContext(SelectedCartContext);
    const navigate = useNavigate();
    const { audioBlob, recording, volume } = useAutoRecorder();

    useEffect(() => {
        const send = async () => {
            if (!audioBlob || isLoading) return;
            try {
                setIsLoading(true);
                const result = await sendAudioToServer(audioBlob);
                console.log("🎤 서버 응답:", result);
                if (result) {
                    setInputText(result);
                    try {
                        const responseData = await nlp(
                            cartId,
                            result,
                            activeCategory
                        );
                        if (responseData.response.page) {
                            const result = responseData.response;
                            await handleNLPResponse(
                                result,
                                cartId,
                                activeCategory,
                                setActiveCategory,
                                setRecommendItems,
                                selectedMenu,
                                setSelectedMenu,
                                selectedCart,
                                setSelectedCart,
                                setCartItems,
                                cartItems,
                                multiOrder,
                                setMultiOrder,
                                multiResults,
                                setMultiResults,
                                setOutputText,
                                navigate
                            );
                        } else if (responseData.response.results.length === 1) {
                            const result = responseData.response.results[0];
                            await handleNLPResponse(
                                result,
                                cartId,
                                activeCategory,
                                setActiveCategory,
                                setRecommendItems,
                                selectedMenu,
                                setSelectedMenu,
                                selectedCart,
                                setSelectedCart,
                                setCartItems,
                                cartItems,
                                multiOrder,
                                setMultiOrder,
                                multiResults,
                                setMultiResults,
                                setOutputText,
                                navigate
                            );
                        } else if (
                            !multiOrder &&
                            responseData.response.results.length > 1
                        ) {
                            console.log("다중 요청 처리 중...");
                            let results = responseData.response.results;
                            results = handelNoneOptions(results);
                            if (results.length === 0) {
                                setMultiResults([]);
                                setMultiOrder(false);
                                const currentCarts = await fetchCarts(cartId);
                                setCartItems(currentCarts?.items || []);
                                setOutputText(
                                    "주문하신 메뉴가 장바구니에 추가되었습니다다"
                                );
                                setActiveCategory("장바구니");
                                return;
                            }
                            await handleNLPResponse(
                                results[0],
                                cartId,
                                activeCategory,
                                setActiveCategory,
                                setRecommendItems,
                                selectedMenu,
                                setSelectedMenu,
                                selectedCart,
                                setSelectedCart,
                                setCartItems,
                                cartItems,
                                multiOrder,
                                setMultiOrder,
                                multiResults,
                                setMultiResults,
                                setOutputText,
                                navigate
                            );
                        }
                    } catch (error) {
                        console.error("자연어 처리 요청 중 오류 발생", error);
                        setActiveCategory("커피");
                    } finally {
                        setIsLoading(false);
                        setInputText("");
                    }
                } else {
                    console.log("잘못된 음성 입력");
                    setActiveCategory("커피");
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    // 다중 주문 로직
    // 처음 다중 주문 시작 시
    // multiOrder가 true로 변경
    // 옵션 상태에서 다른 상태로 "커피", "음료", "디카페인", "디저트", "장바구니", "요구사항", "도움", "결제" 등으로 변경 시 multiOrder를 false로 변경
    // 옵션 변경 또는 해당 제품 장바구니 추가시에는 multiOrder를 유지

    const handleSubmit = async (event: React.FormEvent) => {
        setIsLoading(true);
        setActiveCategory("로딩");
        event.preventDefault();
        try {
            const responseData = await nlp(cartId, inputText, activeCategory);
            if (responseData.response.page) {
                const result = responseData.response;
                await handleNLPResponse(
                    result,
                    cartId,
                    activeCategory,
                    setActiveCategory,
                    setRecommendItems,
                    selectedMenu,
                    setSelectedMenu,
                    selectedCart,
                    setSelectedCart,
                    setCartItems,
                    cartItems,
                    multiOrder,
                    setMultiOrder,
                    multiResults,
                    setMultiResults,
                    setOutputText,
                    navigate
                );
            } else if (responseData.response.results.length === 1) {
                const result = responseData.response.results[0];
                await handleNLPResponse(
                    result,
                    cartId,
                    activeCategory,
                    setActiveCategory,
                    setRecommendItems,
                    selectedMenu,
                    setSelectedMenu,
                    selectedCart,
                    setSelectedCart,
                    setCartItems,
                    cartItems,
                    multiOrder,
                    setMultiOrder,
                    multiResults,
                    setMultiResults,
                    setOutputText,
                    navigate
                );
            } else if (
                !multiOrder &&
                responseData.response.results.length > 1
            ) {
                console.log("다중 요청 처리 중...");
                let results = responseData.response.results;
                results = handelNoneOptions(results);
                if (results.length === 0) {
                    setMultiResults([]);
                    setMultiOrder(false);
                    const currentCarts = await fetchCarts(cartId);
                    setCartItems(currentCarts?.items || []);
                    setOutputText(
                        "주문하신 메뉴가 장바구니에 추가되었습니다다"
                    );
                    setActiveCategory("장바구니");
                    return;
                }
                await handleNLPResponse(
                    results[0],
                    cartId,
                    activeCategory,
                    setActiveCategory,
                    setRecommendItems,
                    selectedMenu,
                    setSelectedMenu,
                    selectedCart,
                    setSelectedCart,
                    setCartItems,
                    cartItems,
                    multiOrder,
                    setMultiOrder,
                    multiResults,
                    setMultiResults,
                    setOutputText,
                    navigate
                );
                setMultiOrder(true);
                setMultiResults(results.slice(1));
            }
        } catch (error) {
            console.error("자연어 처리 요청 중 오류 발생", error);
            setActiveCategory("커피");
        } finally {
            setInputText("");
            setIsLoading(false);
        }
    };

    const handelNoneOptions = (results: any[]) => {
        const filteredResults = results.filter(
            (result) => result.page !== "order_add"
        );
        console.log("옵션이 없는 주문 처리 후 결과:", filteredResults);

        return filteredResults;
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

const fadeText = keyframes`
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DivOutputTextBar = styled.div`
    display: flex;
    width: 90%;
    height: 8%;
    justify-content: center;
    align-items: center;
    margin: 10% auto;
    padding: 20px;
    font-family: var(--font-main);
    font-size: 190%;
    background: linear-gradient(100deg, var(--light-color));
    border-radius: 15px;
    text-align: center;
    color: var(--accent-color);
    box-shadow: 0px 0px 10px var(--secondary-color);
`;

const AnimatedText = styled.span`
    animation: ${fadeText} 0.8s ease-in-out;
`;

const ImgLogo = styled.img`
    width: 20%;
    vertical-align: middle;
    animation: ${fadeText} 0.8s ease-in-out;
`;

const OutputBar = () => {
    const { outputText } = useContext(LoadingContext)!;
    return (
        <DivOutputTextBar>
            {outputText === "말하면 OK!" ? (
                <ImgLogo src={Logo} alt="logo" />
            ) : (
                <AnimatedText key={outputText}>{outputText}</AnimatedText>
            )}
        </DivOutputTextBar>
    );
};

export { SpeechComponent, OutputBar };
