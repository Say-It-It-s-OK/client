import { CartId, CartItem } from "../../context/MainContext";

const API_URL: string = import.meta.env.VITE_API_URL + "cart/update";

const updateCart = async (sessionId: CartId, item: CartItem) => {
    console.log("👉 API_URL:", API_URL);
    const updateItem = {
        sessionId: sessionId.sessionId,
        item: item,
    };
    console.log("업데이트할 아이템:", updateItem);
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateItem),
        });
        if (!res.ok) {
            throw new Error(`HTTP 오류: ${res.status}`);
        }
        const responseData = await res.json();
    } catch (err) {
        console.error("요청 실패:", err);
    }
};

export default updateCart;
