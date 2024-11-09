const express = require('express');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();
const { verifyUser, verifyAdmin } = require("../middleware/authMiddleware");

router.get('/', verifyUser, verifyAdmin, async (req, res, next) => {
    // return list of users for admin only
});

router.get('/:username/profile', async (req, res, next) => {
    // if logged in user = username, return full profile information
    // else return basic profile information for username
})

router.get("/:username/adminView", async (req, res, next) => {
    // if logged in user is an admin, return full profile information
    // else 404 (I know, 403 is better, but we're adding security through obscurity)
})


module.exports = router;
