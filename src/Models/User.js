const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Please enter your first name'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Please enter your last name'],
  },
  email: { 
    type: String, 
    unique: true,
    trim: true,
    required: [true, 'Please enter your email address'],
  },
  username: { 
    type: String, 
    unique: true,
    trim: true,
    required: [true, 'Please choose a username'],
  },
  password: {
    type: String,
    required: [true, 'Please choose a password'],
  },
  verificationCode: {
    type: String,
    trim: true,
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  gender: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  smokingAge: {
    type: String
  },
  profilePicture: {
    url: {
      type: String,
      default: null,
    },
    publicId: {
      type: String,
      default: null,
    },
  },
  noOfCigarPerDay: {
    type: Map,
    of: Number,
    default: function () {
      const map = new Map();
      const today = new Date().toISOString().split('T')[0];
      map.set(today, 0); // Set the default value for the current day to 0
      return map;
    },
  },
  dateJoined: { 
    type: Date, 
    default: Date.now 
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
