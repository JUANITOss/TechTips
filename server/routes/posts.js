// routes/posts.js
const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const verifyAuth = require('../middleware/authMiddleware');
const router = express.Router();

// Crear un post
router.post('/create', verifyAuth, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.session.userId;

  try {
    const newPost = new Post({
      title,
      content,
      createdBy: userId,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creando el post', error });
  }
});

// Editar un post
router.put('/edit/:postId', verifyAuth, async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const userId = req.session.userId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    if (!post.createdBy.equals(userId)) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    post.title = title;
    post.content = content;
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
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    if (!post.createdBy.equals(userId)) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await post.remove();
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
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    const existingScoreIndex = post.scores.findIndex(s => s.userId.equals(userId));
    if (existingScoreIndex !== -1) {
      post.scores[existingScoreIndex].score = score;
    } else {
      post.scores.push({ userId, score });
    }

    await post.updateAverageScore();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error puntuando el post', error });
  }
});

module.exports = router;
