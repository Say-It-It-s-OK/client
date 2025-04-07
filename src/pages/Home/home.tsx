import { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Audio from "../../assets/icons/audio_icon.png";
import NavBar from "../../components/NavBar/navBar";
import MenuContainer from "../../components/Menu/menuContainer";
import { InputText, OutputText } from "../../components/TextBar/textBar";

const ImgAudio = styled.img`
    width: 15%;
    margin: 5%;
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

const categories = [
    undefined,
    "장바구니",
    "커피",
    "음료",
    "디카페인",
    "디저트",
];

const Home = () => {
    const [activeCategory, setActiveCategory] = useState<string | undefined>(
        undefined
    );

    return (
        <div className="container">
            <NavBar
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <OutputText />
            <InputText />
            <ImgAudio src={Audio} alt="Audio" />
            <DivMenuBackground />
            <MenuContainer
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
        </div>
    );
};

export default Home;
