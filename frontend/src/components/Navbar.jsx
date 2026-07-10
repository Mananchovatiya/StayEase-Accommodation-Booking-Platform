import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useFlash } from "../context/FlashContext.jsx";
import api from "../api/axios.js";

function Navbar() {
    const { currUser, setCurrUser } = useAuth();
    const { flashSuccess } = useFlash();
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) {
            navigate("/listings");
        } else {
            navigate(`/listings/search?query=${encodeURIComponent(query)}`);
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        await api.get("/logout");
        setCurrUser(null);
        flashSuccess("You are Logout");
        navigate("/listings");
    };

    return (
        <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/listings">
                    <i className="fa-regular fa-compass"></i>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                    <div className="navbar-nav">
                        <Link className="nav-link" to="/listings">Explore</Link>
                    </div>

                    <form className="d-flex flex-column flex-md-row mx-md-auto my-2 my-md-0" role="search"
                        onSubmit={handleSearch}>

                        <input className="form-control me-md-2 search-inp mb-2 mb-md-0" type="search"
                            placeholder="Search destinations" name="query" value={query}
                            onChange={(e) => setQuery(e.target.value)} />

                        <button className="btn search-btn" type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>Search
                        </button>
                    </form>

                    <div className="navbar-nav ms-md-auto">
                        <Link className="nav-link" to="/listings/new">Airbnb your place</Link>

                        {!currUser && (
                            <>
                                <Link className="nav-link" to="/signup"><b>Sign up</b></Link>
                                <Link className="nav-link" to="/login"><b>Log in</b></Link>
                            </>
                        )}

                        {currUser && (
                            <a className="nav-link" href="/logout" onClick={handleLogout}><b>Log out</b></a>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
