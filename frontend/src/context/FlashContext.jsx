import { createContext, useContext, useState, useCallback } from "react";

// Replaces connect-flash: success/error messages shown as Bootstrap alerts
const FlashContext = createContext();

export function FlashProvider({ children }) {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const flashSuccess = useCallback((msg) => {
        setSuccess(msg);
        setError("");
    }, []);

    const flashError = useCallback((msg) => {
        setError(msg);
        setSuccess("");
    }, []);

    const clearFlash = useCallback(() => {
        setSuccess("");
        setError("");
    }, []);

    return (
        <FlashContext.Provider value={{ success, error, flashSuccess, flashError, clearFlash }}>
            {children}
        </FlashContext.Provider>
    );
}

export function useFlash() {
    return useContext(FlashContext);
}
