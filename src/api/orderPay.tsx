import { CartItem } from "../context/MainContext";

const API_URL: string = import.meta.env.VITE_API_URL + "/query.order.pay";

const orderPay = async (orderData: CartItem[]) => {
    console.log("👉 API_URL:", API_URL);
    console.log("주문한 제품", orderData);
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });
        if (!res.ok) {
            throw new Error(`HTTP 오류: ${res.status}`);
        }
        const responseData = await res.json();
        console.log("주문 성공:", responseData);
        return responseData;
    } catch (err) {}
};

export default orderPay;
