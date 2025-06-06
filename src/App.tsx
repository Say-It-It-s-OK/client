import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuContext } from "./context/MenuContext";
import {
    MainProvider,
    SelectedCartProvider,
    SelectedMenuProvider,
} from "./context/MainContext";
import { LoadingProvider } from "./context/LoadingContext";
import fetchMenus from "./api/request/menuLists";
import Index from "./pages/Init/Init";
import Home from "./pages/Home/home";
import ProgressPayment from "./pages/Pay/pay";
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
                                <LoadingProvider>
                                    <SelectedMenuProvider>
                                        <SelectedCartProvider>
                                            <Home />
                                        </SelectedCartProvider>
                                    </SelectedMenuProvider>
                                </LoadingProvider>
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
