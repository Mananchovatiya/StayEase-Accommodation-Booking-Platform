const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const userController = require("../controller/users.js");


router.post("/signup", wrapAsync(userController.signup));

// passport.authenticate with a custom callback so failures return JSON
// (in the EJS version this was failureRedirect + failureFlash)
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({ message: info && info.message ? info.message : "Invalid username or password" });
        }
        req.login(user, (err) => {
            if (err) return next(err);
            return userController.login(req, res);
        });
    })(req, res, next);
});

router.get("/logout", userController.logout);

router.get("/me", userController.currentUser);

module.exports = router;
