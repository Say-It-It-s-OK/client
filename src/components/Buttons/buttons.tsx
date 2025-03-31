import styled from "styled-components";

const ButtonLongButton = styled.button`
    position: absolute;
    width: 50%;
    height: 4%;
    background-color: var(--secondary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border: none;
    border-radius: 15px;
    cursor: pointer;

    &:hover {
        background-color: var(--accent-color);
    }
`;

const LongButton = ({ children, top, left }) => {
    return (
        <ButtonLongButton style={{ top: top, left: left }}>
            {children}
        </ButtonLongButton>
    );
};

const ButtonCartButton = styled.button`
    width: 20%;
    height: 75%;
    background-color: var(--secondary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border: none;
    border-radius: 0 0 0 15px;
    cursor: pointer;

    &:hover {
        background-color: var(--accent-color);
    }
`;

const CartButton = () => {
    return <ButtonCartButton />;
};

const ButtonMenuButtonPrimary = styled.button`
    width: 25%;
    height: 100%;
    background-color: var(--primary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border: none;
    border-radius: 15px 15px 0 0;
    cursor: pointer;

    &:hover {
        background-color: var(--accent-color);
    }
`;

const MenuButtonPrimary = ({ children }) => {
    return <ButtonMenuButtonPrimary>{children}</ButtonMenuButtonPrimary>;
};

const ButtonMenuButtonSecondary = styled.button`
    width: 25%;
    height: 100%;
    background-color: var(--secondary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border: none;
    border-radius: 15px 15px 0 0;
    cursor: pointer;

    &:hover {
        background-color: var(--accent-color);
    }
`;

const MenuButtonSecondary = ({ children }) => {
    return <ButtonMenuButtonSecondary>{children}</ButtonMenuButtonSecondary>;
};

export { LongButton, CartButton, MenuButtonPrimary, MenuButtonSecondary };
