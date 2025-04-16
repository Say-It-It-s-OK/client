import { Dispatch, SetStateAction, useContext } from "react";
import styled from "styled-components";
import Logo from "../../assets/icons/logo_large.png";
import { CartButton } from "../Buttons/buttons";
import { MainContext } from "../../context/MainContext";

const Nav = styled.nav`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const ImgNavLogo = styled.img`
    width: 20%;
    margin: 2% 0 0 0;
`;

const NavBar = () => {
    const { activeCategory, setActiveCategory, cartItems } =
        useContext(MainContext);
    return (
        <Nav>
            <ImgNavLogo src={Logo} alt="Logo" />
            <CartButton
                active={activeCategory === "장바구니"}
                onClick={() => setActiveCategory("장바구니")}
                itemsCount={cartItems.length}
            />
        </Nav>
    );
};

const PaymentNav = () => {
    return (
        <Nav>
            <ImgNavLogo src={Logo} alt="Logo" />
            <div style={{ width: "20%" }} />
        </Nav>
    );
};

export { NavBar, PaymentNav };
