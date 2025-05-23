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
    navigate: Function
) => {
    if (result.response === "query.recommend") {
        setActiveCategory("요구사항");
        setRecommendItems(result.items);
    } else if (result.response === "query.confirm") {
        const page = result.page;
        if (["커피", "음료", "디카페인", "디저트"].includes(page)) {
            setActiveCategory(page);
        } else if (page === "menu") {
            setActiveCategory("요구사항");
            setRecommendItems(result.items);
        }
    } else if (result.response.startsWith("query.order")) {
        const page = result.page;
        if (result.response === "query.order.add") {
            if (page === "order_add") {
                const currentCarts = await fetchCarts(cartId);
                setCartItems(currentCarts?.items || []);
                setActiveCategory("장바구니");
            } else if (page === "order_option_required") {
                setSelectedMenu(result.item);
                setActiveCategory("옵션");
            }
        } else if (result.response === "query.order.update") {
            const currentCarts = await fetchCarts(cartId);
            setCartItems(currentCarts?.items || []);
            setActiveCategory("장바구니");
        } else if (result.response === "query.order.delete") {
            const currentCarts = await fetchCarts(cartId);
            setCartItems(currentCarts?.items || []);
            setActiveCategory("장바구니");
        } else if (result.response === "query.order.pay") {
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
    } else if (result.response === "query.help") {
        setActiveCategory("도움");
    } else if (result.response === "query.exit") {
        navigate("/");
    } else {
        setActiveCategory("커피");
    }
};
