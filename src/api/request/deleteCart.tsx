import { CartId, CartItem } from "../../context/MainContext";

const API_URL: string = import.meta.env.VITE_API_URL + "cart/delete";

const deleteCart = async (sessionId: CartId, item: CartItem) => {
    console.log("👉 API_URL:", API_URL);
    const deleteItem = {
        sessionId: sessionId.sessionId,
        index: item.cartIndex,
        item: item,
    };
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(deleteItem),
        });
        if (!res.ok) {
            throw new Error(`HTTP 오류: ${res.status}`);
        }
        const responseData = await res.json();
        console.log("장바구니 삭제 성공, 삭제된 메뉴:", responseData);
    } catch (err) {
        console.error("요청 실패:", err);
    }
};

export default deleteCart;
