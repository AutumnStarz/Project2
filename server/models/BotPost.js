const mongoose = require('mongoose');

// bot post schema
const BotPostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
  beeps: { type: Number, default: 0 },
  boops: { type: Number, default: 0 },
});

module.exports = mongoose.model('BotPost', BotPostSchema);
