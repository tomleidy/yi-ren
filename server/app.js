require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const morgan = require('morgan')

const passport = require("passport")
const session = require("express-session");
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const authRouter = require("./routes/auth");

const app = express();
const bodyParser = require("body-parser");
const config = require('./config');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let mongoUrl = config.mongoUrl;
const mongoOptions = {};
const connect = mongoose.connect(mongoUrl, mongoOptions);

connect.then(() => {
    console.log('Connected correctly to server');
}, err => console.log("connect.then() error", err));



app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 }, // 14 days
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native'
    })
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.authenticate('session'));
const hexagramRouter = require("./routes/hexagram");
const readingRouter = require("./routes/reading");
const userRouter = require("./routes/users");
const referenceRouter = require("./routes/reference");
console.log("\n\n\n".repeat(15));


app.use("/hexagram", hexagramRouter);
app.use("/", authRouter);
app.use("/reading", readingRouter);
app.use("/users", userRouter);
app.use("/reference", referenceRouter);

app.use(function (req, res, next) {
    res.status(404).send('<a href="https://http.cat/status/404">404 Not Found</a>')
});



module.exports = app;