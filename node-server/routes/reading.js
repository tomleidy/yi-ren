const express = require("express");
const readingRouter = express.Router();
const { readingCreate, readingList, readingGet, readingUpdate, readingDelete } = require("../models/reading")
const { validateHexagramString } = require("../helpers/hexagrams");

readingRouter.post("/new", async (req, res, next) => {
    if (!req.session.passport) { return res.status(403).json({ error: "Not authorized" }); }
    // check if SaaS type user, 403 if not
    if (!req.body.hexagram1 || !validateHexagramString(req.body.hexagram1)) {
        return res.status(406).json({ message: "406 Not Acceptable: Hexagram1" })
    }
    if (req.body.hexagram2 && !validateHexagramString(req.body.hexagram2)) {
        return res.status(406).json({ message: "406 Not Acceptable: Hexagram2" })
    }
    let { hexagram1, hexagram2, topic } = req.body;
    let { userId: _id, username } = req.session['passport']['user']
    let readingInfo = { userId, username, hexagram1, hexagram2, topic }
    try {
        let result = await readingCreate(readingInfo);
        if (!result) {
            return next({ error: "missing result" });
        }
        res.status(result.status).json(result.data);
        // if they have their own yijing documents
        // (send the relevant lines from them and Legge)

    }
    catch (err) {
        next(err);
    }
});


readingRouter.get("/list", async (req, res, next) => {
    if (!req.session.passport) { return res.status(403).json({ error: "Not authorized" }); }
    let { userId: _id } = req.session['passport']['user'];
    try {
        let result = await readingList({ userId })
        if (!result) {
            return next({ error: "missing result" });
        }
        res.status(result.status).json(result.data);
    }
    catch (err) {
        next(err);
    }
});
readingRouter.get("/id/:readingId", async (req, res, next) => {
    if (!req.session.passport) { return res.status(403).json({ error: "Not authorized" }); }
    let { _id: userId } = req.session['passport']['user'];
    let readingId = req.params.readingId;
    try {
        let result = await readingGet({ userId, readingId });
        if (!result) {
            return next({ error: "missing result" });
        }
        res.status(result.status).json(result.data);
    }
    catch (err) {
        next(err);
    }
});
readingRouter.put("/id/:readingId", async (req, res, next) => {
    if (!req.session.passport) { return res.status(403).json({ error: "Not authorized" }); }
    let { _id: userId } = req.session['passport']['user'];
    let readingId = req.params.readingId;
    let readingInfo = JSON.parse(JSON.stringify(req.body));
    readingInfo['readingId'] = readingId;
    readingInfo['userId'] = userId;
    try {
        let result = await readingUpdate(readingInfo);
        if (!result) {
            return next({ error: "missing result" });
        }
        res.status(result.status).json(result.data);
    }
    catch (err) {
        next(err);
    }
});

readingRouter.delete("/id/:readingId", async (req, res, next) => {
    if (!req.session.passport) { return res.status(403).json({ error: "Not authorized" }); }
    let { _id: userId } = req.session['passport']['user'];
    let readingId = req.params.readingId;
    let readingInfo = { userId, readingId };
    try {
        let result = await readingDelete(readingInfo);
        if (!result) {
            return next({ error: "missing result" });
        }
        res.status(result.status).json(result.data);
    }
    catch (err) {
        next(err);
    }

});


module.exports = readingRouter;