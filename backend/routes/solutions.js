const express = require('express');
const router = express.Router();
const solutionController = require('../controllers/solutionController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, solutionController.createSolution);
router.get('/:challengeId', solutionController.getSolutionsByChallenge);

module.exports = router;