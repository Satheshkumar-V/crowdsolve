const SolutionThread = require('../models/SolutionThread');
const { getSubSolutionThreads } = require('../services/aiService');

exports.createSolution = async (req, res) => {
  try {
    const { content, challengeId } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const createdBy = req.user.id;

    const threadIdeas = await getSubSolutionThreads(content);
    console.log("Sub-thread ideas:", threadIdeas);

    const mainSolution = await SolutionThread.create({ challengeId, content, createdBy });
    console.log("Main solution created:", mainSolution._id);

    if (Array.isArray(threadIdeas)) {
      for (const reply of threadIdeas) {
        await SolutionThread.create({
          challengeId,
          content: reply,
          createdBy,
          parentId: mainSolution._id,
        });
      }
    }

    res.status(201).json({ mainSolutionId: mainSolution._id });
  } catch (err) {
    console.error("Error creating solution:", err);
    res.status(500).json({ error: "Failed to create solution thread", detail: err.message });
  }
};


exports.getSolutionsByChallenge = async (req, res) => {
  const solutions = await SolutionThread.find({ challengeId: req.params.challengeId });
  res.json(solutions);
};
