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
                <h1 className="navbar-title">TechTips</h1>
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
                            <img src="path/to/placeholder-image.png" alt="Placeholder" className="section-image" />
                            <h2>Foro</h2>
                        </div>
                    </Link>
                    <Link to="/FAQ" className="no-underline">
                    <div className="section-button">
                        <img src="path/to/placeholder-image.png" alt="Placeholder" className="section-image" />
                        <h2>Preguntas Frecuentes</h2>
                    </div>
                    </Link>
                    <Link className="no-underline">
                    <div className="section-button">
                        <img src="path/to/placeholder-image.png" alt="Placeholder" className="section-image" />
                        <h2>""""""Referidos"""""" (Próximamente)</h2>
                    </div>
                    </Link>
                    <Link to="/tutorials" className="no-underline">
                    <div className="section-button">
                        <img src="path/to/placeholder-image.png" alt="Placeholder" className="section-image" />
                        <h2>Videos Tutoriales</h2>
                    </div>
                    </Link>
                    <Link to="/chatbot" className="no-underline">
                    <div className="section-button">
                        <img src="path/to/placeholder-image.png" alt="Placeholder" className="section-image" />
                        <h2>Chatbot</h2>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;