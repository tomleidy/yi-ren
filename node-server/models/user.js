const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 12;

const userSchema = new Schema({
  username: { type: String, default: '', unique: true },
  email: { type: String, default: '', unique: true },
  password: { type: String, default: null, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  admin: { type: Boolean, default: false },
  createdAt: { type: Date, default: null },
  updatedAt: { type: Date, default: null },
  lastLogin: { type: Date, default: null },
  dateOfBirth: { type: Date, default: null },
  isActive: { type: Boolean, default: false },
  profilePicture: { type: String, default: null },
  address: { type: String, default: "" },
  phoneNumber: { type: String, default: null },
  isVerified: { type: Boolean, default: false },
  roles: { type: Array, default: [] },
  resetToken: { type: String, default: null },
  resetTokenExpiry: { type: Date, default: null },
})


async function userCreate(body) {
  const { username, email, password } = body;
  try {
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    let createdAt = new Date().toISOString();
    const user = new User({
      username,
      email,
      password: hashedPassword,
      createdAt,
      updatedAt: createdAt
    });
    const result = await user.save();
    return { status: 201, data: result };
  }
  catch (err) {
    if (err.code === 11000) {
      return { status: 409, data: "username " + username + " already in use" }
    }
    return { status: 500, data: err };
  }
}

const User = mongoose.model('User', userSchema);
userSchema.plugin(passportLocalMongoose);

module.exports = { User, userCreate };