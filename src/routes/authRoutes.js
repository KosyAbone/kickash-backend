const express = require('express');
const authController = require('../Controllers/authController')
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-email', authController.verifyEmail);

module.exports = router;
