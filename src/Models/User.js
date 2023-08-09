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
  verificationCode: String, // Add this field
  isVerified: { type: Boolean, default: false }, // Add this field
});

const User = mongoose.model('User', userSchema);

module.exports = User;
