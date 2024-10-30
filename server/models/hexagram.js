const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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



module.exports = { Hexagram };