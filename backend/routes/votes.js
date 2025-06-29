const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, voteController.voteSolution);

module.exports = router;