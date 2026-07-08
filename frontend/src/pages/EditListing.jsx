import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useFlash } from "../context/FlashContext.jsx";

function EditListing() {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [validated, setValidated] = useState(false);
    const { flashSuccess, flashError } = useFlash();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/listings/${id}`)
            .then((res) => setListing(res.data.listing))
            .catch(() => {
                flashError("Your requested listing does not exist");
                navigate("/listings");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!listing) return null;

    // Blurred preview of the existing image (Cloudinary transformation)
    const originalImageUrl = listing.image.url.replace("/upload", "/upload/e_blur:300");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        const formData = new FormData();
        formData.append("title", form.title.value);
        formData.append("description", form.description.value);
        if (form.image.files[0]) {
            formData.append("image", form.image.files[0]);
        }
        formData.append("category", form.category.value);
        formData.append("price", form.price.value);
        formData.append("country", form.country.value);
        formData.append("location", form.location.value);

        try {
            await api.put(`/listings/${id}`, formData);
            flashSuccess("Listing is updated");
            navigate(`/listings/${id}`);
        } catch (err) {
            flashError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="row mt-3 mb-3">
            <div className="col-12 col-lg-8 offset-lg-2">
                <h3 className="mb-4">Edit The Listing: </h3>
                <form onSubmit={handleSubmit} noValidate
                    className={`needs-validation ${validated ? "was-validated" : ""}`}
                    encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" name="title" id="title" defaultValue={listing.title}
                            className="form-control" required />
                        <div className="valid-feedback">Title looks good!</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea name="description" className="form-control" id="description"
                            defaultValue={listing.description} required></textarea>
                        <div className="invalid-feedback">Please Enter valid description</div>
                    </div>
                    <div className="mb-3">
                        <p>Original Listing Image</p>
                        <img src={originalImageUrl} width="300" height="200" alt="original listing" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload New Image</label>
                        <input type="file" name="image" id="image" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className="form-select form-select-sm" name="category" id="category"
                            defaultValue={listing.category}>
                            <option value="Trending">Trending</option>
                            <option value="Rooms">Rooms</option>
                            <option value="Mountains">Mountains</option>
                            <option value="Iconic Cities">Iconic Cities</option>
                            <option value="Castles">Castles</option>
                            <option value="Amazing Pools">Amazing Pools</option>
                            <option value="Camping">Camping</option>
                            <option value="Farms">Farms</option>
                            <option value="Arctic">Arctic</option>
                            <option value="Boats">Boats</option>
                        </select>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-md-4">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" name="price" id="price" defaultValue={listing.price}
                                className="form-control" required />
                            <div className="invalid-feedback">Please Enter valid price</div>
                        </div>
                        <div className="mb-3 col-md-4">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" name="country" id="country" defaultValue={listing.country}
                                className="form-control" required />
                            <div className="invalid-feedback">Please Enter country name</div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input type="text" name="location" id="location" defaultValue={listing.location}
                            className="form-control" required />
                        <div className="invalid-feedback">Please Enter location</div>
                    </div>
                    <br />
                    <button className="btn btn-dark add-btn edit-btn">Edit</button>
                </form>
            </div>
        </div>
    );
}

export default EditListing;
