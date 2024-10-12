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

const response400InvalidRequest = { status: 400, data: "Invalid hexagram request" };
const response404Hexagram = { status: 404, data: "Hexagram not found, where did it go?" };
const response500ServerError = { status: 500, data: "Server error, please try again later" };


async function lookupHexagrams(hex1, hex2 = 0) {
    let lookup = [getHexagramNumber(hex1), getHexagramNumber(hex2)]
    lookup = lookup.filter(hex => hex);
    if (lookup.length === 0) return response400InvalidRequest;

    let queryDoc = { "_id": { $in: lookup } };
        const hexagrams = await Hexagram.find(queryDoc)
        if (!hexagrams || hexagrams.length === 0) return response404Hexagram;
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