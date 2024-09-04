const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hexagramSchema = new Schema({
    "binary": { type: String, immutable: true },
    "king wen": { type: String, immutable: true },
    "hanzi": { type: String, immutable: true },
    "pinyin": { type: String, immutable: true },
    "unicode": { type: String, immutable: true },
})
