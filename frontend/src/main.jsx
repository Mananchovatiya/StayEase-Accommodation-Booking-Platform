import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FlashProvider } from "./context/FlashContext.jsx";
import "leaflet/dist/leaflet.css";
import "./css/style.css";
import "./css/ratingstar.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <FlashProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </FlashProvider>
        </BrowserRouter>
    </React.StrictMode>
);
