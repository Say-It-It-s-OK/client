import fetchCarts from "../api/request/cartLists";
import { CartId, CartItem } from "../context/MainContext";
import addCarts from "../api/request/addCart";
import updateCart from "../api/request/updateCart";
import deleteCart from "../api/request/deleteCart";
import appendSubjectParticle from "./handleAppendSubjectParticle";

export const handleNLPResponse = async (
    result: any,
    cartId: CartId,
    activeCategory: string,
    setActiveCategory: Function,
    setRecommendItems: Function,
    selectedMenu: any,
    setSelectedMenu: Function,
    selectedCart: any,
    setSelectedCart: Function,
    setCartItems: Function,
    cartItems: CartItem[],
    multiOrder: boolean,
    setMultiOrder: Function,
    multiResults: any[],
    setMultiResults: Function,
    setOutputText: Function,
    navigate: Function
) => {
    // 요구사항
    const prevState = activeCategory;
    if (result.response === "query.recommend") {
        if (multiOrder) {
            setMultiOrder(false);
            setMultiResults([]);
        }
        setOutputText(result.speech);
        setActiveCategory("요구사항");

        setRecommendItems(result.items);
        // 메뉴 확인 ---------------------------------------------------------
    } else if (result.response === "query.confirm") {
        if (multiOrder) {
            setMultiOrder(false);
            setMultiResults([]);
        }
        setOutputText(result.speech);
        const page = result.page;
        if (["커피", "음료", "디카페인", "디저트"].includes(page)) {
            setActiveCategory(page);
        } else if (page === "menu") {
            setActiveCategory("요구사항");

            setRecommendItems(result.items);
        } else if (page === "confirm_cart") {
            const currentCarts = await fetchCarts(cartId);
            setCartItems(currentCarts?.items || []);
            setActiveCategory("장바구니");
        }
    }
    // 메뉴 주문 ---------------------------------------------------------
    else if (result.response.startsWith("query.order")) {
        const page = result.page;
        if (result.response === "query.order.add") {
            setOutputText(result.speech);
            if (page === "order_add") {
                const currentCarts = await fetchCarts(cartId);
                setCartItems(currentCarts?.items || []);
                setActiveCategory("장바구니");

                if (multiOrder) {
                    setMultiOrder(false);
                    setMultiResults([]);
                }
            } else if (page === "order_option_required") {
                setSelectedMenu(result.item);
                setActiveCategory("옵션");

                if (multiOrder) {
                    setMultiOrder(false);
                    setMultiResults([]);
                }
            } else if (page === "options_order_add") {
                const currentCarts = await fetchCarts(cartId);
                setCartItems(currentCarts?.items || []);
                if (multiOrder) {
                    if (multiResults.length === 0) {
                        setMultiResults([]);
                        setMultiOrder(false);
                        setActiveCategory("장바구니");
                        setOutputText(
                            "주문하신 상품들이 장바구니에 추가되었습니다"
                        );
                    } else {
                        setOutputText(multiResults[0].speech);
                        setSelectedMenu(multiResults[0].item);
                        setMultiResults(multiResults.slice(1));
                        setActiveCategory("옵션");
                    }
                } else {
                    setOutputText(result.speech);
                    setActiveCategory("장바구니");
                }
            } else if (page === "add_menu") {
                if (activeCategory === "옵션") {
                    console.log("옵션 선택됨", selectedMenu);
                    await addCarts(cartId, selectedMenu);
                    const currentCarts = await fetchCarts(cartId);
                    setCartItems(currentCarts?.items || []);
                    if (multiOrder) {
                        if (multiResults.length === 0) {
                            setMultiResults([]);
                            setMultiOrder(false);
                            setActiveCategory("장바구니");
                            setOutputText(
                                "주문하신 상품들이 장바구니에 추가되었습니다"
                            );
                        } else {
                            setOutputText(multiResults[0].speech);
                            setSelectedMenu(multiResults[0].item);
                            setMultiResults(multiResults.slice(1));
                            setActiveCategory("옵션");
                        }
                    } else {
                        setOutputText(result.speech);
                        setActiveCategory("장바구니");
                    }
                } else {
                    setOutputText("메뉴를 선택해주세요");
                    setActiveCategory("커피");
                }
            }

            // 메뉴 업데이트 ---------------------------------------------------------
        } else if (result.response === "query.order.update") {
            if (result.page === "option_resolved") {
                if (activeCategory === "옵션" && selectedMenu.options) {
                    const isValidOption = Object.entries(
                        result.selectedOptions
                    ).every(([key, value]) => {
                        const validValues = selectedMenu.options[key];
                        return (
                            Array.isArray(validValues) &&
                            validValues.includes(value)
                        );
                    });

                    if (isValidOption) {
                        setSelectedMenu({
                            ...selectedMenu,
                            selectedOptions: {
                                ...selectedMenu.selectedOptions,
                                ...result.selectedOptions,
                            },
                        });
                        setOutputText("옵션이 선택되었습니다!");
                        setActiveCategory("옵션");
                    } else {
                        setOutputText("잘못된 옵션입니다. 다시 선택해 주세요");
                        setActiveCategory("옵션");
                    }
                } else if (
                    activeCategory === "장바구니 옵션" &&
                    selectedCart.options
                ) {
                    const isValidOption = Object.entries(
                        result.selectedOptions
                    ).every(([key, value]) => {
                        const validValues = selectedCart.options[key];
                        return (
                            Array.isArray(validValues) &&
                            validValues.includes(value)
                        );
                    });

                    if (isValidOption) {
                        setSelectedCart({
                            ...selectedCart,
                            selectedOptions: {
                                ...selectedCart.selectedOptions,
                                ...result.selectedOptions,
                            },
                        });
                        setOutputText("옵션이 선택되었습니다!");
                        setActiveCategory("장바구니 옵션");
                    } else {
                        setOutputText("잘못된 옵션입니다. 다시 선택해 주세요");
                        setActiveCategory("장바구니 옵션");
                    }
                } else {
                    setOutputText("메뉴를 선택해 주세요");
                    setActiveCategory("커피");
                }
            } else if (result.page === "update_options") {
                if (
                    activeCategory === "장바구니 옵션" &&
                    selectedCart.options
                ) {
                    console.log("옵션이 변경된 제품:", selectedCart);
                    await updateCart(cartId, selectedCart);
                    const currentCarts = await fetchCarts(cartId);
                    setCartItems(currentCarts?.items || []);
                    setActiveCategory("장바구니");
                    setOutputText(
                        `${selectedCart?.name}의 옵션이 변경되었습니다`
                    );
                } else {
                    setOutputText("메뉴를 선택해주세요");
                    setActiveCategory("커피");
                }
            } else {
                if (multiOrder) {
                    setMultiOrder(false);
                    setMultiResults([]);
                }
                setOutputText(result.speech);
                const currentCarts = await fetchCarts(cartId);
                setCartItems(currentCarts?.items || []);
                setActiveCategory("장바구니");
            }
        } else if (result.response === "query.order.delete") {
            if (activeCategory === "장바구니 옵션") {
                console.log("삭제된 제품:", selectedCart);
                await deleteCart(cartId, selectedCart);
                const currentCarts = await fetchCarts(cartId);
                setCartItems(currentCarts?.items || []);
                setActiveCategory("장바구니");
                setOutputText(
                    `${appendSubjectParticle(
                        selectedCart?.name
                    )} 장바구니에서 삭제되었습니다`
                );
            } else if (activeCategory === "장바구니") {
                if (result.page === "cart_delete") {
                    setOutputText(result.speech);
                    const currentCarts = await fetchCarts(cartId);
                    setCartItems(currentCarts?.items || []);
                    setActiveCategory("장바구니");
                } else {
                    setOutputText("삭제하실 메뉴를 선택해주세요");
                    setActiveCategory("장바구니");
                }
            } else {
                setOutputText("메뉴를 선택해주세요");
                setActiveCategory("커피");
            }
            // ---------------------------------------------------------
        } else if (result.response === "query.order.add.item") {
            // await addCarts(cartId, cartItem);
            const currentCarts = await fetchCarts(cartId);
            setCartItems(currentCarts?.items || []);
            if (multiOrder) {
                if (multiResults.length === 0) {
                    setMultiResults([]);
                    setMultiOrder(false);
                    setActiveCategory("장바구니");
                    setOutputText(
                        "주문하신 상품들이 장바구니에 추가되었습니다"
                    );
                } else {
                    setOutputText(multiResults[0].speech);
                    setSelectedMenu(multiResults[0].item);
                    setMultiResults(multiResults.slice(1));
                }
            } else {
                setOutputText(result.speech);
                setActiveCategory("장바구니");
            }
        } else if (result.response === "query.order.pay") {
            if (multiOrder) {
                setMultiOrder(false);
                setMultiResults([]);
            }
            setOutputText(result.speech);
            const totalPrice = cartItems.reduce(
                (sum, item) => sum + item.price,
                0
            );
            navigate("/payment", {
                state: {
                    sessionId: cartId,
                    cartItems: cartItems,
                    totalPrice: totalPrice,
                    nlp: true,
                },
            });
        }
        // ---------------------------------------------------------
    } else if (result.response === "query.help") {
        if (multiOrder) {
            setMultiOrder(false);
            setMultiResults([]);
        }
        setOutputText(result.speech);
        setActiveCategory("도움");
    } else if (result.response === "query.exit") {
        if (multiOrder) {
            setMultiOrder(false);
            setMultiResults([]);
        }
        setOutputText(result.speech);
        navigate("/");
    } else {
        if (multiOrder) {
            setMultiOrder(false);
            setMultiResults([]);
        }
        setOutputText(result.speech);
        setActiveCategory(prevState);
    }
};
