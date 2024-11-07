require('dotenv').config();
const { User } = require("../models/user");
const { createReference } = require("./references");
const leggeData = require('./legge.js');
const { userCreate } = require('./users.js');

const getTestUserObject = () => ({ username: process.env.TEST_USERNAME, password: process.env.TEST_PASSWORD, email: process.env.TEST_EMAIL });

if (process.env.TEST_ENV === "true") {

    createLeggeReference();

} else {
    User.findOneAndDelete({ username });
    // need to block this username from being used in production. Wait, is this even needed? The database is going to start from scratch anyway.
}

async function createTestAdmin() {
    const { username, password, email } = getTestUserObject();
    console.log(`createTestAdmin: ${username}, ${password}, ${email}`);
    try {
        let exists = await User.findOne({ username });
        if (exists) {
            console.log("createTestAdmin: username already exists");
            return;
        }
        console.log("createTestAdmin: username doesn't exist, attempting to create");
        let result = await userCreate({ username, password, email }, admin = true);
        console.log("createTestAdmin result:", result);
        if (result.status === 201) {
            console.log(`createTestAdmin success, ${username}, ${password}, ${email}`);
            return result;
        }
    }
    catch (err) {
        console.log("createDummy error:", err);
    }
}


async function createLeggeReference() {
    console.log("attempting to create Legge reference");
    try {
        let admin = await User.findOne({ admin: true });
        if (!admin) {
            console.log("missing admin user, attempting to create...");
            admin = await createTestAdmin();
            return
        }
        let adminId = admin._id;
        let result = await createReference(adminId, leggeData, true);
        console.log("Legge result.length:", result.length);
    }
    catch (err) {
        console.log("createLeggeReference error:", err);
    }

}


module.export = { createLeggeReference };