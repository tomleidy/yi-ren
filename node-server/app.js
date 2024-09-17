const express = require("express");
const app = express();
const morgan = require('morgan')
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport")
const config = require('./config');

require("dotenv").config();

const hexagramRouter = require("./routes/hexagram");
const authRouter = require("./routes/auth");
const readingRouter = require("./routes/reading");
const userRouter = require("./routes/users");
const session = require("express-session");

app.use(morgan('dev'));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});


app.use(express.static(path.join(__dirname, 'public')));
app.use("/hexagram", hexagramRouter);
app.use("/auth", authRouter);
app.use("/reading", readingRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);


app.use(function (req, res, next) {
    res.status(404).send('<a href="https://http.cat/status/404">404 Not Found</a>')
});

let mongoUrl = config.mongoUrl;

// save for when we're using a more modern MongoDB instance.
const mongoOptions = {
    useCreateIndex: true, useFindAndModify: false,
    useNewUrlParser: true, useUnifiedTopology: true
};

const connect = mongoose.connect(mongoUrl, {});

connect.then(() => {
    console.log('Connected correctly to server');
}, err => console.log(err));


module.exports = app;