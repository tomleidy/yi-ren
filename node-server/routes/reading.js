const express = require("express");

const readingRouter = express.Router();



readingRouter.post("/reading/new/", (req, res) => { });
// body-parser?
// verifyPaid, if unpaid: redirect to hexgrams/:hex1[/:hex2]
// verifyPaid, if paid, add to database then redirect to GET /reading/id/:readingId
readingRouter.get("/reading/list", (req, res) => { });
readingRouter.get("/reading/id/:readingId", (req, res) => { });
readingRouter.put("/reading/id/:readingId", (req, res) => { });
readingRouter.delete("/reading/id/:readingId", (req, res) => { });


module.exports = readingRouter;