const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getHexagramNumber, validateHexagramString } = require('../helpers/hexagrams')


const HexagramSchema = new Schema({
    "binary": { type: String, immutable: true },
    "kingwen": { type: Number, immutable: true, index: true },
    "hanzi": { type: String, immutable: true },
    "pinyin": { type: String, immutable: true },
    "unicode": { type: String, immutable: true }
})

const Hexagram = mongoose.model("Hexagram", HexagramSchema)
let queryOmit = { _id: 0 }

async function lookupHexagrams(hex1, hex2) {
    let lookup1 = getHexagramNumber(hex1);
    let lookup2 = getHexagramNumber(hex2);
    if (!lookup1 || !lookup2) {
        return { status: 400, data: "Invalid hexagram request" };
    }
    let queryDoc = { "kingwen": { $in: [lookup1, lookup2] } };

    try {
        const hexagrams = await Hexagram.find(queryDoc, queryOmit)
        if (!hexagrams || hexagrams.length === 0) {
            return { status: 404, data: "Hexagrams not found, where did they go?" };
        }
        // reorder the results if the order doesn't match the query
        if (hexagrams[0]["kingwen"] == lookup2) {
            hexagrams.push(hexagrams.shift());
        }
        return { status: 200, data: hexagrams };
    }
    catch (err) {
        return { status: 500, data: err }
    }
};

async function lookupHexagram(hex1) {
    if (!validateHexagramString(hex1)) {
        return { status: 400, data: "Invalid hexagram request" }
    }
    let queryDoc = { "kingwen": getHexagramNumber(hex1) };
    try {
        const hexagram = await Hexagram.find(queryDoc, queryOmit)
        if (!hexagram) {
            return { status: 404, data: "Hexagram not found, where did it go?" };
        }
        return { status: 200, data: hexagram };
    }
    catch (err) {
        return ({ status: 500, data: err });
    }
}







module.exports = { Hexagram, lookupHexagrams, lookupHexagram };