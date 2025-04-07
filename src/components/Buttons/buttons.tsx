import styled from "styled-components";

const ButtonLongButton = styled.button`
    position: absolute;
    width: 50%;
    height: 4%;
    background-color: var(--primary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border: 4px solid var(--border-color);
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

interface buttonProps {
    children?: string;
    active: boolean;
    onClick: () => void;
}

const ButtonCartButton = styled.button<{ active?: boolean }>`
    width: 20%;
    height: 75%;
    background-color: var(--primary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border: none;
    border-radius: 0 0 0 15px;
    cursor: pointer;

    &:hover {
        background-color: var(--accent-color);
    }

    ${({ active }) =>
        active &&
        `
        background-color: var(--accent-color);
    `}
`;

const CartButton = ({ active, onClick }: buttonProps) => {
    return <ButtonCartButton active={active} onClick={onClick} />;
};

const ButtonMenuButtonPrimary = styled.button<{ active?: boolean }>`
    width: 25%;
    height: 100%;
    background-color: var(--primary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border: none;
    border-radius: 15px 15px 0 0;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
        background-color: var(--accent-color);
    }

    ${({ active }) =>
        active &&
        `
        transform: translateY(-30%);
        background-color: var(--accent-color);
    `}
`;

const MenuButtonPrimary = ({ children, active, onClick }: buttonProps) => {
    return (
        <ButtonMenuButtonPrimary active={active} onClick={onClick}>
            {children}
        </ButtonMenuButtonPrimary>
    );
};

const ButtonMenuButtonSecondary = styled.button<{ active?: boolean }>`
    width: 25%;
    height: 100%;
    background-color: var(--secondary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border: none;
    border-radius: 15px 15px 0 0;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: var(--accent-color);
    }

    ${({ active }) =>
        active &&
        `
        transform: translateY(-30%);
        background-color: var(--accent-color);
    `}
`;

const MenuButtonSecondary = ({ children, active, onClick }: buttonProps) => {
    return (
        <ButtonMenuButtonSecondary active={active} onClick={onClick}>
            {children}
        </ButtonMenuButtonSecondary>
    );
};

const ButtonPaymentButton = styled.button`
    width: 40%;
    height: 8%;
    background-color: var(--secondary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border: none;
    border-radius: 15px;
    border: 4px solid var(--border-color);
    cursor: pointer;

    &:hover {
        background-color: var(--accent-color);
    }

    position: absolute;
    top: 75%;
    left: 75%;
    transform: translateX(-50%);
`;

const PaymentButton = () => {
    return <ButtonPaymentButton>결제하기</ButtonPaymentButton>;
};

export {
    LongButton,
    CartButton,
    MenuButtonPrimary,
    MenuButtonSecondary,
    PaymentButton,
};
