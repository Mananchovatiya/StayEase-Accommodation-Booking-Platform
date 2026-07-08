import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useFlash } from "../context/FlashContext.jsx";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);

    const { setCurrUser } = useAuth();
    const { flashSuccess, flashError } = useFlash();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            setValidated(true);
            return;
        }

        try {
            const res = await api.post("/login", { username, password });
            setCurrUser(res.data.user);
            flashSuccess("Welcome back to Wanderlust");

            // redirect-after-login (same as saveRedirectUrl middleware)
            const redirectUrl = location.state?.from || "/listings";
            navigate(redirectUrl);
        } catch (err) {
            flashError(err.response?.data?.message || "Invalid username or password");
        }
    };

    return (
        <div className="row">
            <div className="col-12 col-md-8 offset-md-2 mt-3 mb-3">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} noValidate
                    className={`needs-validation mt-4 ${validated ? "was-validated" : ""}`}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" name="username" id="username" placeholder="Enter Username"
                            className="form-control" value={username}
                            onChange={(e) => setUsername(e.target.value)} required />
                        <div className="invalid-feedback">Please Enter username</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter password"
                            className="form-control" value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                        <div className="invalid-feedback">Please Enter Password</div>
                    </div>
                    <button className="btn btn-primary mt-2 edit-btn">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
