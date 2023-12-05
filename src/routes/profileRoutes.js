const express = require('express');
const profileController = require('../Controllers/profileController');
const authenticate = require('../utils/authMiddleware');
const { upload } = require('../config/multer');

const router = express.Router();

router.get('/:userId', authenticate, profileController.getUserProfile);
router.put('/:userId/edit', authenticate, profileController.updateUserProfile);
router.put('/:userId/upload',authenticate, upload.single('profilePicture'), profileController.uploadProfilePicture);

module.exports = router;
