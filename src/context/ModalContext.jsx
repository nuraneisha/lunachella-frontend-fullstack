// context/ModalContext.js
import { createContext, useState } from "react";

// Create the context
export const ModalContext = createContext();

// Create the provider component
export function ModalProvider({ children }) {
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <ModalContext.Provider value={{ showLoginModal, setShowLoginModal }}>
            {children}
        </ModalContext.Provider>
    );
}
