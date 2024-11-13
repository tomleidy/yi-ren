#!/usr/bin/env node
const { DevSetup } = require('../src/helpers/devSetup');

async function setup() {
    try {
        // Get command line arguments
        const args = process.argv.slice(2);
        const command = args[0] || 'init';

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

        console.log('Operation completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('Operation failed:', err.message);
        process.exit(1);
    }
}

// Make sure we're not in production
if (process.env.NODE_ENV === 'production') {
    console.error('Cannot run dev setup in production!');
    process.exit(1);
}

setup();