require('dotenv').config();
const { User } = require("../models/user");
const { userCreate } = require('./users.js');
const { ErrorHelper } = require('./errors');

class TestUsers {
    static get USER() {
        return {
            username: process.env.TEST_USERNAME || 'testUser',
            password: process.env.TEST_PASSWORD || 'testPassword123',
            email: process.env.TEST_EMAIL || 'test.user@example.com',
            firstName: 'Test',
            lastName: 'User'
        };
    }

    static get ADMIN() {
        return {
            username: process.env.TEST_ADMIN_USERNAME || 'testAdmin',
            password: process.env.TEST_ADMIN_PASSWORD || 'adminPassword123',
            email: process.env.TEST_ADMIN_EMAIL || 'test.admin@example.com',
            firstName: 'Test',
            lastName: 'Admin'
        };
    }

    // Placeholder for future pro user implementation
    static get PRO() {
        return {
            username: process.env.TEST_PRO_USERNAME || 'testPro',
            password: process.env.TEST_PRO_PASSWORD || 'proPassword123',
            email: process.env.TEST_PRO_EMAIL || 'test.pro@example.com',
            firstName: 'Test',
            lastName: 'Pro'
        };
    }
}

class DevSetup {
    static async createTestUser(userType = 'USER', force = false) {
        const userData = TestUsers[userType];

        try {
            if (!userData) {
                throw ErrorHelper.badRequest(`Invalid user type: ${userType}`);
            }

            // Check if user exists
            const existingUser = await User.findOne({
                $or: [
                    { username: userData.username },
                    { email: userData.email }
                ]
            });

            if (existingUser) {
                const field = existingUser.username === userData.username ? 'username' : 'email';
                const value = field === 'username' ? userData.username : userData.email;

                if (!force) {
                    console.log(`${userType} ${field} already exists: ${value}`);
                    throw ErrorHelper.conflict(
                        `${userType} ${field} already exists: ${value}`,
                        { field, value }
                    );
                }

                console.log(`Removing existing user with ${field}: ${value}`);
                await User.findOneAndDelete({ [field]: value });
            }

            // Create new user
            const result = await userCreate(userData, userType === 'ADMIN');

            if (result.status === 201) {
                console.log(`Created ${userType}: ${userData.username}`);
                return result.data;
            } else {
                throw ErrorHelper.internal(
                    `Failed to create ${userType}`,
                    result.data
                );
            }
        } catch (err) {
            if (err.statusCode) throw err; // If it's already an AppError, rethrow
            console.error(`Error creating ${userType}:`, err);
            throw ErrorHelper.internal(`Failed to create ${userType}`, err.message);
        }
    }

    static async initializeTestEnvironment() {
        if (process.env.NODE_ENV === 'production') {
            throw ErrorHelper.forbidden('Cannot initialize test environment in production');
        }

        try {
            console.log('Initializing test environment...');

            // First clean up any existing test users
            console.log('Cleaning up existing test users...');
            await this.cleanupTestEnvironment();

            console.log('Creating new test users...');
            // Create test users
            const users = await Promise.all([
                this.createTestUser('USER'),
                this.createTestUser('ADMIN')
                // Uncomment when pro user functionality is implemented
                // this.createTestUser('PRO')
            ]);

            console.log('Test environment initialized successfully');
            return users;
        } catch (err) {
            console.error('Failed to initialize test environment:', err);
            // If it's a conflict error, give more helpful message
            if (err.statusCode === 409) {
                throw ErrorHelper.conflict(
                    'Test users already exist. Run cleanup first or use reset command.',
                    err.details
                );
            }
            throw ErrorHelper.internal('Test environment initialization failed');
        }
    }

    static async cleanupTestEnvironment() {
        if (process.env.NODE_ENV === 'production') {
            throw ErrorHelper.forbidden('Cannot cleanup test environment in production');
        }

        try {
            console.log('Cleaning up test environment...');

            const testUsernames = [
                TestUsers.USER.username,
                TestUsers.ADMIN.username,
                TestUsers.PRO.username
            ];

            const result = await User.deleteMany({
                username: { $in: testUsernames }
            });

            console.log(`Cleaned up ${result.deletedCount} test users`);
            return result;
        } catch (err) {
            console.error('Failed to cleanup test environment:', err);
            throw ErrorHelper.internal('Test environment cleanup failed');
        }
    }
}

// Script execution when run directly
if (require.main === module) {
    const action = process.env.TEST_ENV === "true" ?
        DevSetup.initializeTestEnvironment() :
        DevSetup.cleanupTestEnvironment();

    action
        .then(() => {
            console.log('Setup/cleanup completed successfully');
            process.exit(0);
        })
        .catch(err => {
            console.error('Operation failed:', err.message);
            process.exit(1);
        });
}

module.exports = {
    DevSetup,
    TestUsers
};
