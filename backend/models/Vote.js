const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  solutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'SolutionThread' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('Vote', voteSchema);
