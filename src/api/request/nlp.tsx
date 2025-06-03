import { CartId } from "../../context/MainContext";

const NLP_URL: string = import.meta.env.VITE_NLP_URL + "process";

const nlp = async (sessionId: CartId, text: string, page: string) => {
    console.log("👉 NLP_URL:", NLP_URL);
    const nlpRequest = {
        sessionId: sessionId.sessionId,
        text: text,
        page: page,
    };
    console.log("NLP 요청 데이터:", nlpRequest);
    try {
        const res = await fetch(NLP_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nlpRequest),
        });
        if (!res.ok) {
            throw new Error(`HTTP 오류: ${res.status}`);
        }
        const responseData = await res.json();
        console.log("요청 성공:", responseData);
        return responseData;
    } catch (err) {
        console.error("요청 실패:", err);
    }
};

export default nlp;
