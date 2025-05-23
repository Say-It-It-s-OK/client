import styled from "styled-components";
import Logo from "../../assets/icons/logo_large.png";
import Audio from "../../assets/icons/audio_icon.png";
import Vector from "../../assets/images/Vector.png";
import { LongButton } from "../../components/Buttons/buttons";
import { useNavigate } from "react-router-dom";
import useAutoRecorder from "../../api/audioRecord";
import { useContext, useEffect } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import sendAudioToServer from "../../api/request/sendAudioToServer";
import { MainContext } from "../../context/MainContext";

const ImgIndexLogo = styled.img`
    width: 65%;
    margin: 10%;
`;

const DivIndexText = styled.div`
    color: var(--text-color);
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

const ImgBackGroundVector = styled.img`
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
`;

const Index = () => {
    const navigate = useNavigate();
    const { setIsLoading, setOutputText, setRecommendItems } =
        useContext(LoadingContext)!;
    const { inputText, setInputText } = useContext(MainContext);
    const { audioBlob, recording, volume } = useAutoRecorder();

    const handleScreenClick = () => {
        navigate("/home");
    };

    useEffect(() => {
        const send = async () => {
            if (!audioBlob) return;
            try {
                setIsLoading(true);
                const result = await sendAudioToServer(audioBlob);
                console.log("🎤 서버 응답:", result);
                if (result) {
                    setInputText(result);
                    navigate("/home", {
                        state: { fromVoice: true, script: result },
                    });
                } else {
                    console.log("잘못된 음성 입력");
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("STT 처리 중 오류 발생:", error);
                setIsLoading(false);
            }
        };

        send();
    }, [audioBlob]);

    return (
        <div className="container" onClick={handleScreenClick}>
            <ImgIndexLogo src={Logo} alt="Logo" />
            <DivIndexText>
                화면을 터치하거나 <br /> 음성으로 주문을 시작하세요!
            </DivIndexText>
            <DivUnderlineBar
                volume={volume}
                $recording={recording.toString()}
            />
            <ImgAudio
                src={Audio}
                alt="Audio"
                volume={volume}
                $recording={recording}
            />
            <ImgBackGroundVector src={Vector} />
            <LongButton
                children="인기 많은 커피 추천해줘!"
                top="65%"
                left="10%"
            />
            <LongButton
                children="아이스 아메리카노 1잔 주세요"
                top="75%"
                left="40%"
            />
            <LongButton
                children="디카페인 메뉴 뭐가 있어?"
                top="85%"
                left="20%"
            />
        </div>
    );
};

export default Index;
