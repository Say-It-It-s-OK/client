const API_URL: string = import.meta.env.VITE_API_URL + "response";

const Confirm = async () => {
    console.log("👉 API_URL:", API_URL);

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("응답 데이터:", data);
    } catch (err) {}
};

export default Confirm;
