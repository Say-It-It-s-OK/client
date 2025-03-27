import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index/index";
import Home from "./pages/Home/home";
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
            </div>
        </Router>
    );
};

export default App;
