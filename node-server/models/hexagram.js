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
HexagramSchema.index({ "lowerBinary": 1, "upperBinary": 1 });

const Hexagram = mongoose.model("Hexagram", HexagramSchema)



let queryLowerTrigram = { from: 'trigrams', localField: 'lowerBinary', foreignField: 'binary', as: 'lowerTrigram' }
let queryUpperTrigram = { from: 'trigrams', localField: 'upperBinary', foreignField: 'binary', as: 'upperTrigram' }
let queryOmit = {
    "lowerTrigram._id": 0, "upperTrigram._id": 0, "_id": 0,
    "lowerTrigram.binary": 0, "upperTrigram.binary": 0
}

async function lookupHexagrams(hex1, hex2) {
    let searchPath = hexagramIndexType(hex1);
    let searchPath2 = hexagramIndexType(hex2);
    if (searchPath != searchPath2) return { status: 400, data: "Hexagram Lookup Method Mismatch" };
    let queryDoc = {};
    switch (searchPath) {
        case "binary":
            queryDoc = {
                $or: [
                    { lowerBinary: hex1.substring(0, 3), upperBinary: hex1.substring(3, 6) },
                    { lowerBinary: hex2.substring(0, 3), upperBinary: hex2.substring(3, 6) }
                ]
            }
            //queryDoc = { $match: queryDoc };
            break;
        case "king wen":
            queryDoc = { "king wen": { $in: [Number(hex1), Number(hex2)] } };
            break;
        default:
            return { status: 400, data: "Invalid hexagram request" };
    }
    try {
        const hexagrams = await Hexagram.aggregate(
            [
                { $match: queryDoc },
                { $lookup: queryLowerTrigram },
                { $lookup: queryUpperTrigram },
                { $unwind: { path: '$lowerTrigram', preserveNullAndEmptyArrays: true } },
                { $unwind: { path: '$upperTrigram', preserveNullAndEmptyArrays: true } },
                { $project: queryOmit }
            ])
        if (!hexagrams || hexagrams.length === 0) {
            return { status: 404, data: "Hexagrams not found, where did they go?" };
        }
        // reorder the results if the order doesn't match the query
        if (hexagrams[0][searchPath] == hex2) {
            hexagrams.push(hexagrams.shift());
        }
        return { status: 200, data: hexagrams };
    }
    catch (err) {
        return { status: 500, data: err }
    }
};

async function lookupHexagram(hex1) {
    let searchPath = hexagramIndexType(hex1);
    let queryDoc = {}
    switch (searchPath) {
        case "binary":
            queryDoc.lowerBinary = hex1.substring(0, 3);
            queryDoc.upperBinary = hex1.substring(3, 6);
            break;
        case "king wen":
            queryDoc["king wen"] = Number(hex1);
            break;
        default:
            return { status: 400, data: "Invalid hexagram request" }
    }
    try {

        const hexagram = await Hexagram.aggregate([
            { $match: queryDoc },
            { $lookup: queryLowerTrigram },
            { $lookup: queryUpperTrigram },
            { $unwind: { path: '$lowerTrigram', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$upperTrigram', preserveNullAndEmptyArrays: true } },
            { $project: queryOmit }
        ])
        if (!hexagram) {
            return { status: 404, data: "Hexagram not found, where did it go?" };
        }
        return { status: 200, data: hexagram };
    }
    catch (err) {
        return ({ status: 500, data: err });
    }
}
function hexagramIndexType(paramsHex) {
    if (/^([1-9]|[1-5][0-9]|6[0-4])$/.test(paramsHex)) {
        return "king wen";
    } else if (/^[01]{6}$/.test(paramsHex)) {
        return "binary";
    }
    return false;
}



module.exports = { Hexagram, lookupHexagrams, lookupHexagram };