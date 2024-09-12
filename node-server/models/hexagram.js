const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TrigramSchema = require('./trigram');

const HexagramSchema = new Schema({
    "lowerBinary": { type: String, immutable: true },
    "upperBinary": { type: String, immutable: true },
    "king wen": { type: Number, immutable: true, index: true },
    "hanzi": { type: String, immutable: true },
    "pinyin": { type: String, immutable: true },
    "unicode": { type: String, immutable: true },
    "lowerTrigram": { type: Schema.Types.ObjectId, ref: 'Trigram', immutable: true },
    "upperTrigram": { type: Schema.Types.ObjectId, ref: 'Trigram', immutable: true }

})

HexagramSchema.index({ "king wen": 1 });

const Hexagram = mongoose.model("Hexagram", HexagramSchema)

let queryOmit = {
    "lowerTrigram._id": 0, "upperTrigram._id": 0, "_id": 0,
    "lowerTrigram.binary": 0, "upperTrigram.binary": 0
}


async function lookupHexagrams(hex1, hex2) {
    let lookup1 = getHexagramNumber(hex1);
    let lookup2 = getHexagramNumber(hex2);
    if (!lookup1 || !lookup2) {
        return { status: 400, data: "Invalid hexagram request" };
    }
    let queryDoc = { "king wen": { $in: [lookup1, lookup2] } };

    try {
        const hexagrams = await Hexagram.find(queryDoc, queryOmit)
        if (!hexagrams || hexagrams.length === 0) {
            return { status: 404, data: "Hexagrams not found, where did they go?" };
        }
        // reorder the results if the order doesn't match the query
        if (hexagrams[0]["king wen"] == lookup2) {
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
    let queryDoc = { "king wen": getHexagramNumber(hex1) };
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


const binaryToHexagram = { "111111": 1, "000000": 2, "100010": 3, "010001": 4, "111010": 5, "010111": 6, "010000": 7, "000010": 8, "111011": 9, "110111": 10, "111000": 11, "000111": 12, "101111": 13, "111101": 14, "001000": 15, "000100": 16, "100110": 17, "011001": 18, "110000": 19, "000011": 20, "100101": 21, "101001": 22, "000001": 23, "100000": 24, "100111": 25, "111001": 26, "100001": 27, "011110": 28, "010010": 29, "101101": 30, "001110": 31, "011100": 32, "001111": 33, "111100": 34, "000101": 35, "101000": 36, "101011": 37, "110101": 38, "001010": 39, "010100": 40, "110001": 41, "100011": 42, "111110": 43, "011111": 44, "000110": 45, "011000": 46, "010110": 47, "011010": 48, "101110": 49, "011101": 50, "100100": 51, "001001": 52, "001011": 53, "110100": 54, "101100": 55, "001101": 56, "011011": 57, "110110": 58, "010011": 59, "110010": 60, "110011": 61, "001100": 62, "101010": 63, "010101": 64 }


function getHexagramNumber(hexParameter) {
    if (/^([1-9]|[1-5][0-9]|6[0-4])$/.test(hexParameter)) {
        return Number(hexParameter);
    }
    if (/^[01]{6}$/.test(hexParameter)) {
        return binaryToHexagram[hexParameter];
    }
    return false;
}


function validateHexagramString(hexParameter) {
    // compare hex string paramter to only valid formats for
    if (/^([1-9]|[1-5][0-9]|6[0-4])$/.test(hexParameter)) return true;
    if (/^[01]{6}$/.test(hexParameter)) return true;
    return false;
}




module.exports = { Hexagram, lookupHexagrams, lookupHexagram };