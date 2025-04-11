const API_URL = import.meta.env.VITE_API_URL;

const fetchMenus = async () => {
    console.log("👉 API_URL:", API_URL);

    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error(`HTTP 오류: ${res.status}`);
        }
        const menus = await res.json();
        console.log("✅ 서버 응답 성공");
        return menus;
    } catch (err) {
        console.error("❌ 서버 통신 실패:", err);
        return menus ?? [];
    }
};

export default fetchMenus;
