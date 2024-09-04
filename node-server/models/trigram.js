const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trigramSchema = new Schema({
    "binary": { type: String, immutable: true, index: true },
    "fu xi": { type: Number, immutable: true },
    "king wen": { type: Number, immutable: true },
    "hanzi": { type: String, immutable: true },
    "pinyin": { type: String, immutable: true },
    "unicode": { type: String, immutable: true },
    "english": { type: String, immutable: true }
})
