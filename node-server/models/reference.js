const mongoose = require('mongoose');


const referenceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    titleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Title', required: true },
    kingwen: { type: Number, required: true, ref: "Hexagram" },
    public: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedPermanent: { type: Boolean, default: false },
    columns: { type: Object, required: true }
});






const Reference = mongoose.model('Reference', referenceSchema);

module.exports = { Reference };