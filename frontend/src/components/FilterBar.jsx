import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FILTERS = [
    { category: "Trending", icon: "fa-solid fa-fire", label: "Trending" },
    { category: "Rooms", icon: "fa-solid fa-bed", label: "Rooms" },
    { category: "Iconic Cities", icon: "fa-solid fa-mountain-city", label: "Iconic cities" },
    { category: "Mountains", icon: "fa-solid fa-mountain", label: "Mountains" },
    { category: "Castles", icon: "fa-brands fa-fort-awesome", label: "Castles" },
    { category: "Amazing Pools", icon: "fa-solid fa-person-swimming", label: "Amazing Pools" },
    { category: "Camping", icon: "fa-solid fa-campground", label: "Camping" },
    { category: "Farms", icon: "fa-solid fa-seedling", label: "Farms" },
    { category: "Arctic", icon: "fa-regular fa-snowflake", label: "Arctic" },
    { category: "Boats", icon: "fa-solid fa-ship", label: "Boats" },
];

function FilterBar({ showTax, onToggleTax }) {
    const filtersBarRef = useRef(null);
    const leftBtnRef = useRef(null);
    const rightBtnRef = useRef(null);
    const navigate = useNavigate();

    const checkScroll = () => {
        const filtersBar = filtersBarRef.current;
        if (!filtersBar || !leftBtnRef.current || !rightBtnRef.current) return;

        leftBtnRef.current.style.display = filtersBar.scrollLeft > 0 ? "block" : "none";

        rightBtnRef.current.style.display =
            filtersBar.scrollLeft + filtersBar.clientWidth < filtersBar.scrollWidth
                ? "block"
                : "none";
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scrollFilters = (amount) => {
        filtersBarRef.current.scrollBy({ left: amount, behavior: "smooth" });
    };

    return (
        <div className="filters-container">

            {/* LEFT ARROW */}
            <button className="scroll-btn left-btn" ref={leftBtnRef} onClick={() => scrollFilters(-200)}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>

            {/* FILTERS */}
            <div className="filters mb-3" ref={filtersBarRef} onScroll={checkScroll}>
                {FILTERS.map((f) => (
                    <div className="filter" key={f.category}
                        onClick={() => navigate(`/listings/filters?category=${encodeURIComponent(f.category)}`)}>
                        <div><i className={f.icon}></i></div>
                        <p>{f.label}</p>
                    </div>
                ))}
            </div>

            {/* RIGHT ARROW */}
            <button className="scroll-btn right-btn" ref={rightBtnRef} onClick={() => scrollFilters(200)}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>

            <div className="tax-toggle">
                <div className="form-check-reverse form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault"
                        checked={showTax} onChange={onToggleTax} />
                    <label className="form-check-label" htmlFor="switchCheckDefault">
                        Display total after taxes
                    </label>
                </div>
            </div>
        </div>
    );
}

export default FilterBar;
