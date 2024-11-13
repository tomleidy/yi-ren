const mongoose = require('mongoose');
const { Reference } = require('../models/reference');
const { Title } = require('../models/title');
const { YijingText } = require('../models/yijingText');
const config = require('../../config');

async function migrateData() {
    try {
        await mongoose.connect(config.mongoUrl);
        console.log('Connected to MongoDB');

        const titles = await Title.find({});
        console.log(`Found ${titles.length} titles to migrate`);

        for (const title of titles) {
            const references = await Reference.find({ titleId: title._id });
            console.log(`Processing ${references.length} references for title: ${title.title}`);

            const hexagrams = new Map();
            references.forEach(ref => {
                hexagrams.set(ref.kingwen.toString(), new Map(Object.entries(ref.columns)));
            });

            const yijingText = new YijingText({
                userId: title.userId,
                title: title.title,
                author: title.author,
                translator: title.translator,
                year: title.year,
                columnOrder: title.columnOrder,
                publicReference: references[0]?.publicReference || false,
                hexagrams
            });

            await yijingText.save();
            console.log(`Migrated: ${title.title}`);
        }

        console.log('Migration complete');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await mongoose.disconnect();
    }
}

// Only run if called directly
if (require.main === module) {
    migrateData();
}

module.exports = { migrateData };