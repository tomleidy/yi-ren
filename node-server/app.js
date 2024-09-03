const express = require("express");
const app = express();
const morgan = require('morgan')
const path = require("path");
const fs = require("fs");

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));



router = express.Router();

/*
router.post("/newreading/", (req, res) => {
    // req.params: { hex1: 1-64, hex2?: 1-64 }
    // free? redirect to /gua/hex1/hex2
    // paid? add to database, redirect to /reading/new_readingId
})

router.post

router.get("/gua/:hex1", (req, res) => { })
router.get("/gua/:hex1/:hex2", (req, res) => { })
router.get("/reading/:readingId", (req, res) => { })
router.get("/readings/", (req, res) => { })
router.put("/reading/:readingId", (req, res) => { })
router.delete("/reading/:readingId", (req, res) => { })

router.post('/register', (req, res) => { });
//router.post("/login", passport.authenticate('local'), (req, res) => { })
router.get("/logout", (req, res, next) => { })

    */
module.exports = app;