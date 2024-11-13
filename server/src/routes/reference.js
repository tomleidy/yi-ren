const express = require("express");
const multer = require('multer');
const csv = require('csv-parse');
const { YijingText, createFromCSV, getTexts } = require("../models/yijingText");
const { isAuthenticated } = require("../middleware/authMiddleware");
const router = express.Router();

// Configure multer for CSV uploads
const upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    storage: multer.memoryStorage()
});

// Route handlers
const getTitles = async (req, res, next) => {
    try {
        const titles = await YijingText.getUserTitles(req.session.passport.user._id);
        res.status(200).json(titles);
    } catch (err) {
        next(err);
    }
};

const uploadText = async (req, res, next) => {
    try {
        const titleInfo = JSON.parse(req.body.titleInfo);
        const records = [];

        const parser = csv.parse(req.file.buffer.toString(), {
            columns: true,
            skip_empty_lines: true
        });

        for await (const record of parser) {
            records.push(record);
        }

        const result = await createFromCSV(
            req.session.passport.user._id,
            titleInfo,
            records
        );

        res.status(201).json(result.getTitleInfo());
    } catch (err) {
        next(err);
    }
};

const getSingleHexagram = async (req, res, next) => {
    try {
        const userId = req.session?.passport?.user?._id;
        const texts = await getTexts([req.params.hexagram], userId);
        res.status(200).json(texts);
    } catch (err) {
        next(err);
    }
};

const getTwoHexagrams = async (req, res, next) => {
    try {
        const userId = req.session?.passport?.user?._id;
        const texts = await getTexts(
            [req.params.hexagram1, req.params.hexagram2],
            userId
        );
        res.status(200).json(texts);
    } catch (err) {
        next(err);
    }
};

// Routes
router.get("/titles", isAuthenticated, getTitles);
router.post("/upload", isAuthenticated, upload.single('file'), uploadText);
router.get("/:hexagram", getSingleHexagram);
router.get("/:hexagram1/:hexagram2", getTwoHexagrams);

module.exports = router;