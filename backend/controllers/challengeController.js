const Challenge = require('../models/Challenge');
const { getSuggestedTags } = require('../services/aiService');

exports.createChallenge = async (req, res) => {
  try {
    let data = req.body;
    data.createdBy = req.user.id;

    // Use AI agent for tag suggestion if not provided
    if (!data.tags || data.tags.length === 0) {
      const suggestedTags = await getSuggestedTags(data.content || data.description);
      data.tags = suggestedTags;
    }

    const challenge = await Challenge.create(data);
    res.status(201).json(challenge);
  } catch (err) {
    res.status(500).json({ error: 'Error creating challenge', detail: err.message });
  }
};  

exports.getChallenges = async (req, res) => {
  const challenges = await Challenge.find().populate('createdBy', 'name');
  res.json(challenges);
};
