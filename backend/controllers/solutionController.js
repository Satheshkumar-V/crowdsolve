const SolutionThread = require('../models/SolutionThread');
const { moderateContent } = require('../services/agentService');

exports.createSolution = async (req, res) => {
  try {
    const { content, challengeId, parentSolutionId } = req.body;
    const createdBy = req.user.id;
        console.log('req.user:', req.user); // should contain { id, role }
        console.log('req.body:', req.body);

    const flagged = await moderateContent(content);
    if (flagged.includes("flagged")) {
      return res.status(400).json({ error: "Content flagged", reason: flagged });
    }

    const solution = await SolutionThread.create({ challengeId, content, createdBy, parentSolutionId });
    res.status(201).json(solution);


  } catch (err) {
    console.error('Create solution error:', err.message);
    res.status(500).json({ error: 'Failed to create solution', detail: err.message });
  }
};

exports.getSolutionsByChallenge = async (req, res) => {
  const solutions = await SolutionThread.find({ challengeId: req.params.challengeId });
  res.json(solutions);
};
