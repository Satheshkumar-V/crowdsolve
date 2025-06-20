const router = require('express').Router();
const { createTask, getTasksByChallenge } = require('../controllers/taskController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, createTask);
router.get('/:challengeId', getTasksByChallenge);

module.exports = router;
