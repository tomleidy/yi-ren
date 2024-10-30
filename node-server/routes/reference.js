const express = require("express");
const createReference = require("../models/reference");
const { Reference } = require("../models/reference");
const { getReferences } = require("../helpers/references");

const referenceRouter = express.Router();


referenceRouter.route("/").get(async (req, res, next) => {
    let result = await Reference.find()
    if (result) res.status(200).json(result);
    //let result = await createReference(req.body);
    //res.status(result.status).json(result.data);
});

referenceRouter.route("/:hexagram").get(async (req, res, next) => {
    let result = await getReferences(null, [req.params.hexagram]);
    if (result) res.status(200).json(result);
});

referenceRouter.route("/:hexagram1/:hexagram2").get(async (req, res, next) => {
    let result = await getReferences(null, [req.params.hexagram1, req.params.hexagram2]);
    if (result) res.status(200).json(result);
});


module.exports = referenceRouter;