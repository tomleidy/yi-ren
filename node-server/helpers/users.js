const User = require('../models/user');


const userCanSet = new Set(["password", "firstName", "lastName", "dateOfBirth", "profilePicture", "address", "phoneNumber"])


async function userLogin(username, password) {
    let incorrectUsernameOrPasswordObject = { status: 403, data: "Incorrect username / password" }
    try {
        const dbuser = await User.findOne({ username }, { username: 1, password: 1 })
        if (!dbuser) { return incorrectUsernameOrPasswordObject }
        const passwordMatches = await bcrypt.compare(password, dbuser.password);
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

module.exports = { userCreate, userLogin };