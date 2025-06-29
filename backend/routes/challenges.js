const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const { verifyToken } = require('../middlewares/authMiddleware.js');
const mongoose = require('mongoose');


router.post('/', verifyToken, challengeController.createChallenge);
router.get('/', challengeController.getChallenges);

module.exports = router;
