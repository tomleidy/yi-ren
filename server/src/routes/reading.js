const express = require("express");
const { isAuthenticated } = require("../middleware/authMiddleware");
const { Reading } = require("../models/reading");
const { HTTP_STATUS } = require("../constants");
const router = express.Router();

// Validation helper
const isValidHexagram = (hex) => {
    // Valid hexagram number (1-64)
    if (/^([1-9]|[1-5][0-9]|6[0-4])$/.test(hex)) {
        return true;
    }
    // Valid binary string
    if (/^[01]{6}$/.test(hex)) {
        return true;
    }
    return false;
};

// Route handlers
const createReading = async (req, res, next) => {
    const { hexagram1, hexagram2, topic } = req.body;
    const { _id: userId } = req.session.passport.user;

    if (!hexagram1 || !isValidHexagram(hexagram1)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid primary hexagram"
        });
    }

    if (hexagram2 && !isValidHexagram(hexagram2)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid secondary hexagram"
        });
    }

    try {
        const reading = new Reading({
            userId,
            hexagram1: parseInt(hexagram1, 10),
            hexagram2: hexagram2 ? parseInt(hexagram2, 10) : null,
            topic
        });

        const savedReading = await reading.save();
        res.status(HTTP_STATUS.CREATED).json(savedReading);
    } catch (err) {
        next(err);
    }
};

const listReadings = async (req, res, next) => {
    const { _id: userId } = req.session.passport.user;

    try {
        const readings = await Reading.find({
            userId,
            deletedAt: null,
            deletedPermanent: false
        });
        res.status(HTTP_STATUS.OK).json(readings);
    } catch (err) {
        next(err);
    }
};

const getReading = async (req, res, next) => {
    const { _id: userId } = req.session.passport.user;
    const { readingId } = req.params;

    try {
        const reading = await Reading.findOne({
            _id: readingId,
            userId,
            deletedAt: null,
            deletedPermanent: false
        }).populate('hexagram1 hexagram2');

        if (!reading) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Reading not found"
            });
        }

        res.status(HTTP_STATUS.OK).json(reading);
    } catch (err) {
        next(err);
    }
};

const updateReading = async (req, res, next) => {
    const { _id: userId } = req.session.passport.user;
    const { readingId } = req.params;
    const allowedUpdates = ['topic', 'notes'];

    // Filter to only allowed fields
    const updates = Object.keys(req.body)
        .filter(key => allowedUpdates.includes(key))
        .reduce((obj, key) => {
            obj[key] = req.body[key];
            return obj;
        }, {});

    if (Object.keys(updates).length === 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "No valid update fields provided"
        });
    }

    try {
        const reading = await Reading.findOneAndUpdate(
            {
                _id: readingId,
                userId,
                deletedAt: null,
                deletedPermanent: false
            },
            updates,
            { new: true }
        ).populate('hexagram1 hexagram2');

        if (!reading) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Reading not found"
            });
        }

        res.status(HTTP_STATUS.OK).json(reading);
    } catch (err) {
        next(err);
    }
};

const deleteReading = async (req, res, next) => {
    const { _id: userId } = req.session.passport.user;
    const { readingId } = req.params;
    const { permanent } = req.query;

    try {
        const updateData = permanent ?
            { deletedPermanent: true } :
            { deletedAt: new Date() };

        const reading = await Reading.findOneAndUpdate(
            {
                _id: readingId,
                userId,
                deletedAt: null,
                deletedPermanent: false
            },
            updateData,
            { new: true }
        );

        if (!reading) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Reading not found"
            });
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Reading deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};

// Routes
router.post("/new", isAuthenticated, createReading);
router.get("/list", isAuthenticated, listReadings);
router.get("/id/:readingId", isAuthenticated, getReading);
router.put("/id/:readingId", isAuthenticated, updateReading);
router.delete("/id/:readingId", isAuthenticated, deleteReading);

module.exports = router;