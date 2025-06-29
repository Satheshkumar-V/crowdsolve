const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
  title: String,
  description: String,
  dueDate: Date,
  status: { type: String, default: 'pending' },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  checklist: [String],
});
module.exports = mongoose.model('Task', taskSchema);