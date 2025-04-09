import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index/index";
import Home from "./pages/Home/home";
import Payment from "./pages/Payment/payment";
import "./styles/App.css";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Index />} />
                </Routes>
                <Routes>
                    <Route path="/home" element={<Home />} />
                </Routes>
                <Routes>
                    <Route path="/payment" element={<Payment />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
