const { deleteReference } = require("../helpers/references")
const { forbiddenKeys } = require("./00_helpers_references_testConstants")


// move to preparation module when done
require('dotenv').config();
const { User } = require("../models/user");
const { createReference } = require("./references");
const leggeData = require('../../legge.js');

if (process.env.TEST_ENV === "true") {
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;
    const email = process.env.TEST_EMAIL;
    createLeggeReference();

} else {
    User.findOneAndDelete({ username });
    // need to block this username from being used in production. Wait, is this even needed? The database is going to start from scratch anyway.
}

async function createTestAdmin() {
    try {
        let exists = await User.findOne({ username });
        if (exists) {
            console.log("createTestAdmin: username already exists");
            return;
        }
        console.log("createTestAdmin: username doesn't exist, attempting to create");
        let result = await new User({ username, password, email, admin: true });
        await result.save();
        if (result) {
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




// TBC deleteReference(userId, {title, titleId})
// returns { status: 200, data: "n entries deleted"}

let titleId = "";

beforeEach()
describe("test removeServerSideKeys for any:", () => {
    for (let key of forbiddenKeys) {
        let _doc = {
            name: "test",
            [key]: "any value",
            arr: [{ [key]: "some other value" }]
        };
        test(`removeServerSideKeys() should remove keys named ${key} from an object`, () => {
            let expected = JSON.stringify({ name: "test", arr: [{}] });
            let result = JSON.stringify(removeServerSideKeys(_doc));
            expect(result).toBe(expected);
        })
    }
});
