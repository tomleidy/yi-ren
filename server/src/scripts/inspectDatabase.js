const mongoose = require('mongoose');
const { YijingText } = require('../models/yijingText');
const config = require('../../config');

async function inspectDatabase() {
    try {
        await mongoose.connect(config.mongoUrl);
        console.log('Connected to MongoDB');

        // Get count of documents
        const count = await YijingText.countDocuments();
        console.log(`Total YijingText documents: ${count}`);

        // Get one full document
        const sample = await YijingText.findOne();
        if (sample) {
            console.log('\nSample document structure:');
            console.log('Title:', sample.title);
            console.log('Author:', sample.author);
            console.log('Translator:', sample.translator);
            console.log('Column Order:', sample.columnOrder);

            // Look at hexagram structure
            const hexagramKeys = Array.from(sample.hexagrams.keys());
            console.log('\nHexagram numbers present:', hexagramKeys);

            // Look at one hexagram's content
            if (hexagramKeys.length > 0) {
                const firstHexagram = sample.hexagrams.get(hexagramKeys[0]);
                console.log('\nStructure of hexagram', hexagramKeys[0] + ':');
                console.log(Object.fromEntries(firstHexagram));
            }
        }

    } catch (err) {
        console.error('Inspection failed:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run if called directly
if (require.main === module) {
    inspectDatabase();
}