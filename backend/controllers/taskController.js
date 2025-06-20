const Task = require('../models/Task');
// const { extractTasksFromSolution, suggestTaskDeadlines } = require('../services/aiService');

exports.createTask = async (req, res) => {
const { challengeId, solutionText } = req.body;

  const tasks = await extractTasksFromSolution(solutionText);
  const deadlines = await suggestTaskDeadlines(tasks.length);

  const createdTasks = await Promise.all(tasks.map((task, i) =>
    Task.create({
      challengeId,
      title: task,
      dueDate: deadlines[i] || null,
      checklist: []
    })
  ));

  res.json({ tasks: createdTasks });
};


exports.getTasksByChallenge = async (req, res) => {
  const tasks = await Task.find({ challengeId: req.params.challengeId });
  res.json(tasks);
};
