const { HEXAGRAM, VALIDATION } = require('../constants');

class ValidationHelper {
    static isValidHexagram(hex) {
        // Check if it's a valid number between 1-64
        if (typeof hex === 'number' || /^\d+$/.test(hex)) {
            const num = Number(hex);
            return num >= HEXAGRAM.MIN_NUMBER && num <= HEXAGRAM.MAX_NUMBER;
        }

        // Check if it's a valid binary string
        if (typeof hex === 'string' && hex.length === HEXAGRAM.BINARY_LENGTH) {
            return /^[01]+$/.test(hex);
        }

        return false;
    }

    static isValidUsername(username) {
        if (typeof username !== 'string') return false;
        if (username.length < VALIDATION.USERNAME.MIN_LENGTH ||
            username.length > VALIDATION.USERNAME.MAX_LENGTH) return false;
        return VALIDATION.USERNAME.PATTERN.test(username);
    }

    static isValidPassword(password) {
        if (typeof password !== 'string') return false;
        return password.length >= VALIDATION.PASSWORD.MIN_LENGTH &&
            password.length <= VALIDATION.PASSWORD.MAX_LENGTH;
    }

    static isValidEmail(email) {
        if (typeof email !== 'string') return false;
        if (email.length > VALIDATION.EMAIL.MAX_LENGTH) return false;
        return VALIDATION.EMAIL.PATTERN.test(email);
    }

    static isValidTopic(topic) {
        if (typeof topic !== 'string') return false;
        return topic.length <= VALIDATION.TOPIC.MAX_LENGTH;
    }

    static isValidNotes(notes) {
        if (typeof notes !== 'string') return false;
        return notes.length <= VALIDATION.NOTES.MAX_LENGTH;
    }

    static sanitizeString(str) {
        if (!str) return '';
        return str
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/&[^;]+;/g, '') // Remove HTML entities
            .trim();
    }

    static validateUserUpdate(updates) {
        const errors = [];
        const sanitized = {};

        if (updates.firstName !== undefined) {
            sanitized.firstName = this.sanitizeString(updates.firstName);
        }

        if (updates.lastName !== undefined) {
            sanitized.lastName = this.sanitizeString(updates.lastName);
        }

        if (updates.email !== undefined) {
            if (!this.isValidEmail(updates.email)) {
                errors.push('Invalid email format');
            } else {
                sanitized.email = updates.email.toLowerCase();
            }
        }

        if (updates.dateOfBirth !== undefined) {
            const date = new Date(updates.dateOfBirth);
            if (isNaN(date.getTime())) {
                errors.push('Invalid date of birth');
            } else {
                sanitized.dateOfBirth = date;
            }
        }

        return { errors, sanitized };
    }
}

module.exports = ValidationHelper;