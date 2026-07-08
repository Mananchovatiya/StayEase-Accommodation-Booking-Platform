const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const getCoordinates = require("../utils/fetchapi.js");

module.exports.index = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const totalListings = await Listing.countDocuments();
    const totalPages = Math.ceil(totalListings / limit);

    let listings = await Listing.find({}).limit(limit).skip((page - 1) * limit);
    res.json({
        listings,
        current: page,
        totalPages,
        isSearchOrFilter: false
    });
};

module.exports.createListing = async (req, res) => {
    let location = req.body.location;

    const coords = await getCoordinates(location);
    if (!coords) throw new ExpressError(400, "Location not found");

    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = { type: "Point", coordinates: [coords.lon, coords.lat] };
    await newListing.save();

    res.status(201).json({ message: "New Listing is created", listing: newListing });
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            }
        })
        .populate("owner");
    if (!listing) {
        return res.status(404).json({ message: "You requested listing does not exist" });
    }
    res.json({ listing });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let oldListing = await Listing.findById(id);

    let listing = await Listing.findByIdAndUpdate(id, { ...req.body }, { new: true });

    //for edit image
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = { url, filename };
        await listing.save();
    }

    if (oldListing.location !== req.body.location) {
        let location = req.body.location;

        const coordinates = await getCoordinates(location);

        if (!coordinates) {
            return res.status(400).json({ message: "Location not found" });
        }

        listing.geometry = {
            type: "Point",
            coordinates: [coordinates.lon, coordinates.lat]
        };
        listing.location = location;
    }

    await listing.save();

    res.json({ message: "Listing is updated", listing });
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);

    res.json({ message: "Listing is deleted" });
};

module.exports.searchListing = async (req, res) => {
    let { query } = req.query;

    if (!query) {
        return res.json({ listings: [], isSearchOrFilter: false });
    }

    let listings = await Listing.find({
        $or: [
            {
                title: {
                    $regex: query,
                    $options: "i",
                }
            },
            {
                location: {
                    $regex: query,
                    $options: 'i'
                }
            },
            {
                country: {
                    $regex: query,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: query,
                    $options: "i"
                }
            }
        ]
    });
    res.json({
        listings,
        isSearchOrFilter: true,
    });
};

module.exports.filterListing = async (req, res) => {
    let { category } = req.query;

    const listings = await Listing.find({ category });
    res.json({ listings, isSearchOrFilter: true });
};
