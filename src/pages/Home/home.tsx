import styled from "styled-components";
import Audio from "../../assets/icons/audio_icon.png";
import { NavBar } from "../../components/NavBar/navBar";
import MainContainer from "../../components/Main/mainContainer";
import { SpeechComponent } from "../../components/Speech/AudioInput";
import useAutoRecorder from "../../api/audioRecord";

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
