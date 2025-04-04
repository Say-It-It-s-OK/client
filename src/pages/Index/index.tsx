import styled from "styled-components";
import Logo from "../../assets/icons/logo_large.png";
import Vector from "../../assets/images/Vector.png";
import LongButton from "../../components/Buttons/buttons";

const ImgIndexLogo = styled.img`
    width: 65%;
    margin: 15%;
`;

const DivIndexText = styled.div`
    color: var(--text-color);
    font-size: var(--font-size);
`;

const ImgBackGroundVector = styled.img`
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
`;

const Index = () => {
    return (
        <div className="container">
            <ImgIndexLogo src={Logo} alt="Logo" />
            <DivIndexText>안녕하세요! 음성으로 주문을 시작하세요!</DivIndexText>
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
