const express = require("express");
const passport = require("passport");
const authRouter = express.Router();

authRouter.post('/register', (req, res) => { res.status(404).send("404") });
authRouter.post("/login", passport.authenticate('local'), (req, res) => { res.status(404).send("404"); });
authRouter.get("/logout", (req, res, next) => {
    res.status(404).send("404");
})

module.exports = authRouter;