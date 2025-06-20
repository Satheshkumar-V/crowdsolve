const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
  content: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'SolutionThread', default: null },
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SolutionThread', threadSchema);
