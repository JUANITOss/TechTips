import React from 'react';
import './VideoTutorials.css';
import '../pageStyles/NavbarComponents.css';

const VideoTutorials = () => {
    const videos = [
        {
            link: 'https://www.youtube.com/watch?v=jrujkYObjB8',
            thumbnail: 'https://img.youtube.com/vi/jrujkYObjB8/0.jpg',
            title: 'Configurar WhatsApp',
            description: 'Tutorial de cómo configurar nuestro WhatsApp de manera rápida y sencilla.',
        },
        {
            link: 'https://www.youtube.com/watch?v=vkUDiAk_5rg',
            thumbnail: 'https://img.youtube.com/vi/vkUDiAk_5rg/0.jpg',
            title: 'Búsquedas por el navegador web Google',
            description: 'Tutorial de cómo buscar en Google de manera eficaz y rápida.',
        },
        {
            link: 'https://www.youtube.com/watch?v=TGpRXtWiR5A',
            thumbnail: 'https://img.youtube.com/vi/TGpRXtWiR5A/0.jpg',
            title: 'Configuración Android',
            description: 'Tutorial de cómo configurar nuestro primer teléfono móvil con sistema operativo Android.',
        },
        {
            link: 'https://www.youtube.com/watch?v=I_oG6clqrIs',
            thumbnail: 'https://img.youtube.com/vi/I_oG6clqrIs/0.jpg',
            title: 'Consejos de seguridad para el uso de redes sociales',
            description: 'Video descriptivo de consejos para nuestra privacidad al utilizar redes sociales.',
        },
        {
            link: 'https://www.youtube.com/watch?v=Tuovqi52pEE',
            thumbnail: 'https://img.youtube.com/vi/Tuovqi52pEE/0.jpg',
            title: 'Evitar caer en estafas por correo electrónico',
            description: 'Consejos para evitar caer en correos electrónicos que busquen robarnos información o estafarnos.',
        },
    ];

    return (
        <div className="video-tutorials-container">
            <nav className="navbarComponent">
                <div className="navbar-left">
                    <a href="/homePage">←</a>
                </div>
                <div className="navbar-center">
                    <span>TechTips</span>
                </div>
            </nav>


            {videos.map((video, index) => (
                <div key={index} className="video-card">
                    <a href={video.link} target="_blank" rel="noopener noreferrer">
                        <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                    </a>
                    <div className="video-content">
                        <h2 className="video-title">{video.title}</h2>
                        <p className="video-description">{video.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideoTutorials;
