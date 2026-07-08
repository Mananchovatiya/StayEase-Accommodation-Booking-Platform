import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useFlash } from "../context/FlashContext.jsx";
import MapView from "../components/MapView.jsx";

function ShowListing() {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const [validated, setValidated] = useState(false);

    const { currUser } = useAuth();
    const { flashSuccess, flashError } = useFlash();
    const navigate = useNavigate();

    const fetchListing = async () => {
        try {
            const res = await api.get(`/listings/${id}`);
            setListing(res.data.listing);
        } catch (err) {
            flashError("You requested listing does not exist");
            navigate("/listings");
        }
    };

    useEffect(() => {
        fetchListing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleDeleteListing = async () => {
        try {
            await api.delete(`/listings/${id}`);
            flashSuccess("Listing is deleted");
            navigate("/listings");
        } catch (err) {
            flashError(err.response?.data?.message || "Something went wrong");
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            setValidated(true);
            return;
        }
        try {
            await api.post(`/listings/${id}/reviews`, {
                review: { rating, comment },
            });
            flashSuccess("New Review is created");
            setRating(1);
            setComment("");
            setValidated(false);
            fetchListing();
        } catch (err) {
            flashError(err.response?.data?.message || "Something went wrong");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await api.delete(`/listings/${id}/reviews/${reviewId}`);
            flashSuccess("Review is deleted");
            fetchListing();
        } catch (err) {
            flashError(err.response?.data?.message || "Something went wrong");
        }
    };

    if (!listing) return null;

    const isOwner = currUser && listing.owner && currUser._id === listing.owner._id;
    const lat = listing.geometry.coordinates[1];
    const lon = listing.geometry.coordinates[0];

    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-8 offset-lg-2">
                    <h3 className="mb-4 mt-3">{listing.title}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-8 offset-lg-2">
                    <div className="card listing-card">
                        <img src={listing.image.url} className="card-img-top show-img" alt="listing_image" />
                        <div className="card-body">
                            <p className="card-text listing-details mt-3">
                                <i><b>Hosted by {listing.owner.username}</b></i> <br />
                                {listing.description} <br />
                                <b>Category:</b> {listing.category} <br />
                                <b>&#8377; {listing.price.toLocaleString("en-IN")}</b> / night <br />
                                {listing.location} , {listing.country}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {isOwner && (
                        <div className="col-12 col-lg-8 offset-lg-2 btn-container">
                            <Link to={`/listings/${listing._id}/edit`}>
                                <button className="btn btn-dark add-btn edit-btn">Edit</button>
                            </Link>
                            <button className="btn btn-dark ms-3 edit-btn" onClick={handleDeleteListing}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Review Form */}

            <div className="row mt-3">
                <div className="col-12 col-lg-8 offset-lg-2">
                    <hr />
                    {currUser && (
                        <>
                            <h4>Leave The Review: </h4>
                            <form onSubmit={handleReviewSubmit} noValidate
                                className={`needs-validation ${validated ? "was-validated" : ""}`}>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="rating" className="form-label">rating:</label>
                                    <fieldset className="starability-basic">
                                        <input type="radio" id="no-rate" className="input-no-rate"
                                            name="rating" value="1" checked={rating === 1}
                                            onChange={() => setRating(1)} aria-label="No rating." />
                                        <input type="radio" id="first-rate1" name="rating" value="1"
                                            checked={rating === 1} onChange={() => setRating(1)} />
                                        <label htmlFor="first-rate1" title="Terrible">1 star</label>

                                        <input type="radio" id="first-rate2" name="rating" value="2"
                                            checked={rating === 2} onChange={() => setRating(2)} />
                                        <label htmlFor="first-rate2" title="Not good">2 stars</label>

                                        <input type="radio" id="first-rate3" name="rating" value="3"
                                            checked={rating === 3} onChange={() => setRating(3)} />
                                        <label htmlFor="first-rate3" title="Average">3 stars</label>

                                        <input type="radio" id="first-rate4" name="rating" value="4"
                                            checked={rating === 4} onChange={() => setRating(4)} />
                                        <label htmlFor="first-rate4" title="Very good">4 stars</label>

                                        <input type="radio" id="first-rate5" name="rating" value="5"
                                            checked={rating === 5} onChange={() => setRating(5)} />
                                        <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                                    </fieldset>
                                </div>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="comment" className="form-label">Comment</label>
                                    <textarea name="comment" id="comment" rows="5" className="form-control"
                                        value={comment} onChange={(e) => setComment(e.target.value)}
                                        required></textarea>
                                    <div className="invalid-feedback">Please add the review</div>
                                    <button className="btn btn-outline-dark mb-3 mt-3"> Submit </button>
                                </div>
                            </form>
                            <hr />
                        </>
                    )}
                </div>

                <div className="col-12 col-lg-8 offset-lg-2">
                    {listing.reviews.length > 0 && (
                        <>
                            <h3 className="mt-3 mb-3">All Reviews</h3>
                            <div className="row mt-3 mb-3">
                                {listing.reviews.map((review) => (
                                    <div className="card col-12 col-lg-5 mt-3 review-card ms-3" key={review._id}>
                                        <div className="card-body review-details">
                                            <h5 className="card-title mb-3">@{review.author.username}</h5>
                                            <p className="starability-result card-text"
                                                data-rating={review.rating}></p>
                                            <p className="card-text review-comment mt-3">{review.comment}</p>
                                        </div>
                                        {currUser && review.author._id === currUser._id && (
                                            <button className="btn btn-dark mt-3 mb-3"
                                                onClick={() => handleDeleteReview(review._id)}>
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="col-12 col-lg-8 offset-lg-2 mt-3 mb-3">
                    <h3 className="mb-3">Where You'll be</h3>
                    <MapView lat={lat} lon={lon} name={listing.location} />
                </div>
            </div>
        </>
    );
}

export default ShowListing;
