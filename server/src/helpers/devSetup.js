require('dotenv').config();
const { User } = require("../models/user");
const { userCreate } = require('./users.js');

const getTestUserObject = () => ({
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    email: process.env.TEST_EMAIL
});

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

if (process.env.TEST_ENV === "true") {
    createTestAdmin();
} else {
    // need to block this username from being used in production
    User.findOneAndDelete({ username: process.env.TEST_USERNAME });
}

module.exports = { createTestAdmin };