const express = require('express');
const router = express.Router();
const { incrementCigarCounter, getSmokingHistory } = require('../Controllers/SmokingController');
const authenticate = require('../utils/authMiddleware');

router.put('/increment', authenticate, incrementCigarCounter);

router.get('/history', authenticate, getSmokingHistory);

module.exports = router;
