import styled from "styled-components";
import Audio from "../../assets/icons/audio_icon.png";
import { NavBar } from "../../components/NavBar/navBar";
import MainContainer from "../../components/Main/mainContainer";
import { SpeechComponent } from "../../components/Speech/AudioInput";
import useAutoRecorder from "../../api/audioRecord";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import nlp from "../../api/request/nlp";
import { MainContext, SelectedMenuContext } from "../../context/MainContext";
import { LoadingContext } from "../../context/LoadingContext";
import fetchCarts from "../../api/request/cartLists";
import sendTextToServer from "../../api/request/sendTextToServer";

const ImgAudio = styled.img<{ volume: number; $recording: boolean }>`
    width: 12%;
    margin: 5%;
    transition: transform 0.05s ease, filter 0.05s ease;

    transform: ${({ volume, $recording }) => {
        if (!$recording) return "scale(1)";
        const clamped = Math.min(Math.max(volume, 0), 100);
        const scale = 1 + clamped / 500;
        return `scale(${scale})`;
    }};

    filter: ${({ volume, $recording }) => {
        if (!$recording) return "brightness(1)";
        const clamped = Math.min(Math.max(volume, 0), 100);
        const brightness = 1 + clamped / 300;
        return `brightness(${brightness})`;
    }};
`;

const DivMenuBackground = styled.div`
    display: flex;
    width: 100%;
    height: 5%;
    align-content: flex-start;
    background-color: var(--accent-color);
    border: none;
    position: absolute;
    bottom: 43%;
`;

const Home = () => {
    const { audioBlob, recording, volume } = useAutoRecorder();
    const { setActiveCategory, cartItems, setCartItems, cartId } =
        useContext(MainContext);
    const { setIsLoading, setOutputText, setRecommendItems } =
        useContext(LoadingContext)!;
    const { setSelectedMenu } = useContext(SelectedMenuContext);
    const location = useLocation();
    const fromVoice = location.state?.fromVoice;
    const script = location.state?.script;
    const navigate = useNavigate();

    useEffect(() => {
        const runNLP = async () => {
            if (fromVoice && script) {
                console.log("🎙️ 음성으로 진입, NLP 처리 시작");
                try {
                    const responseData = await nlp(cartId, script);
                    setOutputText(responseData.response.speech);
                    try {
                        await sendTextToServer(responseData.response.speech);
                    } catch (error) {
                        console.error("TTS 처리 요청 중 오류 발생", error);
                        setActiveCategory("커피");
                    }
                    handleResponse(responseData);
                } catch (error) {
                    console.error("❌ NLP 처리 중 오류:", error);
                    setActiveCategory("커피");
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
                setActiveCategory("커피");
            }
        };
        runNLP();
    }, []);

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
                        nlp: true,
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
            setActiveCategory("커피");
        }
    };

    return (
        <div className="container">
            <NavBar />
            <SpeechComponent />
            <ImgAudio
                src={Audio}
                alt="Audio"
                volume={volume}
                $recording={recording}
            />
            <DivMenuBackground />
            <MainContainer />
        </div>
    );
};

export default Home;
