const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompts: [{ type: String, required: true }]
}, { timestamps: true });

promptSchema.methods.addPrompt = function(prompt) {
  if (this.prompts.length >= 5) {
    this.prompts.shift();
  }
  this.prompts.push(prompt);
  return this.save();
};

const UserPrompts = mongoose.model('UserPrompts', promptSchema);

module.exports = UserPrompts;
