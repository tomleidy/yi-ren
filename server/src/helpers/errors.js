const { HTTP_STATUS } = require('../constants');

class AppError extends Error {
    constructor(message, statusCode, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}

class ErrorHelper {
    static badRequest(message, details = null) {
        return new AppError(message, HTTP_STATUS.BAD_REQUEST, details);
    }

    static unauthorized(message = 'Unauthorized') {
        return new AppError(message, HTTP_STATUS.UNAUTHORIZED);
    }

    static forbidden(message = 'Forbidden') {
        return new AppError(message, HTTP_STATUS.FORBIDDEN);
    }

    static notFound(message = 'Not found') {
        return new AppError(message, HTTP_STATUS.NOT_FOUND);
    }

    static conflict(message, details = null) {
        return new AppError(message, HTTP_STATUS.CONFLICT, details);
    }

    static internal(message = 'Internal server error') {
        return new AppError(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    static handleMongoError(err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return this.conflict(`${field} already exists`);
        }
        return this.internal();
    }
}

module.exports = {
    AppError,
    ErrorHelper
};