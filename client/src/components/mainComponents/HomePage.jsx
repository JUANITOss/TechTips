import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import './HomePage.css';
import '../pageStyles/NavbarHome.css';

const HomePage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/user/currentUser')
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleLogout = () => {
        api.post('/user/logout')
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div>
            <nav className="navbarHome">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
                <div className="logo">
                    <img src="/imagenes/wally.png" alt="Logo Wally" />
                </div>
                <img 
                    src={`http://localhost:5000/uploads/${user.profilePicture}`} 
                    alt="Profile" 
                    className="profile-picture" 
                    onClick={() => navigate('/editProfile')}
                />
            </nav>
            <div className="homepage-content">
                <div className="section-buttons">
                    <Link to="/postSystem" className="no-underline">
                        <div className="section-button">
                            <img src="/imagenes/foro.png" alt="Placeholder" className="section-image" />
                            <h2>Foro</h2>
                        </div>
                    </Link>
                    <Link to="/FAQ" className="no-underline">
                    <div className="section-button">
                        <img src="/imagenes/preguntas_frecuentes.png" alt="preguntas_frecuentes_img" className="section-image" />
                        <h2>Preguntas Frecuentes</h2>
                    </div>
                    </Link>
                    <Link to="/sendMessage" className="no-underline">
                    <div className="section-button">
                        <img src="/imagenes/basura_inutil.png" alt="Placeholder" className="section-image" />
                        <h2>Telegram Bot</h2>
                    </div>
                    </Link>
                    <Link to="/tutorials" className="no-underline">
                    <div className="section-button">
                        <img src="/imagenes/videos_tutoriales.png" alt="Placeholder" className="section-image" />
                        <h2>Videos Tutoriales</h2>
                    </div>
                    </Link>
                    <Link to="/chatbot" className="no-underline">
                    <div className="section-button">
                        <img src="/imagenes/chatbot.png" alt="Placeholder" className="section-image" />
                        <h2>Chatbot</h2>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
