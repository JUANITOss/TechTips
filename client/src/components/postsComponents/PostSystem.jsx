import React, { useEffect, useState } from 'react';
import api from '../../api';
import PostForm from './PostForm';
import StarRating from './StarRating';

const PostSystem = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts/getPosts');
        setPosts(response.data.map(post => ({
          ...post,
          userScore: post.userScore || 0 
        })));
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await api.get('/auth/currentUser');
        setUserId(response.data.user._id); 
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchPosts();
    fetchUserData();
  }, []);

  const handleCreatePost = async (formData) => {
    try {
      const response = await api.post('/posts/create', formData);
      setPosts([...posts, response.data]);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setShowEditModal(true);
  };

  const handleEditPost = async (formData) => {
    try {
      const response = await api.put(`/posts/edit/${editingPost._id}`, formData);
      setPosts(posts.map(p => (p._id === editingPost._id ? { ...p, ...response.data } : p)));
      setEditingPost(null);
      setEditTitle('');
      setEditContent('');
      setShowEditModal(false);
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
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            averageScore: response.data.averageScore,
            userScore: response.data.userScore
          };
        }
        return post;
      }));
    } catch (error) {
      console.error('Error scoring post', error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Cancel' : 'Create New Post'}
      </button>

      {showCreateForm && (
        <PostForm
          onSubmit={handleCreatePost}
          title=""
          setTitle={setEditTitle}
          content=""
          setContent={setEditContent}
        />
      )}

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

      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div>
            Average Score:
            <StarRating
              rating={post.averageScore}
              disabled
            />
          </div>
          <div>
            Your Score:
            <StarRating
              rating={post.userScore}
              onRate={(score) => handleScorePost(post._id, score)}
              disabled={editingPost !== null}
            />
          </div>
          {userId && post.createdBy === userId && ( // Comprueba si el usuario actual es el creador del post
            <div>
              <button onClick={() => handleEditClick(post)}>Edit</button>
              <button onClick={() => handleDeletePost(post._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostSystem;
