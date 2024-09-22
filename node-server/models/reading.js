const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { lookupHexagrams, Hexagram } = require('./hexagram');
const Schema = mongoose.Schema;

const readingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User._id' },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedPermanent: { type: Boolean, default: false },
    topic: { type: String, default: "" },
    notes: { type: String, default: "" },
    hexagram1: { type: Number, default: 0, required: true, ref: 'Hexagram.kingwen' },
    hexagram2: { type: Number, default: null, }
}, { timestamps: true })

const userCanEdit = new Set(["deleted", "topic", "notes", "topic"])

async function readingCreate(readingInfo) {
    const { hexagram1, hexagram2, topic, _id } = readingInfo;
    try {
        let hexLookup = {};
        hexLookup = await lookupHexagrams(hexagram1, hexagram2 ? hexagram2 : hexagram1);
        // need to figure out how to use populate for hexagram details.
        // will probably have to create two new keys.
        // wondering if this will be the stepping stone to pulling up information from Yijing sources
        console.log(hexLookup.data)
        const reading = new Reading({
            userId: _id,
            hexagram1,
            hexagram2,
            topic
        });

        let result = await reading.save();
        result = JSON.parse(JSON.stringify(result));
        if (hexLookup.status === 200) { result.hexagrams = hexLookup.data; }

        return { status: 201, data: result };
    }
    catch (err) {
        console.log("readingCreate error:", err);
        return { status: 500, data: "server error" };
    }
}

const Reading = mongoose.model('Reading', readingSchema);
readingSchema.plugin(passportLocalMongoose);

module.exports = { Reading, readingCreate };