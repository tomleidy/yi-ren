const mongoose = require('mongoose');

// Simple sanitizer to replace HTML-like content and normalize whitespace
function sanitizeText(text) {
    if (!text) return text;
    return text
        .replace(/<[^>]*>/g, '') // Remove HTML-like tags
        .replace(/&[^;]+;/g, '') // Remove HTML entities
        .replace(/[\r\n]+/g, '\n') // Normalize line breaks
        .trim();
}

const yijingTextSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: { type: String, required: true },
    author: { type: String, required: true },
    translator: { type: String, default: null },
    year: { type: Number, default: null },
    columnOrder: { type: [String], required: true },
    publicReference: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedPermanent: { type: Boolean, default: false },

    hexagrams: {
        type: Map,
        of: {
            type: Map,
            of: String
        }
    }
}, { timestamps: true });

// Index for efficient queries
yijingTextSchema.index({ publicReference: 1, deletedAt: 1 });

// Method to get specific hexagrams with only requested columns
yijingTextSchema.methods.getHexagrams = function (hexagramNumbers) {
    const result = {
        title: {
            userId: this.userId,
            title: this.title,
            author: this.author,
            translator: this.translator,
            year: this.year,
            columnOrder: this.columnOrder,
            publicReference: this.publicReference,
            deletedAt: this.deletedAt,
            deletedPermanent: this.deletedPermanent
        }
    };

    hexagramNumbers.forEach(num => {
        if (this.hexagrams.has(num.toString())) {
            result[num] = Object.fromEntries(this.hexagrams.get(num.toString()));
        }
    });

    return result;
};

// Method to get title information only
yijingTextSchema.methods.getTitleInfo = function () {
    return {
        id: this._id,
        title: this.title,
        author: this.author,
        translator: this.translator,
        year: this.year,
        columnOrder: this.columnOrder,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

// Static method to get all titles for a user
yijingTextSchema.statics.getUserTitles = async function (userId) {
    const texts = await this.find(
        {
            userId,
            deletedAt: null,
            deletedPermanent: false
        },
        {
            hexagrams: 0 // Exclude hexagram data
        }
    );
    return texts.map(text => text.getTitleInfo());
};

const YijingText = mongoose.model('YijingText', yijingTextSchema);

async function createFromCSV(userId, titleInfo, csvData) {
    // Validate required fields
    if (!titleInfo.title || !titleInfo.author || !titleInfo.columnOrder) {
        throw new Error('Missing required title information');
    }

    // Find hexagram number column using regex
    const hexagramPattern = /^(?:number|hexagram|king\s*wen|\#)$/i;
    const hexagramColumn = Object.keys(csvData[0]).find(col =>
        hexagramPattern.test(col.trim())
    );

    if (!hexagramColumn) {
        throw new Error('CSV must include a column for hexagram numbers (e.g., Number, Hexagram, KingWen, King Wen)');
    }

    // Validate hexagram numbers
    const validHexagramNumbers = new Set(Array.from({ length: 64 }, (_, i) => (i + 1).toString()));
    const hexagrams = new Map();

    for (const row of csvData) {
        const hexNum = row[hexagramColumn]?.toString();

        if (!validHexagramNumbers.has(hexNum)) {
            throw new Error(`Invalid hexagram number: ${hexNum}`);
        }

        const hexData = new Map();
        for (const col of titleInfo.columnOrder) {
            if (col !== hexagramColumn && row[col]) {  // Skip the hexagram number column
                hexData.set(col, sanitizeText(row[col]));
            }
        }
        hexagrams.set(hexNum, hexData);
    }

    const yijingText = new YijingText({
        userId,
        ...titleInfo,
        hexagrams
    });

    return await yijingText.save();
}


// Function to get texts for specific hexagrams
async function getTexts(hexagramNumbers, userId = null) {
    const query = {
        deletedAt: null,
        deletedPermanent: false,
        $or: [
            { publicReference: true },
            ...(userId ? [{ userId }] : [])
        ]
    };

    const texts = await YijingText.find(query);

    return texts.map(text => text.getHexagrams(hexagramNumbers));
}

module.exports = {
    YijingText,
    createFromCSV,
    getTexts
};