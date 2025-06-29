const mongoose = require('mongoose');

const solutionThreadSchema = new mongoose.Schema({
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
  parentSolutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'SolutionThread' },
  content: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('SolutionThread', solutionThreadSchema);