const router = require('express').Router();
const { createSolution, getSolutionsByChallenge } = require('../controllers/solutionController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, createSolution);
router.get('/:challengeId', getSolutionsByChallenge);

module.exports = router;
