import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import fetchMenus from "./api/menu";
import Index from "./pages/Index/index";
import Home from "./pages/Home/home";
import Payment from "./pages/Payment/payment";
import "./styles/App.css";

const App = () => {
    const [menus, setMenus] = useState([]);  // 메뉴 데이터를 저장할 state

    useEffect(() => {
        const getMenus = async () => {
            const data = await fetchMenus();
            setMenus(data);  // 서버에서 가져온 메뉴 데이터를 UI에 반영
        };

        getMenus();
    }, []);  // 컴포넌트가 처음 렌더링될 때만 실행
    
    //캐싱 데이터로 UI 출력하려면 위처럼 useState로 하는 게 좋다는데 혹시 몰라 기본꺼 남겨둠 
    
    // useEffect(() => {
    //     const loadMenus = async () => {
    //         const menus = await fetchMenus();
    //         console.log("초기 로딩된 메뉴 목록:", menus);
    //     };
    //     loadMenus();
    // }, []);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/payment" element={<Payment />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
