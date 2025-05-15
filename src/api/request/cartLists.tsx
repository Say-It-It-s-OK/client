import { CartItem } from "../../context/MainContext";

const API_URL: string = import.meta.env.VITE_API_URL + "query/confirm/cart";

const fetchCarts = async () => {
    console.log("👉 API_URL:", API_URL);

    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error(`HTTP 오류: ${res.status}`);
        }
        const carts: CartItem = await res.json();
        console.log("불러온 장바구니 제품: ", carts);
        return carts;
    } catch (err) {
        console.error("❌ 서버 통신 실패:", err);
    }
};

export default fetchCarts;
