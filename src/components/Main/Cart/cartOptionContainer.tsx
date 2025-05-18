import { useState, useEffect, useContext } from "react";
import {
    CartItem,
    MainContext,
    SelectedCartContext,
} from "../../../context/MainContext";
import styled from "styled-components";
import {
    ChangeOptionButton,
    DeleteItemButton,
    OptionButtonDouble,
    OptionButtonTriple,
} from "../../Buttons/buttons";
import { OptionCard, OptionCartCard } from "../../Card/Card";
import updateCart from "../../../api/request/updateCart";
import deleteCart from "../../../api/request/deleteCart";
import fetchCarts from "../../../api/request/cartLists";

const DivOptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-center;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 2%;
`;

const DivOptionTitle = styled.div`
    display: flex;
    width: 40%;
    height: 8%;
    background-color: var(--secondary-color);
    color: white;
    font-family: var(--font-main);
    font-size: 200%;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 15px;
    position: absolute;
    left: 78%;
    transform: translateX(-50%);
    border: 4px solid var(--border-color);
`;

const DivOptionButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 60%;
    align-items: center;
    position: absolute;
    top: 15%;
    left: 78%;
    transform: translateX(-50%);
    gap: 4%;
`;

const CartOptionContainer = () => {
    const { setActiveCategory, setCartItems, cartId } = useContext(MainContext);
    const { selectedCart } = useContext(SelectedCartContext);
    const options = selectedCart?.options || {};

    const createDefaultOptions = (): { [key: string]: string } => {
        const defaults: { [key: string]: string } = {};
        if (selectedCart?.selectedOptions) {
            Object.entries(selectedCart.selectedOptions).forEach(
                ([optionName, optionValue]) => {
                    defaults[optionName] = optionValue;
                }
            );
        }
        console.log("초기 옵션", defaults);
        return defaults;
    };

    // ✅ 여기로 올림
    const [selectedOptions, setSelectedOptions] = useState(() =>
        createDefaultOptions()
    );

    const handleOptionSelection = (optionName: string, optionValue: string) => {
        console.log(`변경된 ${optionName}: ${optionValue}`);
        setSelectedOptions((prevState) => ({
            ...prevState,
            [optionName]: optionValue,
        }));
    };

    const cartItem = {
        ...selectedCart!,
        selectedOptions: selectedOptions,
    };

    const handleChangeOption = async () => {
        console.log("옵션이 변경된 제품:", cartItem);
        await updateCart(cartId, cartItem);
        const currentCarts = await fetchCarts(cartId);
        setCartItems(currentCarts?.items || []);
        setActiveCategory("장바구니");
    };

    const handleDeleteItem = async () => {
        console.log("삭제된 제품:", cartItem);
        await deleteCart(cartId, cartItem);
        const currentCarts = await fetchCarts(cartId);
        setCartItems(currentCarts?.items || []);
        setActiveCategory("장바구니");
    };

    useEffect(() => {
        console.log("현재 옵션", selectedOptions);
    }, [selectedOptions]);

    const renderOptionButtons = () => {
        return Object.entries(options).map(
            ([optionName, optionValues], index) => {
                const selectedCount = Array.isArray(optionValues)
                    ? optionValues.length
                    : 0;

                if (selectedCount === 3) {
                    return (
                        <OptionButtonTriple
                            key={index}
                            optionName={optionName}
                            optionValues={optionValues}
                            selectedOption={selectedOptions[optionName]}
                            handleOptionSelection={handleOptionSelection}
                        />
                    );
                } else if (selectedCount === 2) {
                    return (
                        <OptionButtonDouble
                            key={index}
                            optionName={optionName}
                            optionValues={optionValues}
                            selectedOption={selectedOptions[optionName]}
                            handleOptionSelection={handleOptionSelection}
                        />
                    );
                }
                return null;
            }
        );
    };

    return (
        <DivOptionContainer>
            <DivOptionTitle>옵션 변경</DivOptionTitle>
            <OptionCartCard item={selectedCart} />
            <DivOptionButtonContainer>
                {renderOptionButtons()}
            </DivOptionButtonContainer>
            <ChangeOptionButton handleChangeOption={handleChangeOption} />
            <DeleteItemButton handleDeleteItem={handleDeleteItem} />
        </DivOptionContainer>
    );
};

export default CartOptionContainer;
