import { CartItem } from "../../context/MainContext";

const API_URL: string = import.meta.env.VITE_API_URL + "cart/add";

const addCarts = async (item: CartItem) => {
    console.log("👉 API_URL:", API_URL);
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sessionId: "test-session-001", //테스트를 위해 임의 값 부여(섹션마다 발급해서 유지해야됨), 같이 안넘어오면 오류남
                item}),
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
