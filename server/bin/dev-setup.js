#!/usr/bin/env node
const { DevSetup } = require('../src/helpers/devSetup');
const mongoose = require('mongoose');
const config = require('../config');

async function setup() {
    try {
        // Get command line arguments
        const args = process.argv.slice(2);
        const command = args[0] || 'init';

        // Connect to MongoDB first
        console.log('Connecting to MongoDB...');
        await mongoose.connect(config.mongoUrl);
        console.log('Connected to MongoDB');

        switch (command) {
            case 'init':
                console.log('Initializing development environment...');
                await DevSetup.initializeTestEnvironment();
                break;
            case 'cleanup':
                console.log('Cleaning up development environment...');
                await DevSetup.cleanupTestEnvironment();
                break;
            case 'reset':
                console.log('Resetting development environment...');
                await DevSetup.cleanupTestEnvironment();
                await DevSetup.initializeTestEnvironment();
                break;
            default:
                console.error('Unknown command. Use: init, cleanup, or reset');
                process.exit(1);
        }

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Operation completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('Operation failed:', err.message);
        // Ensure we disconnect even if there's an error
        try {
            await mongoose.disconnect();
        } catch (disconnectErr) {
            console.error('Error disconnecting from MongoDB:', disconnectErr);
        }
        process.exit(1);
    }
}

// Make sure we're not in production
if (process.env.NODE_ENV === 'production') {
    console.error('Cannot run dev setup in production!');
    process.exit(1);
}

setup();