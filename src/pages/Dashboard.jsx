import Layout from "../component/Layout";
import Footer from "../component/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ModalContext } from "../context/ModalContext";

export default function Dashboard() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <ModalContext.Provider value={{ showLoginModal, setShowLoginModal }}>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Layout />
                <div style={{ flex: 1 }}>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </ModalContext.Provider>
    );
}
