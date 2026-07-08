const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { validateListing } = require("../middlware.js");
const { isloggedIn, isOwner } = require("../middlware.js");
const listingController = require("../controller/listings.js");
const multer = require('multer');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

//Index Route and Create Route

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isloggedIn, upload.single('image'), validateListing,
        wrapAsync(listingController.createListing));

//search functionality

router.get('/search', wrapAsync(listingController.searchListing));

//filters functionality

router.get('/filters', wrapAsync(listingController.filterListing));

//Show Route, Update Route and Delete Route

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isloggedIn, isOwner, upload.single('image'), validateListing,
        wrapAsync(listingController.updateListing))
    .delete(isloggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
