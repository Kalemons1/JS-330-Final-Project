const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  dailyHigh: { type: String, required: true }, // Best moment of the day
  dailyLow: { type: String, required: true },  // Worst moment of the day
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create a text index on content, dailyHigh, and dailyLow
postSchema.index({ content: 'text', dailyHigh: 'text', dailyLow: 'text' });

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
  justOne: false
});

module.exports = mongoose.model('Post', postSchema);
