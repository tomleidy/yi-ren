const express = require("express");

const readingRouter = express.Router();



readingRouter.post("/new", (req, res) => { });
readingRouter.get("/list", (req, res) => { });
readingRouter.get("/id/:readingId", (req, res) => { });
readingRouter.put("/id/:readingId", (req, res) => { });
readingRouter.delete("/id/:readingId", (req, res) => { });


module.exports = readingRouter;