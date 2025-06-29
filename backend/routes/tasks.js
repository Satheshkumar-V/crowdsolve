const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/auto-generate', verifyToken, taskController.autoGenerateTasks);
router.get('/:challengeId', taskController.getTasksByChallenge);

module.exports = router;