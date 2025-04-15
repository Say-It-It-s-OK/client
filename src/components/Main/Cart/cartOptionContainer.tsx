import { useState, useEffect } from "react";
import styled from "styled-components";
import {
    ChangeOptionButton,
    DeleteItemButton,
    OptionButtonDouble,
    OptionButtonTriple,
} from "../../Buttons/buttons";
import { OptionCard } from "../../Card/Card";

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

const CartOptionContainer = ({
    setActiveCategory,
    selectedMenu,
    setCartItems,
}) => {
    const options = selectedMenu?.options || {};

    const createDefaultOptions = () => {
        const defaults = {};
        Object.entries(selectedMenu.selectedOptions).forEach(
            ([optionName, optionValue]) => {
                defaults[optionName] = optionValue;
            }
        );
        console.log("초기옵션", defaults);
        return defaults;
    };

    const [selectedOptions, setSelectedOptions] = useState(() =>
        createDefaultOptions()
    );

    const handleOptionSelection = (optionName, optionValue) => {
        console.log(`변경된 ${optionName}: ${optionValue}`);
        setSelectedOptions((prevState) => ({
            ...prevState,
            [optionName]: optionValue,
        }));
    };

    const cartItem = {
        ...selectedMenu,
        selectedOptions: selectedOptions,
    };

    const handleChangeOption = () => {
        console.log("옵션이 변경된 제품:", cartItem);

        const index = cartItem.cartIndex;

        if (typeof index !== "number") {
            console.error("cartIndex가 없습니다.");
            return;
        }

        const updatedItem = { ...cartItem };
        delete updatedItem.cartIndex;

        setCartItems((prevItems) => {
            const newItems = [...prevItems];
            newItems[index] = updatedItem;
            return newItems;
        });
        setActiveCategory("장바구니");
    };

    const handleDeleteItem = () => {
        console.log("삭제된 제품:", cartItem);
        const index = cartItem.cartIndex;
        setCartItems((prevItems) => {
            const newItems = [...prevItems];
            newItems.splice(index, 1);
            return newItems;
        });
        setActiveCategory("요구사항");
    };

    useEffect(() => {
        console.log("전체옵션", selectedOptions);
    }, [selectedOptions]);

    const setOptionbButton = () => {
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
                        ></OptionButtonTriple>
                    );
                } else if (selectedCount === 2) {
                    return (
                        <OptionButtonDouble
                            key={index}
                            optionName={optionName}
                            optionValues={optionValues}
                            selectedOption={selectedOptions[optionName]}
                            handleOptionSelection={handleOptionSelection}
                        ></OptionButtonDouble>
                    );
                }
                return null;
            }
        );
    };

    return (
        <DivOptionContainer>
            <DivOptionTitle>옵션 변경</DivOptionTitle>
            <OptionCard selectedMenu={selectedMenu} />
            <DivOptionButtonContainer>
                {setOptionbButton()}
            </DivOptionButtonContainer>
            <ChangeOptionButton handleChangeOption={handleChangeOption} />
            <DeleteItemButton handleDeleteItem={handleDeleteItem} />
        </DivOptionContainer>
    );
};

export default CartOptionContainer;
