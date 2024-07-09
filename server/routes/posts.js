const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
const verifyAuth = require('../middleware/authMiddleware');
const router = express.Router();

// Obtener todos los posts
router.get('/getPosts', verifyAuth, async (req, res) => {
  const userId = req.session.userId;

  try {
    const posts = await Post.find().lean().exec();
    const postsWithUserScores = posts.map(post => {
      const userScore = post.scores.find(score => score.userId.toString() === userId.toString());
      return { ...post, userScore: userScore ? userScore.score : 0 };
    });
    res.send(postsWithUserScores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Crear un post
router.post('/create', verifyAuth, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.session.userId;

  try {
      const user = await User.findOne({ _id: userId });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const newPost = new Post({
          title,
          content,
          createdBy: userId,
          creatorUsername: user.username,
          creatorProfilePicture: user.profilePicture,
      });

      await newPost.save();
      res.status(201).json(newPost);
  } catch (error) {
      res.status(500).json({ message: 'Error creando el post', error });
  }
});


// Editar un post
router.put('/edit/:_id', verifyAuth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params._id });
    
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
  
    const userId = req.session.userId;
  
    if (!post.createdBy.equals(userId)) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const { title, content } = req.body;
    post.content = content;
    post.title = title;
    
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error editando el post', error });
  }
});

// Borrar un post
router.delete('/delete/:postId', verifyAuth, async (req, res) => {
  const { postId } = req.params;
  const userId = req.session.userId;

  try {
    const post = await Post.findByIdAndDelete(postId);

    if (!post.createdBy.equals(userId)) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    res.status(200).json({ message: 'Post borrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error borrando el post', error });
  }
});

// Puntuar un post
router.post('/:postId/score', verifyAuth, async (req, res) => {
  const { postId } = req.params;
  const { score } = req.body;
  const userId = req.session.userId;

  try {
    let post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Verificar si el usuario ya ha puntuado este post
    const existingScoreIndex = post.scores.findIndex(s => s.userId.equals(userId));

    if (existingScoreIndex !== -1) {
      post.scores[existingScoreIndex].score = score;
    } else {
      post.scores.push({ userId, score });
    }

    await post.updateAverageScore();

    post = await Post.findById(postId).populate('createdBy', 'username').lean();

    res.status(200).json(post);
  } catch (error) {
    console.error('Error scoring post', error);
    res.status(500).json({ message: 'Error scoring post', error });
  }
});


module.exports = router;
