const User = require("../models/user.js");

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let registerdUser = await User.register(newUser, password);
        req.login(registerdUser, (err) => {
            if (err) {
                return next(err);
            }
            res.status(201).json({
                message: "Welcome to StayEase",
                user: {
                    _id: registerdUser._id,
                    username: registerdUser.username,
                    email: registerdUser.email,
                },
            });
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

module.exports.login = async (req, res) => {
    res.json({
        message: "Welcome back to StayEase",
        user: {
            _id: req.user._id,
            username: req.user.username,
            email: req.user.email,
        },
    });
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.json({ message: "You are Logout" });
    });
};

// Used by React on page load to restore the logged-in user (session cookie)
module.exports.currentUser = (req, res) => {
    if (req.user) {
        res.json({
            user: {
                _id: req.user._id,
                username: req.user.username,
                email: req.user.email,
            },
        });
    } else {
        res.json({ user: null });
    }
};
