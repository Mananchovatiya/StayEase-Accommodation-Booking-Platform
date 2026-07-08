const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const MONGO_URL = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

async function initDB() {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "6a4e1160a88c1726ce36265d" }));
    await Listing.insertMany(initData.data);
    console.log("all data is saved");
}

initDB();