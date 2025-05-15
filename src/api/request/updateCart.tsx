import { CartItem } from "../../context/MainContext";

const API_URL: string = import.meta.env.VITE_API_URL + "/order";

const updateCart = async (item: CartItem) => {
    console.log("👉 API_URL:", API_URL);
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });
        if (!res.ok) {
            throw new Error(`HTTP 오류: ${res.status}`);
        }
        const responseData = await res.json();
        console.log(
            "옵션 변경 성공, 변경된 옵션:",
            responseData.items.selectedOptions
        );
    } catch (err) {
        console.error("요청 실패:", err);
    }
};

export default updateCart;
