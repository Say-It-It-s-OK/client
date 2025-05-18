import { CartId, CartItem } from "../../context/MainContext";

const API_URL: string = import.meta.env.VITE_API_URL + "cart/pay";

const orderPay = async (sessionid: CartId, orderData: CartItem[]) => {
    console.log("👉 API_URL:", API_URL);
    const request = "cart.pay";
    const orderDataWithRequest = {
        request,
        sessionId: sessionid,
        item: orderData,
    };
    console.log("주문한 제품", orderDataWithRequest);
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDataWithRequest),
        });
        if (!res.ok) {
            throw new Error(`HTTP 오류: ${res.status}`);
        }
        const responseData = await res.json();
        console.log("주문 성공:", responseData);
        return responseData;
    } catch (err) {
        console.error("주문 실패:", err);
    }
};

export default orderPay;
