import styled from "styled-components";
import Audio from "../../assets/icons/audio_icon.png";
import NavBar from "../../components/NavBar/navBar";
import MenuContainer from "../../components/Menu/menuContainer";
import { InputText, OutputText } from "../../components/TextBar/textBar";

const ImgAudio = styled.img`
    width: 15%;
    margin: 5%;
`;

const Home = () => {
    return (
        <div className="container">
            <NavBar />
            <OutputText />
            <InputText />
            <ImgAudio src={Audio} alt="Audio" />
            <MenuContainer />
        </div>
    );
};

export default Home;
