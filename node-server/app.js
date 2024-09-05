const express = require("express");
const app = express();
const morgan = require('morgan')
const path = require("path");
const mongoose = require('mongoose');
var createError = require('http-errors');
const config = require('./config');

const hexagramRouter = require("./routes/hexagram");
const authRouter = require("./routes/auth");
const readingRouter = require("./routes/reading");

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/hexagram", hexagramRouter);
app.use("/auth", authRouter);
app.use("/reading", readingRouter);


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