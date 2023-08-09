const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const User = require('../Models/User')
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    // Check if email/username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Email or username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random verification code
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code

    const user = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      verificationCode,
    });

    // Save user to database
    await user.save();

    // Send the verification code to the user's email
    const msg = {
      to: user.email,
      from: 'your_verified_email@example.com', // Use a verified email from SendGrid
      subject: 'Email Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    };

    await sgMail.send(msg);

    res.status(201).json({ message: 'User registered successfully. Please check your email for the verification code.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.verificationCode !== user.verificationCode) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    user.verificationCode = null; // Clear the verification code
    user.isVerified = true; // Mark the user as verified
    await user.save();

    // Send a confirmation email using SendGrid
    const confirmationMsg = {
      to: user.email,
      from: 'your_verified_email@example.com', // Use a verified email from SendGrid
      subject: 'Email Verification Successful',
      text: 'Your email has been successfully verified.',
    };

    await sgMail.send(confirmationMsg);

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ $or: [{ email: username }, { username }] });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { register, verifyEmail, login };
