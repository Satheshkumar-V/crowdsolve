const Task = require('../models/Task');
const { extractTasks } = require('../services/agentService');

exports.autoGenerateTasks = async (req, res) => {
  const { challengeId, solutionText } = req.body;
  const tasks = await extractTasks(solutionText);

  const createdTasks = await Promise.all(tasks.map((t, i) => {
    const due = new Date();
    due.setDate(due.getDate() + (i + 1) * 2);
    return Task.create({ challengeId, title: t, dueDate: due, checklist: [] });
  }));

  res.json({ tasks: createdTasks });
};

exports.getTasksByChallenge = async (req, res) => {
  const tasks = await Task.find({ challengeId: req.params.challengeId });
  res.json(tasks);
};
