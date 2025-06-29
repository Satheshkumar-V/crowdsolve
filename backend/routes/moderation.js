const express = require('express');
const router = express.Router();
const moderationController = require('../controllers/moderationController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/flag', verifyToken, moderationController.flagContent);

module.exports = router;