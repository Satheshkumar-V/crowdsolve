const Moderation = require('../models/Moderation');

exports.flagContent = async (req, res) => {
  try {
    const { targetId, targetType, reason } = req.body;
    const report = await Moderation.create({
      targetId,
      targetType,
      reason,
      flaggedBy: req.user.id
    });
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: 'Failed to flag content' });
  }
};
