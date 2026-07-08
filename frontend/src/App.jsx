import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Flash from "./components/Flash.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Listings from "./pages/Listings.jsx";
import ShowListing from "./pages/ShowListing.jsx";
import NewListing from "./pages/NewListing.jsx";
import EditListing from "./pages/EditListing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Flash />
                <Routes>
                    <Route path="/" element={<Navigate to="/listings" replace />} />
                    <Route path="/listings" element={<Listings />} />
                    <Route path="/listings/search" element={<Listings />} />
                    <Route path="/listings/filters" element={<Listings />} />
                    <Route path="/listings/new" element={
                        <ProtectedRoute><NewListing /></ProtectedRoute>
                    } />
                    <Route path="/listings/:id" element={<ShowListing />} />
                    <Route path="/listings/:id/edit" element={
                        <ProtectedRoute><EditListing /></ProtectedRoute>
                    } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<ErrorPage message="page not found" />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;
