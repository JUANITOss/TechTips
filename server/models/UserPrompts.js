const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompts: [{ type: String, required: true }]
}, { timestamps: true });

promptSchema.methods.addPrompt = async function(prompt) {
  try {
    if (this.prompts.length >= 5) {
      this.prompts.shift();
    }
    
    this.prompts.push(prompt);

    await this.save();
    return true;  
  } catch (error) {
    console.error('Error al agregar el prompt:', error);
    throw new Error('Error al guardar el prompt');
  }
};

const UserPrompts = mongoose.model('UserPrompts', promptSchema);

module.exports = UserPrompts;
