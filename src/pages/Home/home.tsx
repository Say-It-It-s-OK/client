import { useContext, useEffect } from "react";
import { CartItem, MainContext } from "../../context/MainContext";
import styled from "styled-components";
import Audio from "../../assets/icons/audio_icon.png";
import { NavBar } from "../../components/NavBar/navBar";
import MainContainer from "../../components/Main/mainContainer";
import { InputText, OutputText } from "../../components/TextBar/textBar";
import fetchCarts from "../../api/request/cartLists";

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

const Home = () => {
    return (
        <div className="container">
            <NavBar />
            <OutputText />
            <InputText />
            <ImgAudio src={Audio} alt="Audio" />
            <DivMenuBackground />
            <MainContainer />
        </div>
    );
};

export default Home;
