import { useState, useEffect } from "react";
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

const categories = [
    "요구사항",
    "장바구니",
    "장바구니 옵션",
    "커피",
    "음료",
    "디카페인",
    "디저트",
    "옵션",
];

const Home = ({ menus }) => {
    const [activeCategory, setActiveCategory] = useState<string>("요구사항");
    const [cartItems, setCartItems] = useState<[]>([]);

    useEffect(() => {
        console.log("장바구니에 담긴 제품", cartItems);
    }, [cartItems]);

    return (
        <div className="container">
            <NavBar
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                cartItemsCount={cartItems.length}
            />
            <OutputText />
            <InputText />
            <ImgAudio src={Audio} alt="Audio" />
            <DivMenuBackground />
            <MainContainer
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                cartItems={cartItems}
                setCartItems={setCartItems}
                menus={menus}
            />
        </div>
    );
};

export default Home;
