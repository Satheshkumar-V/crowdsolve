const router = require('express').Router();
const { flagContent } = require('../controllers/moderationController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/flag', verifyToken, flagContent);

module.exports = router;
