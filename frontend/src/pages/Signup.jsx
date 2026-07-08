import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useFlash } from "../context/FlashContext.jsx";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);

    const { setCurrUser } = useAuth();
    const { flashSuccess, flashError } = useFlash();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            setValidated(true);
            return;
        }

        try {
            const res = await api.post("/signup", { username, email, password });
            setCurrUser(res.data.user);
            flashSuccess("Welcome to Wanderlust");
            navigate("/listings");
        } catch (err) {
            flashError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="row">
            <div className="col-12 col-md-8 offset-md-2 mb-3 mt-3">
                <h1>Signup for Wanderlust</h1>
                <form onSubmit={handleSubmit} noValidate
                    className={`needs-validation mt-4 ${validated ? "was-validated" : ""}`}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" name="username" id="username" placeholder="Enter username"
                            className="form-control" value={username}
                            onChange={(e) => setUsername(e.target.value)} required />
                        <div className="invalid-feedback">Please Enter Username</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter email"
                            className="form-control" value={email}
                            onChange={(e) => setEmail(e.target.value)} required />
                        <div className="invalid-feedback">Please Enter Email</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter password"
                            className="form-control" value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                        <div className="invalid-feedback">Please Enter Password</div>
                    </div>
                    <button className="btn btn-success mt-2 edit-btn">SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
