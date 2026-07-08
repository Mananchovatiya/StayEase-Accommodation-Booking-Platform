import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";

// Replaces res.locals.currUser: the logged-in user available everywhere
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currUser, setCurrUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On page load, ask the backend who is logged in (session cookie)
    useEffect(() => {
        api.get("/me")
            .then((res) => setCurrUser(res.data.user))
            .catch(() => setCurrUser(null))
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ currUser, setCurrUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
