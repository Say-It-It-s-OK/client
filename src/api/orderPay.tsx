import { CartItem } from "../context/MainContext";

const API_URL: string = import.meta.env.VITE_API_URL + "order";

const orderPay = async (orderData: CartItem[]) => {
    console.log("👉 API_URL:", API_URL);
    const request = "query.order.pay";
    const orderDataWithRequest = {
        request,
        items: orderData,
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
    } catch (err) {}
};

export default orderPay;
