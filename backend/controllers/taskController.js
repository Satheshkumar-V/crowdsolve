const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.getTasksByChallenge = async (req, res) => {
  const tasks = await Task.find({ challengeId: req.params.challengeId });
  res.json(tasks);
};
