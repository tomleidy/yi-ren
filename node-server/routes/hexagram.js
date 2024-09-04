const express = require("express");
const { lookupHexagrams, lookupHexagram } = require("../models/hexagram");

const hexagramRouter = express.Router();

hexagramRouter.route("/:hex1/:hex2")
    .get(async (req, res, next) => {
        let result = await lookupHexagrams(req.params.hex1, req.params.hex2);
        res.status(result.status).json(result.data);
    })


hexagramRouter.route("/:hex1")
    .get(async (req, res, next) => {
        let result = await lookupHexagram(req.params.hex1);
        res.status(result.status).json(result.data);
    })



module.exports = hexagramRouter;