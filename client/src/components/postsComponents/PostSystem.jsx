import React, { useEffect, useState } from 'react';
import api from '../../api';
import PostForm from './PostForm';

const PostSystem = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar/ocultar el modal de edición
  const [showCreateForm, setShowCreateForm] = useState(false); // Estado para mostrar/ocultar el formulario de creación

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts/getPosts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (formData) => {
    try {
      const response = await api.post('/posts/create', formData);
      setPosts([...posts, response.data]);
      setShowCreateForm(false); // Ocultar el formulario después de crear el post
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setShowEditModal(true); // Abrir el modal al hacer clic en Edit
  };

  const handleEditPost = async (formData) => {
    try {
      const response = await api.put(`/posts/edit/${editingPost._id}`, formData);
      setPosts(posts.map(post => (post._id === editingPost._id ? response.data : post)));
      setEditingPost(null);
      setEditTitle('');
      setEditContent('');
      setShowEditModal(false); // Cerrar el modal después de editar
    } catch (error) {
      console.error('Error editing post', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/posts/delete/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  const handleScorePost = async (postId, score) => {
    try {
      const response = await api.post(`/posts/${postId}/score`, { score });
      setPosts(posts.map(post => (post._id === postId ? response.data : post)));
    } catch (error) {
      console.error('Error scoring post', error);
    }
  };

  return (
    <div>
      {/* Botón para mostrar/ocultar formulario de creación */}
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Cancel' : 'Create New Post'}
      </button>

      {/* Formulario para crear un nuevo post */}
      {showCreateForm && (
        <PostForm
          onSubmit={handleCreatePost}
          title=""
          setTitle={setEditTitle}
          content=""
          setContent={setEditContent}
        />
      )}

      {/* Modal para editar post */}
      {showEditModal && (
        <div className="edit-modal">
          <h2>Edit Post</h2>
          <PostForm
            post={editingPost}
            onSubmit={handleEditPost}
            title={editTitle}
            setTitle={setEditTitle}
            content={editContent}
            setContent={setEditContent}
          />
          <button onClick={() => setShowEditModal(false)}>Close</button>
        </div>
      )}

      {/* Listado de posts */}
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Average Score: {post.averageScore}</p>
          <button onClick={() => handleEditClick(post)}>Edit</button>
          <button onClick={() => handleDeletePost(post._id)}>Delete</button>
          <input
            type="number"
            min="1"
            max="5"
            onChange={(e) => handleScorePost(post._id, parseInt(e.target.value))}
            placeholder="Score"
          />
        </div>
      ))}
    </div>
  );
};

export default PostSystem;
