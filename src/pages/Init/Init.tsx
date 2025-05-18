import styled from "styled-components";
import Logo from "../../assets/icons/logo_large.png";
import Audio from "../../assets/icons/audio_icon.png";
import Vector from "../../assets/images/Vector.png";
import { LongButton } from "../../components/Buttons/buttons";
import { useNavigate } from "react-router-dom";
import useAutoRecorder from "../../api/audioRecord";
import { useEffect } from "react";

const ImgIndexLogo = styled.img`
    width: 65%;
    margin: 10%;
`;

const DivIndexText = styled.div`
    color: var(--text-color);
    font-size: var(--font-size);
    text-align: center;
`;

const DivUnderlineBar = styled.div`
    width: 80%;
    height: 0.7%;
    background: linear-gradient(
        to right,
        var(--light-color),
        var(--secondary-color)
    );
    margin: 0 auto;
    border-radius: 20px;
    transition: height 0.05s ease;
    box-shadow: 0px 0px 10px var(--secondary-color);
    clip-path: polygon(0% 0%, 100% 0%, 100% 40%, 50% 100%, 0% 40%);
`;

const ImgAudio = styled.img`
    width: 12%;
    margin: 5%;
`;

const ImgBackGroundVector = styled.img`
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
`;

const Index = () => {
    const navigate = useNavigate();
    const { audioBlob, recording, volume } = useAutoRecorder();
    const handleScreenClick = () => {
        navigate("/home");
    };

    return (
        <div className="container" onClick={handleScreenClick}>
            <ImgIndexLogo src={Logo} alt="Logo" />
            <DivIndexText>
                안녕하세요! 화면을 터치하거나 <br /> 음성으로 주문을 시작하세요!
            </DivIndexText>
            <DivUnderlineBar />
            <ImgAudio src={Audio} alt="Audio" />
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
