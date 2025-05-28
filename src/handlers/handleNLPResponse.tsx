import fetchCarts from "../api/request/cartLists";
import { CartId, CartItem } from "../context/MainContext";

export const handleNLPResponse = async (
    result: any,
    cartId: CartId,
    setActiveCategory: Function,
    setRecommendItems: Function,
    setSelectedMenu: Function,
    setCartItems: Function,
    cartItems: CartItem[],
    multiOrder: boolean,
    setMultiOrder: Function,
    multiResults: any[],
    setMultiResults: Function,
    setOutputText: Function,
    navigate: Function
) => {
    if (result.response === "query.recommend") {
        if (multiOrder) {
            setMultiOrder(false);
            setMultiResults([]);
        }
        setOutputText(result.speech);
        setActiveCategory("요구사항");
        setRecommendItems(result.items);
        // ---------------------------------------------------------
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
    // ---------------------------------------------------------
    else if (result.response.startsWith("query.order")) {
        const page = result.page;
        if (multiOrder) {
            setMultiOrder(false);
            setMultiResults([]);
        }
        if (result.response === "query.order.add") {
            setOutputText(result.speech);
            if (page === "order_add") {
                const currentCarts = await fetchCarts(cartId);
                setCartItems(currentCarts?.items || []);
                setActiveCategory("장바구니");
            } else if (page === "order_option_required") {
                setSelectedMenu(result.item);
                setActiveCategory("옵션");
            }
        } else if (result.response === "query.order.update") {
            if (multiOrder) {
                setMultiOrder(false);
                setMultiResults([]);
            }
            setOutputText(result.speech);
            const currentCarts = await fetchCarts(cartId);
            setCartItems(currentCarts?.items || []);
            setActiveCategory("장바구니");
        } else if (result.response === "query.order.delete") {
            if (multiOrder) {
                setMultiOrder(false);
                setMultiResults([]);
            }
            setOutputText(result.speech);
            const currentCarts = await fetchCarts(cartId);
            setCartItems(currentCarts?.items || []);
            setActiveCategory("장바구니");
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
        setActiveCategory("커피");
    }
};
