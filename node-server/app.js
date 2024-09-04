const express = require("express");
const app = express();
const morgan = require('morgan')
const path = require("path");
const mongoose = require('mongoose');
const config = require('./config');

const Hexagram = require("./models/hexagram");

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
//router = express.Router();

let mongoUrl = config.mongoUrl;

// save for when we're using a more modern MongoDB instance.
const mongoOptions = {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const connect = mongoose.connect(mongoUrl, {});


connect.then(() => {
    console.log('Connected correctly to server');
}, err => console.log(err));

app.get("/hexagram/:hex1", (req, res, next) => {
    let searchPath = hexagramIndexType(req.params.hex1);
    let queryDoc = {}
    switch (searchPath) {
        case "binary":
            queryDoc.lowerBinary = req.params.hex1.substring(0, 3);
            queryDoc.upperBinary = req.params.hex1.substring(3, 6);
            break;
        case "king wen":
            queryDoc["king wen"] = Number(req.params.hex1);
            break;
        default:
            res.status(400).json({ error: "Invalid hexagram request" });
            return;
    }
    Hexagram.findOne(queryDoc)
        .then(hex1 => {
            if (!hex1) {
                res.status(400).json({ error: "Hexagram not found, where did it go?" });
            }
            res.status(200).json(hex1);
        })
        .catch(err => next(err));
})



/*
router.post("/newreading/", (req, res) => {
    // req.params: { hex1: 1-64, hex2?: 1-64 }
    // free? redirect to /gua/hex1/hex2
    // paid? add to database, redirect to /reading/new_readingId
})

router.post

router.get("/gua/:hex1/:hex2", (req, res) => { })
router.get("/reading/:readingId", (req, res) => { })
router.get("/readings/", (req, res) => { })
router.put("/reading/:readingId", (req, res) => { })
router.delete("/reading/:readingId", (req, res) => { })

router.post('/register', (req, res) => { });
//router.post("/login", passport.authenticate('local'), (req, res) => { })
router.get("/logout", (req, res, next) => { })

*/

function hexagramIndexType(paramsHex) {
    if (/^([1-9]|[1-5][0-9]|6[0-4])$/.test(paramsHex)) {
        return "king wen";
    } else if (/^[01]{6}$/.test(paramsHex)) {
        return "binary";
    }
    return false;
}




module.exports = app;