import React, { useEffect, useState } from 'react';
import api from '../../api';
import PostForm from './PostForm';
import StarRating from './StarRating';
import './PostSystem.css';
import '../pageStyles/NavbarComponents.css';
import { Link } from 'react-router-dom';

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
            <div className="navbar-forum">

                <a className="navbar-left-backwards-arrow" href="/homePage"><img className='arrow-image-backwards-1' src="/imagenes/left_arrow.png" alt="" /></a>
                <h1 className="navbar-title">Bienvenido al foro</h1>
                <button className="create-post-button" onClick={() => setShowCreateForm(!showCreateForm)}>
                    {showCreateForm ? 
                        <svg className="add-post-svg" fill="gray" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M17,15.6L15.6,17L12,13.4L8.4,17L7,15.6l3.6-3.6L7,8.4L8.4,7l3.6,3.6L15.6,7L17,8.4L13.4,12L17,15.6z"></path>
                        </svg>
                        :
                        <svg className="add-post-svg" fill="gray" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M17,13h-4v4h-2v-4H7v-2h4V7h2v4h4V13z"></path>
                        </svg>
                    }
                </button>
                {showCreateForm && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3 className='edit-post'>Create Post</h3>
                            <PostForm
                                onSubmit={handleCreatePost}
                                title=""
                                setTitle={setEditTitle}
                                content=""
                                setContent={setEditContent}
                            />
                            <div className="button-container">
                                <button className="button-post cancel-button-post" onClick={() => setShowCreateForm(false)}>Cancelar</button>
                            </div>
                        </div>  
                    </div>
                )}
            </div>

            <main>
                <div className="posts-container">
                    {posts.map(post => (
                        <div key={post._id} className="post-card">
                            <div className="post-header">
                                <div className="post-info">
                                    {post.creatorProfilePicture && (
                                        <img className="profile-picture" src={`http://localhost:5000/uploads/${post.creatorProfilePicture}`} alt="Profile" />
                                    )}
                                    <span className="creator-username">{post.creatorUsername}</span>
                                </div>
                                <div className="post-score">
                                    <StarRating rating={post.averageScore} disabled />
                                </div>
                            </div>
                            <div className="post-content">
                                <h3 id='titulo-post'>{post.title}</h3>
                                <p id='contenido-post'>{post.content}</p>
                            </div>
                            <div className="post-actions">
                                <div className='puntuacion-usuario'>
                                    <span>Mi opinión: </span>
                                    <StarRating
                                        rating={post.userScore}
                                        onRate={(score) => handleScorePost(post._id, score)}
                                        disabled={editingPost !== null}
                                    />
                                </div>
                                {userId && post.createdBy === userId && (
                                    <div className="post-buttons">
                                        <button className="button-post" onClick={() => handleEditClick(post)}>Editar</button>
                                        <button className="button-post cancel-button-post" onClick={() => handleDeletePost(post._id)}>Borrar</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3 className='edit-post'>Edit Post</h3>
                        <PostForm
                            post={editingPost}
                            onSubmit={handleEditPost}
                            title={editTitle}
                            setTitle={setEditTitle}
                            content={editContent}
                            setContent={setEditContent}
                        />
                        <div className="button-container">
                            <button className="button-post cancel-button-post" onClick={() => setShowEditModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostSystem;
