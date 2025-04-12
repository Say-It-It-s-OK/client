
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import fetchMenus from "./api/menu";
import Index from "./pages/Index/index";
import Home from "./pages/Home/home";
import Payment from "./pages/Payment/payment";
import "./styles/App.css";

const App = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const loadMenus = async () => {
            const menus = await fetchMenus();
            console.log("초기 로딩된 메뉴 목록:", menus);
            setMenus(menus);
        };
        getMenus();
    }, []); 
  
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/home" element={<Home menus={menus} />} />
                    <Route path="/payment" element={<Payment />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
