import { useEffect, useState } from "react";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import api from "../api/axios.js";
import FilterBar from "../components/FilterBar.jsx";
import ListingCard from "../components/ListingCard.jsx";

// One page for index (/listings), search (/listings/search) and
// filters (/listings/filters) - same as the single index.ejs template
function Listings() {
    const [listings, setListings] = useState([]);
    const [totalPages, setTotalPages] = useState(undefined);
    const [current, setCurrent] = useState(1);
    const [isSearchOrFilter, setIsSearchOrFilter] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const location = useLocation();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchListings = async () => {
            setLoaded(false);
            let res;

            if (location.pathname === "/listings/search") {
                const query = searchParams.get("query") || "";
                res = await api.get(`/listings/search?query=${encodeURIComponent(query)}`);
            } else if (location.pathname === "/listings/filters") {
                const category = searchParams.get("category") || "";
                res = await api.get(`/listings/filters?category=${encodeURIComponent(category)}`);
            } else {
                const page = searchParams.get("page") || 1;
                res = await api.get(`/listings?page=${page}`);
            }

            setListings(res.data.listings);
            setTotalPages(res.data.totalPages);
            setCurrent(res.data.current || 1);
            setIsSearchOrFilter(res.data.isSearchOrFilter);
            setLoaded(true);
        };

        fetchListings();
    }, [location.pathname, searchParams]);

    return (
        <>
            <FilterBar />

            {loaded && isSearchOrFilter && listings.length > 0 && (
                <h5 className="mb-3">
                    Found {listings.length} listings
                </h5>
            )}

            {loaded && isSearchOrFilter && listings.length === 0 && (
                <div className="text-center mt-5">
                    <h3>No listings found</h3>
                </div>
            )}

            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4">
                {listings.map((listing) => (
                    <ListingCard key={listing._id} listing={listing} />
                ))}
            </div>

            {typeof totalPages !== "undefined" && (
                <nav aria-label="...">
                    <ul className="pagination pagination-sm justify-content-center">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
                            <li key={i} className={`page-item ${current === i ? "active" : ""}`}>
                                <Link className="page-link" to={`/listings?page=${i}`}>
                                    {i}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </>
    );
}

export default Listings;
