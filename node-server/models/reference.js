const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { User } = require('./user');

const leggeData = require('../../legge.js');

const titleSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, default: null },
    translator: { type: String, default: null },
    year: { type: Number, default: null },
    kingwenField: { type: String, default: null },
    columnOrder: { type: [String], default: null },
});
const Title = mongoose.model('Title', titleSchema);

const referenceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    titleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Title', required: true },
    kingwen: { type: Number, required: true, ref: "Hexagram" },
    public: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedPermanent: { type: Boolean, default: false },
    columns: { type: Object, required: true }
});


async function createTitle(title) {
    let check;
    check = await Title.findOne({ title: title.title });
    if (!check) {
        let newTitle = new Title(title);
        let result = await newTitle.save();
        console.log("Title info added to titles:", result);
        return result._id;
    }
    return check._id;
}

async function createReference(userId, { title, content }, public = false) {
    console.log("createReference called");


    let check;
    let titleId = await createTitle(title);
    console.log("titleId:", titleId);
    check = await Reference.find({ titleId });
    console.log("check:", check);
    if (!check || check.length === 0) {
        console.log(`Attempting to add reference ${title.title} to database`);
        let reference = formatReferenceDocuments(userId, titleId, { title, content }, public);
        let result = await Reference.insertMany(reference);
        console.log("Reference info added to references:", result);

    }
    return check
}




function formatReferenceDocuments(userId, titleId, { title, content }, public = false) {
    let result = content.map(column => {
        let kingwen = column[title.kingwenField];
        delete column[title.kingwenField];
        let hexObject = {
            userId,
            titleId,
            kingwen,
            public,
            columns: column
        }
        return hexObject
    })
    return result;
}

async function testAddSource() {
    console.log("testAddSource called");
    try {

        let admin = await User.findOne({ admin: true });

        if (!admin) {
            console.log("testAddSource admin missing, what?");
            return
        }
        let adminId = admin._id;
        let result = await createReference(adminId, leggeData, true);
        console.log("result:", result);
    }
    catch (err) {
        console.log("testAddSource error:", err);
    }

}
setTimeout(() => {
    testAddSource();
}, 2000);



const Reference = mongoose.model('Reference', referenceSchema);
console.log("attempting to add legge data to database");

module.exports = { Reference, createReference };