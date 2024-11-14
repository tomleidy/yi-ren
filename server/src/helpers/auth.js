const bcrypt = require('bcrypt');
const { HTTP_STATUS } = require('../constants');

class AuthHelper {
    static async validatePassword(user, password) {
        if (!user) {
            return {
                success: false,
                status: HTTP_STATUS.UNAUTHORIZED,
                message: "Incorrect username or password"
            };
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return {
                success: false,
                status: HTTP_STATUS.UNAUTHORIZED,
                message: "Incorrect username or password"
            };
        }

        return {
            success: true,
            status: HTTP_STATUS.OK,
            user
        };
    }
}

module.exports = AuthHelper;