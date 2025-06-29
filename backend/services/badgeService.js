const Badge = require('../models/Badge');
const User = require('../models/User');

const BADGE_RULES = [
  { name: 'Initiator', condition: (u) => u.karma >= 10 },
  { name: 'Solution Architect', condition: (u) => u.karma >= 50 },
  { name: 'Fixer', condition: (u) => u.karma >= 100 }
];

exports.evaluateBadges = async (user) => {
  const userData = await User.findById(user._id).populate('badges');
  const userBadgeNames = userData.badges.map(b => b.name);
  const allBadges = await Badge.find();

  const earned = [];
  for (const rule of BADGE_RULES) {
    if (rule.condition(userData) && !userBadgeNames.includes(rule.name)) {
      const badge = allBadges.find(b => b.name === rule.name);
      if (badge) {
        await User.findByIdAndUpdate(user._id, { $addToSet: { badges: badge._id } });
        earned.push(badge.name);
      }
    }
  }

  return earned;
};