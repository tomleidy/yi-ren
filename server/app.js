require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const { SESSION_COOKIE_MAX_AGE } = require('./src/constants');

// Import routes
const authRouter = require("./src/routes/auth");
const readingRouter = require("./src/routes/reading");
const userRouter = require("./src/routes/users");
const referenceRouter = require("./src/routes/reference");

// Import middleware
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const config = require('./config');

// Middleware setup
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
mongoose.connect(config.mongoUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat', // Should be in env
    cookie: { maxAge: SESSION_COOKIE_MAX_AGE },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: config.mongoUrl,
        collectionName: 'sessions',
        ttl: SESSION_COOKIE_MAX_AGE / 1000, // Convert to seconds
        autoRemove: 'native'
    })
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRouter);
app.use("/reading", readingRouter);
app.use("/users", userRouter);
app.use("/reference", referenceRouter);

// Error handling
app.use(errorHandler);

// 404 handler and a link to http.cat, because meow.
app.use((req, res) => {
    res.status(404).send('<a href="https://http.cat/status/404">404 Not Found</a>');
});

module.exports = app;