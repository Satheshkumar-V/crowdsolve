const Badge = require('../models/Badge');
const User = require('../models/User');

exports.assignBadge = async (req, res) => {
  const { userId, badgeId } = req.body;
  await User.findByIdAndUpdate(userId, { $addToSet: { badges: badgeId } });
  res.json({ message: 'Badge assigned' });
};

exports.getBadges = async (req, res) => {
  const badges = await Badge.find();
  res.json(badges);
};
