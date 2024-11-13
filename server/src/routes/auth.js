const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { userCreate } = require("../helpers/users");
const { HTTP_STATUS, SALT_ROUNDS } = require("../constants");
const router = express.Router();

// Configure passport strategy
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: "Incorrect username or password" });
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
            return done(null, false, { message: "Incorrect username or password" });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Passport serialization
passport.serializeUser((user, done) => {
    process.nextTick(() => done(null, {
        _id: user._id,
        username: user.username
    }));
});

passport.deserializeUser((user, done) => {
    process.nextTick(() => done(null, user));
});

// Route handlers
const login = (req, res) => {
    const user = {
        username: req.user.username,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        dateOfBirth: req.user.dateOfBirth,
        profilePicture: req.user.profilePicture,
        address: req.user.address,
        phoneNumber: req.user.phoneNumber
    };
    res.status(HTTP_STATUS.OK).json({
        message: "Login successful",
        user
    });
};

const register = async (req, res, next) => {
    const { username, password, email } = req.body;

    if (!username || !password) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required fields"
        });
    }

    try {
        const result = await userCreate(req.body);
        res.status(result.status).json(result.data);
    } catch (err) {
        next(err);
    }
};

const checkSession = async (req, res) => {
    if (!req.user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            message: "No active session"
        });
    }

    try {
        const user = await User.findById(req.user._id);
        res.status(HTTP_STATUS.OK).json({
            user: {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                dateOfBirth: user.dateOfBirth,
                profilePicture: user.profilePicture,
                address: user.address,
                phoneNumber: user.phoneNumber
            }
        });
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error fetching user data"
        });
    }
};

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.status(HTTP_STATUS.OK).json({
            message: "Logout successful"
        });
    });
};

// Routes
router.post("/login",
    passport.authenticate('local', { session: true }),
    login
);

router.post('/register', register);
router.get("/check-session", checkSession);
router.get("/logout", logout);

module.exports = router;