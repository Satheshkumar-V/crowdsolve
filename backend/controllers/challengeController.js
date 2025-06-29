const Challenge = require('../models/Challenge');
const { getSuggestedTags, checkSimilarity } = require('../services/agentService');

exports.createChallenge = async (req, res) => {
  try {
    const data = req.body;
    data.createdBy = req.user.id;
    data.attachments = req.files ? Object.values(req.files).map(f => `/uploads/${f.name}`) : [];

    const similarChallenges = await checkSimilarity(data.content || data.description);
    if (similarChallenges.length > 0) {
      return res.status(409).json({ message: "Similar challenge found", similar: similarChallenges });
    }

    if (!data.tags || data.tags.length === 0) {
      data.tags = await getSuggestedTags(data.content || data.description);
    }

    const challenge = await Challenge.create(data);
    res.status(201).json(challenge);
  } catch (err) {
    res.status(500).json({ error: 'Challenge creation failed', detail: err.message });
  }
};

exports.getChallenges = async (req, res) => {
  const challenges = await Challenge.find().populate('createdBy', 'name');
  res.json(challenges);
};
