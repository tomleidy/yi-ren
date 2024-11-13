const express = require("express");
const multer = require('multer');
const csv = require('csv-parse');
const { YijingText, createFromCSV, getTexts } = require("../models/yijingText");
const referenceRouter = express.Router();

// Configure multer for CSV uploads
const upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    storage: multer.memoryStorage()
});

// Get all titles for a user
referenceRouter.get("/titles", async (req, res, next) => {
    if (!req.session?.passport?.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const titles = await YijingText.getUserTitles(req.session.passport.user._id);
        res.status(200).json(titles);
    } catch (err) {
        next(err);
    }
});

// Upload new text
referenceRouter.post("/upload",
    upload.single('file'),
    async (req, res, next) => {
        if (!req.session?.passport?.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        try {
            const titleInfo = JSON.parse(req.body.titleInfo);

            // Parse CSV from buffer
            const records = [];
            const parser = csv.parse(req.file.buffer.toString(), {
                columns: true,
                skip_empty_lines: true
            });

            parser.on('readable', function () {
                let record;
                while ((record = parser.read()) !== null) {
                    records.push(record);
                }
            });

            parser.on('error', function (err) {
                throw new Error('Error parsing CSV: ' + err.message);
            });

            parser.on('end', async function () {
                try {
                    const result = await createFromCSV(
                        req.session.passport.user._id,
                        titleInfo,
                        records
                    );
                    res.status(201).json(result.getTitleInfo());
                } catch (err) {
                    next(err);
                }
            });

        } catch (err) {
            next(err);
        }
    }
);



referenceRouter.route("/:hexagram").get(async (req, res, next) => {
    try {
        const userId = req.session?.passport?.user?._id;
        const texts = await getTexts([req.params.hexagram], userId);
        res.status(200).json(texts);
    } catch (err) {
        next(err);
    }
});

referenceRouter.route("/:hexagram1/:hexagram2").get(async (req, res, next) => {
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
});

// Error handler
referenceRouter.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

module.exports = referenceRouter;
