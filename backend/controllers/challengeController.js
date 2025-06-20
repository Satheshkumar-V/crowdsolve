const Challenge = require('../models/Challenge');

exports.createChallenge = async (req, res) => {
  try {
    const data = req.body;
    data.createdBy = req.user.id;
    const challenge = await Challenge.create(data);
    res.status(201).json(challenge);
  } catch (err) {
    res.status(500).json({ error: 'Error creating challenge' });
  }
};

exports.getChallenges = async (req, res) => {
  const challenges = await Challenge.find().populate('createdBy', 'name');
  res.json(challenges);
};
