const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  tags: [String],
  urgency: { type: String, enum: ['Low', 'Medium', 'High'] },
  category: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attachments: [String],
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['open', 'closed'], default: 'open' }
});

module.exports = mongoose.model('Challenge', challengeSchema);
