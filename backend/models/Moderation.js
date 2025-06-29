const mongoose = require('mongoose');

const moderationSchema = new mongoose.Schema({
  targetId: String,
  targetType: String,
  reason: String,
  flaggedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('Moderation', moderationSchema);
