const AUTHENTICATION = {
    SESSION_COOKIE_MAX_AGE: 14 * 24 * 60 * 60 * 1000, // 14 days in milliseconds
    SALT_ROUNDS: 12,
};

const UPLOADS = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB in bytes
    ALLOWED_MIME_TYPES: ['text/csv'],
};

const DATABASE = {
    ALLOWED_USER_UPDATE_FIELDS: new Set([
        "firstName",
        "lastName",
        "dateOfBirth",
        "profilePicture",
        "address",
        "phoneNumber"
    ]),
    SOFT_DELETE_AGE: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
};

const CACHE = {
    STALE_AFTER: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

const HEXAGRAM = {
    MIN_NUMBER: 1,
    MAX_NUMBER: 64,
    BINARY_LENGTH: 6,
};

const VALIDATION = {
    USERNAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 30,
        PATTERN: /^[a-zA-Z0-9_-]+$/
    },
    PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 128,
    },
    EMAIL: {
        MAX_LENGTH: 254,
        PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    TOPIC: {
        MAX_LENGTH: 500
    },
    NOTES: {
        MAX_LENGTH: 5000
    }
};

module.exports = {
    ...AUTHENTICATION,
    ...UPLOADS,
    ...DATABASE,
    ...CACHE,
    HTTP_STATUS,
    HEXAGRAM,
    VALIDATION,
};