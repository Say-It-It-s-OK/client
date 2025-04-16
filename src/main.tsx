import React from "react";
import ReactDOM from "react-dom/client";
import { MenuProvider } from "./context/MenuContext";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <MenuProvider>
                <App />
            </MenuProvider>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}
