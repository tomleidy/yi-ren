require('dotenv').config();


db.createUser({
  user: process.env.MONGO_YIREN_USERNAME,
  pwd: process.env.MONGO_YIREN_PASSWORD,
  roles: [
    { role: "readWrite", db: process.env.MONGO_YIREN_DBNAME }
  ]
});

