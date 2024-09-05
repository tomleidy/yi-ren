const express = require("express");
const passport = require("passport");
const authRouter = express.Router();

authRouter.post('/register', (req, res, next) => { next(); });
authRouter.post("/login", passport.authenticate('local'), (req, res) => { next(); });
authRouter.get("/logout", (req, res, next) => { next(); })

module.exports = authRouter;