import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useFlash } from "../context/FlashContext.jsx";

// Replaces the isloggedIn middleware redirect:
// guests are sent to /login and come back after logging in (redirect-after-login)
function ProtectedRoute({ children }) {
    const { currUser, loading } = useAuth();
    const { flashError } = useFlash();
    const location = useLocation();

    useEffect(() => {
        if (!loading && !currUser) {
            flashError("You must be logged In");
        }
    }, [loading, currUser, flashError]);

    if (loading) {
        return null;
    }

    if (!currUser) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children;
}

export default ProtectedRoute;
