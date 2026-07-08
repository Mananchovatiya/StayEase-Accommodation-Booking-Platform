import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useFlash } from "../context/FlashContext.jsx";

function NewListing() {
    const [validated, setValidated] = useState(false);
    const { flashSuccess, flashError } = useFlash();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        // FormData is needed because we upload an image file (multer + Cloudinary)
        const formData = new FormData();
        formData.append("title", form.title.value);
        formData.append("description", form.description.value);
        formData.append("image", form.image.files[0]);
        formData.append("category", form.category.value);
        formData.append("price", form.price.value);
        formData.append("country", form.country.value);
        formData.append("location", form.location.value);

        try {
            await api.post("/listings", formData);
            flashSuccess("New Listing is created");
            navigate("/listings");
        } catch (err) {
            flashError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="row mt-3 mb-3">
            <div className="col-12 col-lg-8 offset-lg-2">
                <h3 className="mb-4">Create new Listing</h3>
                <form onSubmit={handleSubmit} noValidate
                    className={`needs-validation ${validated ? "was-validated" : ""}`}
                    encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" name="title" id="title" placeholder="Enter title"
                            className="form-control" required />
                        <div className="valid-feedback">Title looks good!</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea name="description" id="description" placeholder="Enter description"
                            className="form-control" required></textarea>
                        <div className="invalid-feedback">Please Enter valid description</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload Image</label>
                        <input type="file" name="image" id="image" className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className="form-select form-select-sm" name="category" id="category"
                            defaultValue="" required>
                            <option value="" disabled>--Select Category--</option>
                            <option value="Trending">Trending</option>
                            <option value="Rooms">Rooms</option>
                            <option value="Iconic Cities">Iconic Cities</option>
                            <option value="Mountains">Mountains</option>
                            <option value="Castles">Castles</option>
                            <option value="Amazing Pools">Amazing Pools</option>
                            <option value="Camping">Camping</option>
                            <option value="Farms">Farms</option>
                            <option value="Arctic">Arctic</option>
                            <option value="Boats">Boats</option>
                        </select>
                        <div className="invalid-feedback">Please select category</div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-md-4">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input name="price" id="price" placeholder="Enter price"
                                className="form-control" required />
                            <div className="invalid-feedback">Please Enter valid price</div>
                        </div>
                        <div className="mb-3 col-md-8">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" name="country" id="country" placeholder="Enter country"
                                className="form-control" required />
                            <div className="invalid-feedback">Please Enter country name</div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input type="text" name="location" id="location" placeholder="Enter location"
                            className="form-control" required />
                        <div className="invalid-feedback">Please Enter location</div>
                    </div>
                    <br />
                    <button className="btn btn-dark add-btn">ADD</button>
                </form>
            </div>
        </div>
    );
}

export default NewListing;
