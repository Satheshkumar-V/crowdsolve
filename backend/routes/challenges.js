const router = require('express').Router();
const { createChallenge, getChallenges } = require('../controllers/challengeController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, createChallenge);
router.get('/', getChallenges);

module.exports = router;
