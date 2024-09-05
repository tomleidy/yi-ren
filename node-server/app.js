const express = require("express");
const app = express();
const morgan = require('morgan')
const path = require("path");
const mongoose = require('mongoose');
const config = require('./config');

const hexagramRouter = require("./routes/hexagram");

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

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
//app.use




module.exports = app;