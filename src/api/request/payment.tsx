import { CartItem } from "../../context/MainContext";

const API_URL: string = import.meta.env.VITE_API_URL + "cart/pay";

const orderPay = async (orderData: CartItem[]) => {
    console.log("👉 API_URL:", API_URL);
    const request = "query.order.pay";
    const orderDataWithRequest = {
        request,
        payload: {
            item: orderData,
        },
    };
    console.log("주문한 제품", orderDataWithRequest);
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sessionId: "test-session-001", //테스트를 위해 임의 값 부여(섹션마다 발급해서 유지해야됨), 같이 안넘어오면 오류남
                orderDataWithRequest}),
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
