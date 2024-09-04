const express = require("express");
const app = express();
const morgan = require('morgan')
const path = require("path");
const mongoose = require('mongoose');
const config = require('./config');

const Hexagram = require("./models/hexagram");
const hexagramRouter = require("./routes/hexagram");

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

app.use("/hexagram", hexagramRouter);




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





module.exports = app;