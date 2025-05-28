import styled from "styled-components";
import Audio from "../../assets/icons/audio_icon.png";
import { NavBar } from "../../components/NavBar/navBar";
import MainContainer from "../../components/Main/mainContainer";
import { SpeechComponent } from "../../components/Speech/AudioInput";

const ImgAudio = styled.img`
    width: 12%;
    margin: 5%;
    transition: transform 0.05s ease, filter 0.05s ease;
    transform: scale(1);
    filter: brightness(1);
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
            <SpeechComponent />
            <ImgAudio src={Audio} alt="Audio" />
            <DivMenuBackground />
            <MainContainer />
        </div>
    );
};

export default Home;
