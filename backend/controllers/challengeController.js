const Challenge = require('../models/Challenge');
const { checkSimilarity } = require('../services/agentService');

exports.createChallenge = async (req, res) => {
  try {
    const data = req.body;
    console.log("data:", data);
    data.createdBy = req.user.id;
    data.attachments = req.files ? Object.values(req.files).map(f => `/uploads/${f.name}`) : [];

    // 🔁 If skipSimilarity=true, don't check
    const skipSimilarity = req.query.skipSimilarity === 'true';

    if (!skipSimilarity) {
      const similarChallenges = await checkSimilarity(data.content || data.description);
      console.log({ similarChallenges });

      if (similarChallenges.length > 0) {
        return res.status(200).json({
          message: "Similar challenge found",
          similar: similarChallenges
        }); // ✅ prevent double response
      }
    }

    const challenge = await Challenge.create(data);
    console.log({ challenge });
    return res.status(201).json(challenge);
  } catch (err) {
    console.error("❌ Challenge creation error:", err);
    return res.status(500).json({ error: 'Challenge creation failed', detail: err.message });
  }
};

exports.getChallenges = async (req, res) => {
  const challenges = await Challenge.find().populate('createdBy', 'name');
  res.json(challenges);
};
