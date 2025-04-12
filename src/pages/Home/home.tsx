import { useState } from "react";
import styled from "styled-components";
import Audio from "../../assets/icons/audio_icon.png";
import { NavBar } from "../../components/NavBar/navBar";
import MainContainer from "../../components/Main/mainContainer";
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

const categories = ["요구사항", "장바구니", "커피", "음료", "티", "디저트"];

const Home = ({ menus }) => {
    const [activeCategory, setActiveCategory] = useState<string>("요구사항");

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
            <MainContainer
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                menus={menus}
            />
        </div>
    );
};

export default Home;
