import { useState, useEffect } from "react";
import styled from "styled-components";
import {
    AddCartButton,
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

const OptionContainer = ({ selectedMenu }) => {
    const options = selectedMenu?.options || {};

    const createDefaultOptions = (options) => {
        const defaults = {};
        Object.entries(options).forEach(([optionName, optionValues]) => {
            if (Array.isArray(optionValues)) {
                if (optionValues.length === 2) {
                    defaults[optionName] = optionValues[0];
                } else if (optionValues.length === 3) {
                    defaults[optionName] = optionValues[1];
                }
            }
        });
        console.log("초기옵션", defaults);
        return defaults;
    };

    const [selectedOptions, setSelectedOptions] = useState(() =>
        createDefaultOptions(options)
    );

    const handleOptionSelection = (optionName, optionValue) => {
        console.log(`변경된 ${optionName}: ${optionValue}`);
        setSelectedOptions((prevState) => ({
            ...prevState,
            [optionName]: optionValue,
        }));
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
            <DivOptionTitle>추가 옵션</DivOptionTitle>
            <OptionCard selectedMenu={selectedMenu} />
            <DivOptionButtonContainer>
                {setOptionbButton()}
            </DivOptionButtonContainer>
            <AddCartButton />
        </DivOptionContainer>
    );
};

export default OptionContainer;
