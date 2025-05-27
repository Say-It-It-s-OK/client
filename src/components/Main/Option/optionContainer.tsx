import { useState, useEffect, useContext } from "react";
import { MainContext, SelectedMenuContext } from "../../../context/MainContext";
import styled from "styled-components";
import {
    AddCartButton,
    OptionButtonDouble,
    OptionButtonNone,
    OptionButtonTriple,
} from "../../Buttons/buttons";
import { OptionCard } from "../../Card/Card";
import addCarts from "../../../api/request/addCart";
import fetchCarts from "../../../api/request/cartLists";
import { LoadingContext } from "../../../context/LoadingContext";

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
    width: 50%;
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

interface Options {
    [key: string]: string[];
}

const OptionContainer = () => {
    const {
        setActiveCategory,
        setCartItems,
        cartId,
        multiOrder,
        setMultiOrder,
        multiResults,
        setMultiResults,
    } = useContext(MainContext);
    const { selectedMenu, setSelectedMenu } = useContext(SelectedMenuContext);
    const { setOutputText } = useContext(LoadingContext)!;
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
        if (selectedMenu?.selectedOptions) {
            for (const [key, value] of Object.entries(
                selectedMenu.selectedOptions
            )) {
                defaults[key] = value;
            }
        }
        console.log("초기 옵션", defaults);
        return defaults;
    };

    const [selectedOptions, setSelectedOptions] = useState<{
        [key: string]: string;
    }>(() => createDefaultOptions(options));

    const handleOptionSelection = (optionName: string, optionValue: string) => {
        console.log(`선택된 ${optionName}: ${optionValue}`);
        setSelectedOptions((prevState) => ({
            ...prevState,
            [optionName]: optionValue,
        }));
    };

    const handleAddCartItems = async () => {
        const cartItem = {
            ...selectedMenu!,
            selectedOptions: selectedOptions,
        };
        // 다중 주문이 아닐 시
        if (!multiOrder) {
            await addCarts(cartId, cartItem);
            const currentCarts = await fetchCarts(cartId);
            setCartItems(currentCarts?.items || []);
            setActiveCategory("장바구니");
            setOutputText(`${selectedMenu?.name}가 장바구니에 추가되었습니다`);
            // 다중 주문이 진행 중일 시
        } else {
            await addCarts(cartId, cartItem);
            const currentCarts = await fetchCarts(cartId);
            setCartItems(currentCarts?.items || []);
            // 다중 주문이 끝났을 때
            if (multiResults.length === 0) {
                setMultiResults([]);
                setMultiOrder(false);
                setActiveCategory("장바구니");
                setOutputText(`주문하신 상품들이 장바구니에 추가되었습니다`);

                return;
            }
            setOutputText(multiResults[0].speech);
            setSelectedMenu(multiResults[0].item);
            setMultiResults(multiResults.slice(1));
        }
    };

    const renderOptionbButtons = () => {
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
            }
        );
    };

    const setOptionName = () => {
        return Object.entries(options).map(
            ([optionName, optionValues], index) => {
                if (index !== 3 && optionValues.length >= 2)
                    return (
                        <DivOptionName key={index}>{optionName}</DivOptionName>
                    );
            }
        );
    };

    useEffect(() => {
        console.log("현재 옵션", selectedOptions);
    }, [selectedOptions]);

    return (
        <DivOptionContainer>
            <DivOptionTitle>추가 옵션</DivOptionTitle>
            <OptionCard menu={selectedMenu} />
            <DivOptionNameContainer>{setOptionName()}</DivOptionNameContainer>
            {Object.keys(options).length === 0 ? (
                <DivOptionButtonContainer>
                    <OptionButtonNone />
                </DivOptionButtonContainer>
            ) : (
                <>
                    <DivOptionButtonContainer>
                        {renderOptionbButtons()}
                    </DivOptionButtonContainer>
                </>
            )}
            <AddCartButton handleAddCartItems={handleAddCartItems} />
        </DivOptionContainer>
    );
};

export default OptionContainer;
