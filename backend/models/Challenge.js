const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  tags: [String],
  urgency: String,
  category: String,
  attachments: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bounty: { type: Number, default: 0 },
  status: { type: String, default: 'open' }
}, { timestamps: true });
module.exports = mongoose.model('Challenge', challengeSchema);