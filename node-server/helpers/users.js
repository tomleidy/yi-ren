require("dotenv").config();
const { User, userCreate } = require("../models/user");

let dummyUserBody = { username: "dummyuser202409", password: "dummy password", email: "dummy@dummy.org", admin: true };
User.findOneAndDelete({ username: dummyUserBody.username });
if (process.env.TEST_ENV === "true") {
    createDummy();
}

async function createDummy() {
    try {
        await User.findOneAndDelete({ username: dummyUserBody.username });

        let result = await userCreate(dummyUserBody);
        if (result) {
            console.log(dummyUserBody);
            console.log(`createDummy "${dummyUserBody.username}", "${dummyUserBody.password}" successful:`, result);
        }
    }
    catch (err) {
        console.log("createDummy error:", err);
    }
}

module.export = createDummy;