const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  averageScore: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  creatorUsername: {
    type: String,
    required: true,
  },
  creatorProfilePicture: {
    type: String, 
  },
  scores: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      score: { type: Number, min: 1, max: 5 },
    }
  ],
}, { timestamps: true });

postSchema.methods.updateAverageScore = function() {
  if (this.scores.length === 0) {
    this.averageScore = 0;
  } else {
    const totalScore = this.scores.reduce((acc, curr) => acc + curr.score, 0);
    this.averageScore = totalScore / this.scores.length;
  }
  return this.save();
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
