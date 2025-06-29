const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/assign', verifyToken, badgeController.assignBadge);
router.get('/', badgeController.getBadges);

module.exports = router;