const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hexagramSchema = new Schema({
    "binary": { type: String, immutable: true, index: true },
    "king wen": { type: Number, immutable: true, index: true },
    "hanzi": { type: String, immutable: true },
    "pinyin": { type: String, immutable: true },
    "unicode": { type: String, immutable: true },
})


const Hexagram = mongoose.model("Hexagram", hexagramSchema)

module.exports = Hexagram;