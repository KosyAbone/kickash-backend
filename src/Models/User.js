const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  gender: String,
  dateOfBirth: Date,
  age: Number,
  profilePicture: String,
  dateJoined: { type: Date, default: Date.now },
  verificationCode: String,
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
