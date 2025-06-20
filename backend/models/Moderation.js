const mongoose = require('mongoose');

const moderationSchema = new mongoose.Schema({
  flaggedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetType: { type: String, enum: ['challenge', 'solution'] },
  targetId: mongoose.Schema.Types.ObjectId,
  reason: String,
  resolved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Moderation', moderationSchema);
