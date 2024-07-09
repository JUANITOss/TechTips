import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import './HomePage.css';

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
                navigate.push('/login');
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
                <h1>Selecciona una sección:</h1>
                <div className="section-button">
                    <h2>Foro</h2>
                    <Link to="/postSystem">Ir al Foro</Link>
                </div>
                <div className="section-button">
                    <h2>Preguntas Frecuentes (Próximamente)</h2>
                    <p>En construcción</p>
                </div>
                <div className="section-button">
                    <h2>Helpdesk (Próximamente)</h2>
                    <p>En construcción</p>
                </div>
                <div className="section-button">
                    <h2>Videos Tutoriales (Próximamente)</h2>
                    <p>En construcción</p>
                </div>
                <div className="section-button">
                    <h2>Chatbot (Próximamente)</h2>
                    <p>En construcción</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
