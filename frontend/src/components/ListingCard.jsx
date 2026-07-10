import { Link } from "react-router-dom";

function ListingCard({ listing }) {
    return (
        <Link to={`/listings/${listing._id}`} className="listing-links">
            <div className="card h-100 listing-card">
                <img src={listing.image.url} className="card-img-top" alt="listing_images"
                    style={{ height: "20rem" }} />
                <div className="card-img-overlay mb-3"></div>
                <div className="card-body">
                    <p className="card-text mt-2">
                        <b>{listing.title}</b> <br />
                        &#8377; {listing.price.toLocaleString("en-IN")} / night
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default ListingCard;
