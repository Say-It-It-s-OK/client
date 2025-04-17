import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuContext } from "./context/MenuContext";
import { MainProvider } from "./context/MainContext";
import fetchMenus from "./api/menu";
import Index from "./pages/Init/Init";
import Home from "./pages/Home/home";
import ProgressPayment from "./pages/Payment/payment";
import "./styles/App.css";

const App = () => {
    const { setMenus } = useContext(MenuContext)!;

    useEffect(() => {
        const getMenus = async () => {
            const menus = await fetchMenus();
            console.log("초기 로딩된 메뉴 목록:", menus);
            setMenus(menus);
        };
        getMenus();
    }, [setMenus]);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route
                        path="/home"
                        element={
                            <MainProvider>
                                <Home />
                            </MainProvider>
                        }
                    />
                    <Route path="/payment" element={<ProgressPayment />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
