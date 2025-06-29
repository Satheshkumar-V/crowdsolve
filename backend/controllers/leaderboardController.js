const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ karma: -1 }).limit(10).select('name karma');
  res.json(users);
};
