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
    check = await Reference.find({ titleId });
    if (!check || check.length === 0) {
        console.log(`Attempting to add reference ${title.title} to database`);
        let reference = formatReferenceDocuments(userId, titleId, { title, content }, public);
        let result = await Reference.insertMany(reference);
        console.log("Reference info added to references:", result.title);
    }
    console.log("createReference reference exists:", title.title);
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




const Reference = mongoose.model('Reference', referenceSchema);
console.log("attempting to add legge data to database");

module.exports = { Reference, createReference };