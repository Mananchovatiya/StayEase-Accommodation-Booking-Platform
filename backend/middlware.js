const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

// The React frontend sends listing fields as flat FormData (title, price, ...),
// so we wrap them in { listing: {...} } to reuse the exact same Joi schema.
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate({ listing: { ...req.body } });
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};

// In a REST API we return 401 JSON instead of redirecting to /login.
// The React app catches the 401, shows the flash message and redirects.
module.exports.isloggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "You must be logged In" });
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)) {
        return res.status(403).json({ message: "You are not owner of the listing" });
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        return res.status(403).json({ message: "You are not the author of review" });
    }
    next();
};
