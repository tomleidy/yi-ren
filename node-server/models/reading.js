const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { lookupHexagrams, Hexagram } = require('./hexagram');
const Schema = mongoose.Schema;

const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

const baseQuery = {
    deletedAt: {
        $or: [{ $gt: thirtyDaysAgo }, { $eq: null }],
    },
    deletedPermanent: false
}

transformDelete = ["id", "deletedPermanent", "__v", "userId"]
const transformHandler = (doc, ret) => {
    transformDelete.forEach(key => { delete ret[key]; });
}

const readingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User._id', index: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedPermanent: { type: Boolean, default: false },
    topic: { type: String, default: "" },
    notes: { type: String, default: "" },
    hexagram1: { type: Number, required: true, ref: 'Hexagram' },
    hexagram2: { type: Number, default: null, ref: 'Hexagram' },
}, {
    timestamps: true,
    id: false,
    toJSON: { virtuals: true, transform: transformHandler },
    toObject: { virtuals: true, transform: transformHandler }
})

readingSchema.post('save', function (doc, next) {
    Promise.all([
        doc.populate({ path: 'hexagram1' }),
        doc.populate({ path: 'hexagram2' })
    ])
        .then(() => next())
        .catch(err => next(err));
});



readingSchema.pre('findOneAndUpdate', function () {
    const update = this.getUpdate();
    if (update.__v != null) {
        delete update.__v;
    }
    const keys = ['$set', '$setOnInsert'];
    for (const key of keys) {
        if (update[key] != null && update[key].__v != null) {
            delete update[key].__v;
            if (Object.keys(update[key]).length === 0) {
                delete update[key];
            }
        }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
});

async function readingCreate(readingInfo) {
    let { hexagram1, hexagram2, topic, _id } = readingInfo;
    hexagram1 = parseInt(hexagram1, 10);
    if (hexagram2) {
        hexagram2 = parseInt(hexagram2, 10);
    }
    try {
        const reading = new Reading({ userId: _id, hexagram1, hexagram2, topic });
        let result = await reading.save();
        return { status: 201, data: result };
    }
    catch (err) {
        console.log("readingCreate error:", err);
        return { status: 500, data: "server error" };
    }
}
let externalUpdateFields = {
    "deleted": 1, "deletedAt": 1,
    "topic": 1, "notes": 1,
    "createdAt": 1, "updatedAt": 1
}

async function readingList(readingInfo) {
    const { _id } = readingInfo;
    try {
        let reading = await Reading.find({ userId: _id, ...baseQuery });
        return { status: 200, data: reading }
    }
    catch (err) {
        console.log("models/reading.js/readingList:", err);
        return { status: 500, data: "unknown error" };
    }
}

async function readingGet(readingInfo) {
    const { userId, readingId } = readingInfo;
    try {
        let reading = await Reading.findOne({ userId, _id: readingId, ...baseQuery });
        return { status: 200, data: reading }
    }
    catch (err) {
        console.log("models/reading.js/readingGet:", err);
        return { status: 500, data: "unknown error" };
    }
}

async function readingUpdate(readingInfo) {
    let updateObject = {};
    if (!"readingId" in readingInfo || !"userId" in readingInfo) {
        return { status: 403, data: "not authorized" };
    }
    const { userId, readingId } = readingInfo;
    for (let key of Object.keys(readingInfo)) {
        if (key in externalUpdateFields) {
            updateObject[key] = readingInfo[key];
        }
    }
    if (Object.keys(updateObject).length === 0) {
        return { status: 304, data: "Not modified" }
    }
    try {
        let reading = await Reading.findOneAndUpdate(
            { userId, _id: readingId, ...baseQuery },
            updateObject,
            { new: true }
        );
        if (!reading) {
            return { status: 500, data: "unknown error" };
        }
        return { status: 200, data: reading };
    }
    catch (err) {
        console.log("models/reading.js/readingUpdate:", err);
        return { status: 500, data: "unknown error" };
    }
}


async function readingDelete(readingInfo) {
    if (!"readingId" in readingInfo || !"userId" in readingInfo) {
        return { status: 403, data: "not authorized" };
    }
    let deleteObject = { deleted: true, deletedAt: new Date().toISOString() };
    if (readingInfo.deletedPermanent) {
        deleteObject.deletedPermanent = true;
    }
    if (readingInfo.undelete) {
        deleteObject = { deleted: false, deletedAt: null, deletedPermanent: false };
    }
    const { userId, readingId } = readingInfo;
    try {
        let reading = await Reading.findOneAndUpdate(
            { userId, _id: readingId, ...baseQuery },
            deleteObject,
            { new: true }
        );
        if (!reading) {
            return { status: 500, data: "unknown error" };
        }
        return { status: 200, data: reading };
    }
    catch (err) {
        console.log("models/reading.js/readingDelete:", err);
        return { status: 500, data: "unknown error" };
    }
}


const Reading = mongoose.model('Reading', readingSchema);
readingSchema.plugin(passportLocalMongoose);

module.exports = {
    Reading,
    readingCreate,
    readingList,
    readingGet,
    readingUpdate,
    readingDelete
};