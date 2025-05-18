import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../context/LoadingContext";
import { CartItem, MainContext } from "../../context/MainContext";
import styled from "styled-components";
// import Cart from "../../assets/icons/cart.png";
import fetchCarts from "../../api/request/cartLists";

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

interface LongButtonPropos {
    children: string;
    top: string;
    left: string;
}

const LongButton = ({ children, top, left }: LongButtonPropos) => {
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
    disabled?: boolean;
    itemsCount?: number;
}

const ButtonCartButton = styled.button<{ $active?: string }>`
    width: 20%;
    height: 75%;
    background-color: var(--light-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border: none;
    border-radius: 0 0 0 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0px 0px 10px var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:hover {
        background-color: var(--primary-color);
    }

    ${({ $active }) =>
        $active === "true" &&
        `
        width: 22%;
        height: 83%;
        background-color: var(--primary-color);
    `}

    &:disabled:hover {
        background-color: var(--primary-color);
        cursor: default;
    }
`;

const ImgCartIcon = styled.img`
    width: 55%;
    margin: 0 8% 0 0;
`;

const CartButton = () => {
    const { activeCategory, setActiveCategory, cartItems, cartId, setCartId } =
        useContext(MainContext);

    const { isLoading } = useContext(LoadingContext)!;

    const handleCart = () => {
        fetchCarts(cartId);
        setCartId(cartId);
        setActiveCategory("장바구니");
    };

    return (
        <ButtonCartButton
            $active={(activeCategory === "장바구니").toString()}
            onClick={handleCart}
            disabled={isLoading}
        >
            <ImgCartIcon></ImgCartIcon>
            {cartItems.length}
        </ButtonCartButton>
    );
};

const ButtonMenuButtonPrimary = styled.button<{ $active?: string }>`
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

    ${({ $active }) =>
        $active === "true" &&
        `
        transform: translateY(-30%);
        background-color: var(--accent-color);
    `}

    &:disabled:hover {
        background-color: var(--primary-color);
        cursor: default;
    }
`;

const MenuButtonPrimary = ({ children, active, onClick }: buttonProps) => {
    const { isLoading } = useContext(LoadingContext)!;

    return (
        <ButtonMenuButtonPrimary
            $active={active.toString()}
            onClick={onClick}
            disabled={isLoading}
        >
            {children}
        </ButtonMenuButtonPrimary>
    );
};

const ButtonMenuButtonSecondary = styled.button<{ $active?: string }>`
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

    ${({ $active }) =>
        $active === "true" &&
        `
        transform: translateY(-30%);
        background-color: var(--accent-color);
    `}

    &:disabled:hover {
        background-color: var(--secondary-color);
        cursor: default;
    }
`;

const MenuButtonSecondary = ({ children, active, onClick }: buttonProps) => {
    const { isLoading } = useContext(LoadingContext)!;
    return (
        <ButtonMenuButtonSecondary
            $active={active.toString()}
            onClick={onClick}
            disabled={isLoading}
        >
            {children}
        </ButtonMenuButtonSecondary>
    );
};

const ButtonPaymentButton = styled.button<{ $disabled: string }>`
    width: 90%;
    height: 38%;
    background-color: var(--primary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border-radius: 15px;
    border: 4px solid var(--border-color);
    cursor: ${(props) => (props.$disabled === "true" ? "" : "pointer")};
    opacity: ${(props) => (props.$disabled === "true" ? 0.5 : 1)};
    pointer-events: ${(props) =>
        props.$disabled === "true" ? "none" : "auto"};

    &:hover {
        background-color: ${(props) =>
            props.$disabled === "true"
                ? "var(--primary-color)"
                : "var(--accent-color)"};
    }
`;

interface PaymentButtonProps {
    cartItems: CartItem[];
    totalPrice: number;
}

const PaymentButton = ({ cartItems, totalPrice }: PaymentButtonProps) => {
    const navigate = useNavigate();
    const { cartId } = useContext(MainContext);
    const handleClick = () => {
        navigate("/payment", {
            state: {
                sessionId: cartId,
                cartItems: cartItems,
                totalPrice: totalPrice,
                nlp: false,
            },
        });
    };
    return (
        <ButtonPaymentButton
            $disabled={(cartItems.length === 0 && totalPrice === 0).toString()}
            onClick={handleClick}
        >
            결제하기
        </ButtonPaymentButton>
    );
};

const ButtonAddCartButton = styled.button`
    width: 40%;
    height: 8%;
    background-color: var(--primary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border-radius: 15px;
    border: 4px solid var(--border-color);
    cursor: pointer;

    &:hover {
        background-color: var(--accent-color);
    }

    position: absolute;
    top: 85%;
    left: 78%;
    transform: translateX(-50%);
`;

interface AddCartButtonProps {
    handleAddCartItems: () => void;
}

const AddCartButton = ({ handleAddCartItems }: AddCartButtonProps) => {
    return (
        <ButtonAddCartButton onClick={() => handleAddCartItems()}>
            장바구니 담기
        </ButtonAddCartButton>
    );
};

const ButtonChangeoOtionButton = styled.button`
    width: 40%;
    height: 8%;
    background-color: var(--light-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border-radius: 15px;
    border: 4px solid var(--border-color);
    cursor: pointer;

    &:hover {
        background-color: var(--accent-color);
    }

    position: absolute;
    top: 75%;
    left: 78%;
    transform: translateX(-50%);
`;

interface ChangeOptionButtonProps {
    handleChangeOption: () => void;
}

const ChangeOptionButton = ({
    handleChangeOption,
}: ChangeOptionButtonProps) => {
    return (
        <ButtonChangeoOtionButton onClick={() => handleChangeOption()}>
            옵션 변경하기
        </ButtonChangeoOtionButton>
    );
};

const ButtonDeleteItemButton = styled.button`
    width: 40%;
    height: 8%;
    background-color: var(--secondary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    border-radius: 15px;
    border: 4px solid var(--border-color);
    cursor: pointer;

    &:hover {
        background-color: var(--accent-color);
    }

    position: absolute;

    top: 85%;
    left: 78%;
    transform: translateX(-50%);
`;

interface DeleteItemButtonProps {
    handleDeleteItem: () => void;
}

const DeleteItemButton = ({ handleDeleteItem }: DeleteItemButtonProps) => {
    return (
        <ButtonDeleteItemButton onClick={() => handleDeleteItem()}>
            장바구니에서 삭제하기
        </ButtonDeleteItemButton>
    );
};

const DivOptionButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 13%;
`;

interface optionProps {
    selected: boolean;
}

const ButtonOptionButtonDouble = styled.button<optionProps>`
    width: 49%;
    height: 100%;
    background-color: ${({ selected }) =>
        selected ? "var(--accent-color)" : "var(--primary-color)"};
    color: white;
    font-family: var(--font-main);
    font-size: 160%;
    border-radius: 15px;
    cursor: ${({ selected }) => (selected ? "default" : "pointer")};
    border: 4px solid var(--border-color);
    pointer-events: ${({ selected }) => (selected ? "none" : "auto")};

    &:hover {
        background-color: var(--secondary-color);
    }
`;
interface OptionType {
    optionName: string;
    optionValue: string;
}
interface OptionButtonProps {
    optionName: string;
    optionValues: string[];
    selectedOption: string;
    handleOptionSelection: (optionName: string, optionValue: string) => void;
}

const OptionButtonDouble = ({
    optionName,
    optionValues,
    selectedOption,
    handleOptionSelection,
}: OptionButtonProps) => {
    return (
        <DivOptionButtonContainer>
            <ButtonOptionButtonDouble
                onClick={() =>
                    handleOptionSelection(optionName, optionValues[0])
                }
                selected={selectedOption === optionValues[0]}
            >
                {optionValues[0]}
            </ButtonOptionButtonDouble>
            <ButtonOptionButtonDouble
                onClick={() =>
                    handleOptionSelection(optionName, optionValues[1])
                }
                selected={selectedOption === optionValues[1]}
            >
                {optionValues[1]}
            </ButtonOptionButtonDouble>
        </DivOptionButtonContainer>
    );
};

const ButtonOptionButtonTriple = styled.button<optionProps>`
    width: 32%;
    height: 100%;
    background-color: ${({ selected }) =>
        selected ? "var(--accent-color)" : "var(--primary-color)"};
    color: white;
    font-family: var(--font-main);
    font-size: 160%;
    border-radius: 15px;
    cursor: ${({ selected }) => (selected ? "default" : "pointer")};
    border: 4px solid var(--border-color);
    pointer-events: ${({ selected }) => (selected ? "none" : "auto")};

    &:hover {
        background-color: var(--secondary-color);
    }
`;

const OptionButtonTriple = ({
    optionName,
    optionValues,
    selectedOption,
    handleOptionSelection,
}: OptionButtonProps) => {
    return (
        <DivOptionButtonContainer>
            <ButtonOptionButtonTriple
                onClick={() =>
                    handleOptionSelection(optionName, optionValues[0])
                }
                selected={selectedOption === optionValues[0]}
            >
                {optionValues[0]}
            </ButtonOptionButtonTriple>
            <ButtonOptionButtonTriple
                onClick={() =>
                    handleOptionSelection(optionName, optionValues[1])
                }
                selected={selectedOption === optionValues[1]}
            >
                {optionValues[1]}
            </ButtonOptionButtonTriple>
            <ButtonOptionButtonTriple
                onClick={() =>
                    handleOptionSelection(optionName, optionValues[2])
                }
                selected={selectedOption === optionValues[2]}
            >
                {optionValues[2]}
            </ButtonOptionButtonTriple>
        </DivOptionButtonContainer>
    );
};

export {
    LongButton,
    CartButton,
    MenuButtonPrimary,
    MenuButtonSecondary,
    PaymentButton,
    AddCartButton,
    ChangeOptionButton,
    DeleteItemButton,
    OptionButtonDouble,
    OptionButtonTriple,
};
