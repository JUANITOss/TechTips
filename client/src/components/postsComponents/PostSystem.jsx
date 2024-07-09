import React, { useEffect, useState } from 'react';
import api from '../../api';
import PostForm from './PostForm';
import StarRating from './StarRating';
import './PostSystem.css';

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
                const response = await api.get('/post/getPosts');
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
                const response = await api.get('/user/currentUser');
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
            const response = await api.post('/post/create', formData);
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
            const response = await api.put(`/post/edit/${editingPost._id}`, formData);
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
            await api.delete(`/post/delete/${postId}`);
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post', error);
        }
    };

    const handleScorePost = async (postId, score) => {
        try {
            const response = await api.post(`/post/${postId}/score`, { score });
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
        <div className="post-system-container">
            <nav className="navbarPost">
                <div className="navbar-left">
                    <a href="/homePage">←</a>
                </div>
                <div className="navbar-center">
                    <span>TechTips</span>
                </div>
            </nav>

            <div className="posts-container">
                <button className="create-post-button" onClick={() => setShowCreateForm(!showCreateForm)}>
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
                        <button className="button cancel-button" onClick={() => setShowEditModal(false)}>Close</button>
                    </div>
                )}

                {posts.map(post => (
                    <div key={post._id} className="post-card">
                        <div className="post-header">
                            {post.creatorProfilePicture && (
                                <img className="profile-picture" src={`http://localhost:5000/uploads/${post.creatorProfilePicture}`} alt="Profile" />
                            )}
                            <span className="creator-username">{post.creatorUsername}</span>
                        </div>
                        <div className="post-content">
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
                            {userId && post.createdBy === userId && (
                                <div>
                                    <button className="button" onClick={() => handleEditClick(post)}>Edit</button>
                                    <button className="button cancel-button" onClick={() => handleDeletePost(post._id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostSystem;
