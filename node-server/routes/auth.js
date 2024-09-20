const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const { User, userCreate, userLogin } = require("../models/user");
const authRouter = express.Router();
const { createDummy } = require("../helpers/auth");

authRouter.post('/auth/register', async (req, res, next) => {
    if (req.body.username === "" || req.body.password === "") {
        return res.status(406).json({ message: "406 Not Acceptable: Missing Fields" })
    }
    try {
        let result = await userCreate(req.body);
        return res.status(result.status).json(result.data);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

authRouter.post("/auth/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

async function passportVerifyLogin(username, password, next) {
    let authenticationIncorrectError = { status: 401, message: "Incorrect username or password" };
    try {
        const user = await User.findOne({ username: username });
        if (!user) { return next(null, false, authenticationIncorrectError); }
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
            return next(null, user);
        }
        return next(null, false, authenticationError);
    }
    catch (err) {
        return next(err);
    }
}

passport.use(new LocalStrategy(passportVerifyLogin));


module.exports = authRouter;