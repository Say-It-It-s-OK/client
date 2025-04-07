import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Logo from "../../assets/icons/logo_large.png";
import { CartButton } from "../Buttons/buttons";

const Nav = styled.nav`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const ImgNavLogo = styled.img`
    width: 20%;
    margin: 2% 0 0 0;
`;

interface CategoryProps {
    activeCategory: string;
    setActiveCategory: Dispatch<SetStateAction<string | undefined>>;
}

const NavBar = ({ activeCategory, setActiveCategory }: CategoryProps) => {
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    return (
        <Nav>
            <ImgNavLogo src={Logo} alt="Logo" />
            <CartButton
                active={activeCategory === "장바구니"}
                onClick={() => handleCategoryClick("장바구니")}
            />
        </Nav>
    );
};

export default NavBar;
