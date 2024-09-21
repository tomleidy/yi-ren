const express = require("express");
const readingRouter = express.Router();
const { readingCreate } = require("../models/reading")
const { validateHexagramString } = require("../helpers/hexagrams");

readingRouter.post("/new", async (req, res, next) => {

    if (!req.session.passport) { return res.status(403).json({ error: "Not authorized" }); }
    if (!req.body.hexagram1 || !validateHexagramString(req.body.hexagram1)) {
        return res.status(406).json({ message: "406 Not Acceptable: Hexagram1" })
    }
    if (req.body.hexagram2 && !validateHexagramString(req.body.hexagram2)) {
        return res.status(406).json({ message: "406 Not Acceptable: Hexagram2" })
    }
    try {
        let { hexagram1, hexagram2, topic } = req.body;
        let { _id, username } = req.session['passport']['user']
        let readingInfo = { _id, username, hexagram1, hexagram2, topic }
        let result = await readingCreate(readingInfo);
        if (!result) {
            return next({ error: "missing result" });
        }

        res.status(result.status).json(result.data);
        // check if SaaS type user
        // and if they have their own yijing documents
        // (send the relevant lines from them and Legge)

    }
    catch (err) {
        next(err);
    }

});


readingRouter.get("/list", (req, res) => { });
readingRouter.get("/id/:readingId", (req, res) => { });
readingRouter.put("/id/:readingId", (req, res) => { });
readingRouter.delete("/id/:readingId", (req, res) => { });


module.exports = readingRouter;