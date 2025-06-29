const Vote = require('../models/Vote');
const SolutionThread = require('../models/SolutionThread');
const User = require('../models/User');

exports.voteSolution = async (req, res) => {
  const { solutionId } = req.body;
  const userId = req.user.id;
  const existing = await Vote.findOne({ solutionId, userId });
  if (existing) return res.status(400).json({ error: 'Already voted' });

  await Vote.create({ solutionId, userId });
  await SolutionThread.findByIdAndUpdate(solutionId, { $inc: { votes: 1 } });
  await User.findByIdAndUpdate(req.user.id, { $inc: { karma: 5 } });
  res.json({ message: 'Voted successfully' });
};
