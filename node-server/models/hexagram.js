const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getHexagramNumber, isValidHexagramString } = require('../helpers/hexagrams');

const hexagramSchema = new Schema({
    "_id": { type: Number, immutable: true },
    "binary": { type: String, immutable: true },
    "hanzi": { type: String, immutable: true },
    "pinyin": { type: String, immutable: true },
    "unicode": { type: String, immutable: true }
})

const Hexagram = mongoose.model("Hexagram", hexagramSchema)

hexagramSchema.virtual('references', {
    ref: 'Reference',
    localField: '_id',
    foreignField: 'kingwen',
    justOne: false,
    options: { select: "titleId userId kingwen columns" }
})

const response400InvalidRequest = { status: 400, data: "Invalid hexagram request" };
const response404Hexagram = { status: 404, data: "Hexagram not found, where did it go?" };
const response500ServerError = { status: 500, data: "Server error, please try again later" };


async function lookupHexagrams(hex1, hex2 = 0, userId = null) {
    let lookup = [getHexagramNumber(hex1), getHexagramNumber(hex2)]
    lookup = lookup.filter(hex => hex);
    // remove duplicates from lookup array
    lookup = lookup.filter((hex, index) => lookup.indexOf(hex) === index);
    if (lookup.length === 0) return response400InvalidRequest;

    let queryDoc = { "_id": { $in: lookup } };
    let orMatch = [{ publicReference: true }];
    if (userId) {
        orMatch.push({ userId: userId });
    }
    let matchObject = {
        path: 'references',
        select: "titleId userId kingwen columns",
        match: {
            $or: orMatch
        }
    };

    try {
        console.log("attempting to find hexagrams", lookup, matchObject);
        const hexagrams = await Hexagram.find(queryDoc)
            .populate(matchObject)
            .lean()
            .exec();
        if (!hexagrams || hexagrams.length === 0) return response404Hexagram;
        console.log("hexagrams", hexagrams);
        // reorder the results if the order doesn't match the query
        if (lookup.length > 1 && hexagrams[0]["_id"] == lookup[1]) {
            hexagrams.push(hexagrams.shift());
        }
        return { status: 200, data: hexagrams };
    }
    catch (err) {
        console.log("Error in lookupHexagrams:", err);
        return response500ServerError;
    }
};


module.exports = { Hexagram, lookupHexagrams };