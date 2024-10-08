const express = require("express");
const createReference = require("../models/reference");
const { Reference } = require("../models/reference");

const referenceRouter = express.Router();


referenceRouter.route("/").get(async (req, res, next) => {
    let result = await Reference.find()
    if (result) res.status(200).json(result);
    //let result = await createReference(req.body);
    //res.status(result.status).json(result.data);
});


module.exports = referenceRouter;