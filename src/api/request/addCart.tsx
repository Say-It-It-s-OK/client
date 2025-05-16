import { CartId, CartItem } from "../../context/MainContext";

const API_URL: string = import.meta.env.VITE_API_URL + "cart/add";

const addCarts = async (sessionId: CartId, item: CartItem) => {
    console.log("👉 API_URL:", API_URL);
    const addItem = {
        sessionId: sessionId.sessionId,
        item: item,
    };
    console.log("장바구니에 추가할 메뉴:", addItem);
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addItem),
        });
        if (!res.ok) {
            throw new Error(`HTTP 오류: ${res.status}`);
        }
        const responseData = await res.json();
        console.log("장바구니 추가 성공, 추가된 메뉴:", responseData);
    } catch (err) {
        console.error("요청 실패:", err);
    }
};

export default addCarts;
