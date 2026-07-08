const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isloggedIn, isReviewAuthor } = require("../middlware.js");
const reviewController = require("../controller/reviews.js");


//Create review (Post Route)

router.post("/", isloggedIn, validateReview, wrapAsync(reviewController.createReview));

//Review Delete Route

router.delete("/:reviewId", isloggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
