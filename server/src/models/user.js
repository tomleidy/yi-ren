const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, default: '', unique: true },
  email: { type: String, default: '', unique: true },
  password: { type: String, default: null, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  admin: { type: Boolean, default: false },
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
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
userSchema.plugin(passportLocalMongoose);

module.exports = { User };