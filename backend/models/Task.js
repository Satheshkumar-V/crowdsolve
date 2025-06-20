const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
  title: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: Date,
  checklist: [{ text: String, done: Boolean }],
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' }
});

module.exports = mongoose.model('Task', taskSchema);
