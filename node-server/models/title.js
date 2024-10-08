const mongoose = require('mongoose');


const titleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    author: { type: String, default: null },
    translator: { type: String, default: null },
    year: { type: Number, default: null },
    kingwenField: { type: String, default: null },
    columnOrder: { type: [String], default: null },
});
const Title = mongoose.model('Title', titleSchema);


module.exports = { Title };