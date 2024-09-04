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

module.exports = Hexagram;