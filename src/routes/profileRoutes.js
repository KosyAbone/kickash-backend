const express = require('express');
const profileController = require('../Controllers/profileController');
const authenticate = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authenticate, profileController.getUserProfile);
router.put('/', authenticate, profileController.updateUserProfile);

module.exports = router;
