const SolutionThread = require('../models/SolutionThread');

exports.createSolution = async (req, res) => {
  try {
    const data = req.body;
    data.createdBy = req.user.id;
    const solution = await SolutionThread.create(data);
    res.status(201).json(solution);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create solution thread' });
  }
};

exports.getSolutionsByChallenge = async (req, res) => {
  const solutions = await SolutionThread.find({ challengeId: req.params.challengeId });
  res.json(solutions);
};
