const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, HTTP_STATUS, ALLOWED_USER_UPDATE_FIELDS } = require('../constants');

class UserHelper {
    static async hashPassword(password) {
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    static async comparePasswords(plaintext, hashed) {
        return bcrypt.compare(plaintext, hashed);
    }

    static async createUser(userData, isAdmin = false) {
        const { username, email, password } = userData;

        try {
            const hashedPassword = await this.hashPassword(password);
            const user = new User({
                username,
                email,
                password: hashedPassword,
                admin: process.env.TEST_ENV === "true" && isAdmin
            });

            const savedUser = await user.save();
            return {
                status: HTTP_STATUS.CREATED,
                data: savedUser
            };
        } catch (err) {
            if (err.code === 11000) {
                const field = Object.keys(err.keyPattern)[0];
                return {
                    status: HTTP_STATUS.CONFLICT,
                    data: [`${field} already in use`]
                };
            }
            return {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                data: err
            };
        }
    }

    static async updateUserPassword(username, oldPassword, newPassword) {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return {
                    status: HTTP_STATUS.NOT_FOUND,
                    data: "User not found"
                };
            }

            const passwordMatches = await this.comparePasswords(oldPassword, user.password);
            if (!passwordMatches) {
                return {
                    status: HTTP_STATUS.FORBIDDEN,
                    data: "Incorrect password"
                };
            }

            const hashedPassword = await this.hashPassword(newPassword);
            const updatedUser = await User.findOneAndUpdate(
                { username },
                { password: hashedPassword },
                { new: true }
            );

            return {
                status: HTTP_STATUS.OK,
                data: updatedUser
            };
        } catch (err) {
            return {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                data: "Internal server error"
            };
        }
    }

    static async updateUserProfile(username, password, updates) {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return {
                    status: HTTP_STATUS.NOT_FOUND,
                    data: "User not found"
                };
            }

            const passwordMatches = await this.comparePasswords(password, user.password);
            if (!passwordMatches) {
                return {
                    status: HTTP_STATUS.FORBIDDEN,
                    data: "Incorrect password"
                };
            }

            // Filter updates to only allowed fields
            const filteredUpdates = Object.keys(updates)
                .filter(key => ALLOWED_USER_UPDATE_FIELDS.has(key))
                .reduce((obj, key) => {
                    obj[key] = updates[key];
                    return obj;
                }, {});

            const updatedUser = await User.findOneAndUpdate(
                { username },
                filteredUpdates,
                { new: true }
            );

            return {
                status: HTTP_STATUS.OK,
                data: updatedUser
            };
        } catch (err) {
            return {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                data: "Internal server error"
            };
        }
    }
}

module.exports = {
    userCreate: UserHelper.createUser.bind(UserHelper),
    userUpdatePassword: UserHelper.updateUserPassword.bind(UserHelper),
    userUpdate: UserHelper.updateUserProfile.bind(UserHelper)
};