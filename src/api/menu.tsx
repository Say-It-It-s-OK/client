const API_URL: string = import.meta.env.VITE_API_URL;
let cachedMenus: any[] = [];

const fetchMenus = async () => {
    console.log("👉 API_URL:", API_URL);

    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error(`HTTP 오류: ${res.status}`);
        }
        const menus = await res.json();

        if (JSON.stringify(menus) !== JSON.stringify(cachedMenus)) {
            console.log("✅ 서버 응답 성공: 데이터 변경됨, 캐시 업데이트");
            cachedMenus = menus; // 캐시 업데이트
        } else {
            console.log("✅ 서버 응답 성공: 데이터 변경 없음");
        }

        return menus; //업데이트된 메뉴 데이터 반환환
    } catch (err) {
        console.error("❌ 서버 통신 실패:", err);
        return cachedMenus ?? []; //실패할 경우(메뉴 데이터가 안바뀐 경우) 기존 캐시된 메뉴 데이터를 반환환
    }
};

export default fetchMenus;
