import { useState, useEffect, useContext } from "react";
import { MainContext, SelectedMenuContext } from "../../../context/MainContext";
import styled from "styled-components";
import {
    AddCartButton,
    OptionButtonDouble,
    OptionButtonTriple,
} from "../../Buttons/buttons";
import { OptionCard } from "../../Card/Card";
import addCarts from "../../../api/request/addCart";

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

interface Options {
    [key: string]: string[];
}

const OptionContainer = () => {
    const { setActiveCategory, setCartItems } = useContext(MainContext);
    const { selectedMenu } = useContext(SelectedMenuContext);
    const options = selectedMenu?.options || {};

    const createDefaultOptions = (
        options: Options
    ): { [key: string]: string } => {
        const defaults: { [key: string]: string } = {};
        Object.entries(options).forEach(([optionName, optionValues]) => {
            if (Array.isArray(optionValues)) {
                if (optionValues.length === 2) {
                    defaults[optionName] = optionValues[0];
                } else if (optionValues.length === 3) {
                    defaults[optionName] = optionValues[1];
                }
            }
        });
        console.log("초기 옵션", defaults);
        return defaults;
    };

    const OptionContainer = () => {
        const [selectedOptions, setSelectedOptions] = useState(() =>
            createDefaultOptions(options)
        );

        const handleOptionSelection = (
            optionName: string,
            optionValue: string
        ) => {
            console.log(`변경된 ${optionName}: ${optionValue}`);
            setSelectedOptions((prevState) => ({
                ...prevState,
                [optionName]: optionValue,
            }));
        };

        const handleAddCartItems = () => {
            const cartItem = {
                ...selectedMenu!,
                selectedOptions: selectedOptions,
            };
            addCarts(cartItem);
            setCartItems((prevItems) => [...prevItems, cartItem]);
            setActiveCategory("장바구니");
        };

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

        useEffect(() => {
            console.log("현재 옵션", selectedOptions);
        }, [selectedOptions]);
        return (
            <>
                <DivOptionButtonContainer>
                    {setOptionbButton()}
                </DivOptionButtonContainer>
                <AddCartButton handleAddCartItems={handleAddCartItems} />
            </>
        );
    };

    return (
        <DivOptionContainer>
            <DivOptionTitle>추가 옵션</DivOptionTitle>
            <OptionCard menu={selectedMenu} />
            <OptionContainer />
        </DivOptionContainer>
    );
};

export default OptionContainer;
