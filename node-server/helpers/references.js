const { Reference } = require("../models/reference");
const { Title } = require("../models/title");

const forbiddenKeys = new Set(["id", "_id", "public", "__v"])
const removeServerSideKeysReviver = (k, v) => forbiddenKeys.has(k) ? undefined : v
const removeServerSideKeys = (obj) => JSON.parse(JSON.stringify(obj, removeServerSideKeysReviver));


async function createTitle(title) {
    let check;
    check = await Title.findOne({ title: title.title, userId: title.userId });
    if (!check) {
        let newTitle = new Title(title);
        let result = await newTitle.save();
        console.log("Title info added to titles:", result);
        return result._id;
    }
    return check._id;
}


async function createReference(userId, { title, content }, publicReference = false) {
    console.log("createReference called");
    let check;
    let titleId = await createTitle({ ...title, userId });
    check = await Reference.find({ titleId });
    if (!check || check.length === 0) {
        console.log(`Attempting to add reference ${title.title} to database`);
        let reference = formatReferenceDocuments({ userId, titleId, title, content }, publicReference);
        let result = await Reference.insertMany(reference);
        console.log(`Reference info for ${title} added to references`);
        return result;
    }
    console.log("createReference reference exists:", title.title);
    return check;
}

async function getReferences(userId, hexagrams) {
    // use mongodb to search for references where kingwen is in hexagrams and populate titleId
    let result = await Reference.find({ kingwen: { $in: hexagrams } }).populate("titleId");
    if (result) {
        return result;
    }
    return [];
}

function formatReferenceDocuments({ userId, titleId, title, content }, publicReference = false) {
    let result = content.map(column => {
        let kingwen = column[title.kingwenField];
        delete column[title.kingwenField];
        let hexObject = {
            userId,
            titleId,
            kingwen,
            publicReference,
            columns: column
        }
        return hexObject
    })
    return result;
}

module.exports = { createReference, createTitle, formatReferenceDocuments, removeServerSideKeys, getReferences };