const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { User, userCreate } = require("../models/user");


require("dotenv").config();


let dummyUserBody = { username: "dummyuser202409", password: "dummy password", email: "dummy@dummy.org" };
if (process.env.TEST_ENV === "true") {
    createDummy();
} else {
    // deleteDummy();
}


async function createDummy() {
    try {
        let result = await userCreate(dummyUserBody);
        if (result) {
            console.log(result);
        }
    }
    catch (err) {
        console.log(err);
    }
}



authRouter.post('/register', async (req, res, next) => {
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

exports.local = passport.use(new LocalStrategy(User.authenticate()));







module.exports = authRouter;