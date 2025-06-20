const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
  karma: { type: Number, default: 0 },
  badges: [String]
});

module.exports = mongoose.model('User', userSchema);
