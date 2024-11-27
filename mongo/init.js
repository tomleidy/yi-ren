const fs = require("fs");


db = db.getSiblingDB('admin');  // Admin database for root user creation

// Create the root user if it doesn't exist
if (!db.getUser(process.env.MONGO_INITDB_ROOT_USERNAME)) {
    db.createUser({
        user: process.env.MONGO_INITDB_ROOT_USERNAME,
        pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
        roles: [{ role: 'root', db: 'admin' }]
    });
}

// Switch to the YIREN database
db = db.getSiblingDB(process.env.MONGO_YIREN_DBNAME);

// Create the YIREN user with readWrite role

if (!db.getUser(process.env.MONGO_YIREN_USERNAME)) {
    db.createUser({
        user: process.env.MONGO_YIREN_USERNAME,
        pwd: process.env.MONGO_YIREN_PASSWORD,
        roles: [{ role: 'readWrite', db: process.env.MONGO_YIREN_DBNAME }]
    });
}


const existingDoc = db.yijingtexts.findOne({ userId: "000000000000000000000000" });
if (!existingDoc) {
    // Read Legge JSON file and insert the data into the yijingtexts collection
    const leggeText = JSON.parse(fs.readFileSync('/data/db/leggeText.json', 'utf8'));
    db.yijingtexts.insertMany(leggeText);
}
