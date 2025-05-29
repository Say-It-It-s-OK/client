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
    OptionButtonNone,
    OptionButtonTriple,
} from "../../Buttons/buttons";
import { OptionCard, OptionCartCard } from "../../Card/Card";
import updateCart from "../../../api/request/updateCart";
import deleteCart from "../../../api/request/deleteCart";
import fetchCarts from "../../../api/request/cartLists";
import { LoadingContext } from "../../../context/LoadingContext";
import appendSubjectParticle from "../../../handlers/handleAppendSubjectParticle";

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
    box-shadow: 0px 0px 10px var(--secondary-color);
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

const DivOptionNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 15%;
    height: 60%;
    align-items: center;
    position: absolute;
    top: 15%;
    left: 53%;
    transform: translateX(-50%);
    gap: 4%;
`;

const DivOptionName = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 53%;
    height: 12%;
    color: white;
    font-family: var(--font-main);
    font-size: 140%;
    background: linear-gradient(
        135deg,
        var(--primary-color),
        var(--light-color)
    );
    border-radius: 15px;
    border: 4px solid var(--border-color);
`;

const CartOptionContainer = () => {
    const { setActiveCategory, setCartItems, cartId } = useContext(MainContext);
    const { selectedCart, setSelectedCart } = useContext(SelectedCartContext);
    const { setOutputText } = useContext(LoadingContext)!;
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

    useEffect(() => {
        setSelectedCart((prevMenu) => {
            if (!prevMenu) return prevMenu;
            return {
                ...prevMenu,
                selectedOptions,
            };
        });
    }, [selectedOptions]);

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
        setOutputText(`${cartItem?.name}의 옵션이 변경되었습니다`);
    };

    const handleDeleteItem = async () => {
        console.log("삭제된 제품:", cartItem);
        await deleteCart(cartId, cartItem);
        const currentCarts = await fetchCarts(cartId);
        setCartItems(currentCarts?.items || []);
        setActiveCategory("장바구니");
        setOutputText(
            `${appendSubjectParticle(
                cartItem?.name
            )} 장바구니에서 삭제되었습니다`
        );
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

    const setOptionName = () => {
        return Object.entries(options).map(
            ([optionName, optionValues], index) => {
                if (index !== 3)
                    return (
                        <DivOptionName key={index}>{optionName}</DivOptionName>
                    );
            }
        );
    };

    return (
        <DivOptionContainer>
            <DivOptionTitle>옵션 변경</DivOptionTitle>
            <OptionCartCard item={selectedCart} />
            <DivOptionNameContainer>{setOptionName()}</DivOptionNameContainer>
            {Object.keys(options).length === 0 ? (
                <DivOptionButtonContainer>
                    <OptionButtonNone />
                </DivOptionButtonContainer>
            ) : (
                <>
                    <DivOptionButtonContainer>
                        {renderOptionButtons()}
                    </DivOptionButtonContainer>
                </>
            )}
            <ChangeOptionButton handleChangeOption={handleChangeOption} />
            <DeleteItemButton handleDeleteItem={handleDeleteItem} />
        </DivOptionContainer>
    );
};

export default CartOptionContainer;
