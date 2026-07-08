import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFlash } from "../context/FlashContext.jsx";

function Flash() {
    const { success, error, clearFlash } = useFlash();
    const location = useLocation();

    // Auto-hide flash messages after 3 seconds
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(clearFlash, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, error, clearFlash, location.pathname]);

    return (
        <>
            {success && (
                <div className="alert alert-success alert-dismissible fade show col-12 col-md-8 offset-md-2"
                    role="alert">
                    {success}
                    <button type="button" className="btn-close" onClick={clearFlash} aria-label="Close"></button>
                </div>
            )}

            {error && (
                <div className="alert alert-danger alert-dismissible fade show col-12 col-md-8 offset-md-2"
                    role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={clearFlash} aria-label="Close"></button>
                </div>
            )}
        </>
    );
}

export default Flash;
