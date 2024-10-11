const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getHexagramNumber, isValidHexagramString } = require('../helpers/hexagrams');


const HexagramSchema = new Schema({
    "_id": { type: Number, immutable: true },
    "binary": { type: String, immutable: true },
    "hanzi": { type: String, immutable: true },
    "pinyin": { type: String, immutable: true },
    "unicode": { type: String, immutable: true }
})

const Hexagram = mongoose.model("Hexagram", HexagramSchema)

const response400InvalidRequest = { status: 400, data: "Invalid hexagram request" };
const response404Hexagram = { status: 404, data: "Hexagram not found, where did it go?" };
const response500ServerError = { status: 500, data: "Server error, please try again later" };

let queryOmit = {}

async function lookupHexagrams(hex1, hex2) {
    let lookup1 = getHexagramNumber(hex1);
    let lookup2 = getHexagramNumber(hex2);
    if (!lookup1 || !lookup2) return response400InvalidRequest;

    let queryDoc = { "_id": { $in: [lookup1, lookup2] } };

    try {
        const hexagrams = await Hexagram.find(queryDoc, queryOmit)
        if (!hexagrams || hexagrams.length === 0) return response404Hexagram;
        // reorder the results if the order doesn't match the query
        if (hexagrams[0]["_id"] == lookup2) {
            hexagrams.push(hexagrams.shift());
        }
        return { status: 200, data: hexagrams };
    }
    catch (err) {
        console.log("Error in lookupHexagrams:", err);
        return response500ServerError;
    }
};

async function lookupHexagram(hex1) {
    if (!isValidHexagramString(hex1)) return response400InvalidRequest;

    let queryDoc = { "_id": getHexagramNumber(hex1) };
    try {
        const hexagram = await Hexagram.find(queryDoc, queryOmit)
        if (!hexagram) {
            return response404Hexagram;
        }
        return { status: 200, data: hexagram };
    }
    catch (err) {
        console.log("Error in lookupHexagram:", err);
        return response500ServerError;
    }
}

module.exports = { Hexagram, lookupHexagrams, lookupHexagram };