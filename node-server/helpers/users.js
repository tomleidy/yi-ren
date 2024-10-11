const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const userCanUpdate = new Set(["firstName", "lastName", "dateOfBirth", "profilePicture", "address", "phoneNumber"])

function getUserUpdateObject(body) {
    let updatedUser = {};
    for (let key in body) {
        if (userCanUpdate.has(key)) {
            updatedUser[key] = body[key];
        }
    }
    return updatedUser;
}

const getUserAndPassword = async (username) => await User.findOne({ username }, { username: 1, password: 1 });

const getUserForUpdate = async (username) => await User.findOne({ username }, { username: 1, email: 1, firstName: 1, lastName: 1, dateOfBirth: 1, profilePicture: 1, address: 1, phoneNumber: 1, password: 1 });


async function userLogin(username, password) {
    let incorrectUsernameOrPasswordObject = { status: 403, data: "Incorrect username / password" }
    try {
        const user = await getUserAndPassword(username);
        if (!user) { return incorrectUsernameOrPasswordObject }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (passwordMatches) { return { status: 200, data: "Successfully logged in!" } }
        return incorrectUsernameOrPasswordObject;
    }
    catch (err) {
        return { status: 500, data: err }
    }
}

async function userCreate(body) {
    const { username, email, password } = body;
    try {
        let hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        const result = await user.save();
        return { status: 201, data: result };
    }
    catch (err) {
        if (err.code === 11000) {
            if ("email" in err.keyPattern) {
                return { status: 409, data: ["email address " + email + " already in use"] }
            }
            if ("username" in err.keyPattern) {
                return { status: 409, data: ["username " + username + " already in use"] }
            }
        }
        return { status: 500, data: err };
    }
}

async function userUpdatePassword(body) {
    const { username, oldPassword, newPassword } = body;
    try {
        const user = await getUserAndPassword(username);
        if (!user) { return { status: 404, data: "User not found" } }
        const passwordMatches = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatches) { return { status: 403, data: "Incorrect password" } }
        const password = await bcrypt.hash(newPassword, saltRounds);
        const result = await User.findOneAndUpdate({ username }, { password }, { new: true });
        return { status: 200, data: result };
    }
    catch (err) {
        console.log(err);
        return { status: 500, data: "Internal server error" };
    }
}

async function userUpdate(body) {
    const { username, password } = body;
    try {
        const user = await getUserForUpdate(username);
        if (!user) { return { status: 404, data: "User not found" } }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) { return { status: 403, data: "Incorrect password" } }
        const updatedUser = getUserUpdateObject(body);
        const result = await User.findOneAndUpdate({ username }, updatedUser, { new: true });
        return { status: 200, data: result };
    }
    catch (err) {
        console.log(err);
        return { status: 500, data: "Internal server error" };
    }
}

module.exports = { userCreate, userLogin };