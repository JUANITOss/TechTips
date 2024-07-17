import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import './VideoTutorials.css';
import '../pageStyles/NavbarComponents.css';

const VideoTutorials = () => {
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
        {
            link: 'https://www.youtube.com/watch?v=MZYzDZFhbb0',
            thumbnail: 'https://img.youtube.com/vi/MZYzDZFhbb0/0.jpg',
            title: 'Cómo usar Google Maps',
            description: 'Guía para utilizar Google Maps para buscar direcciones y lugares de interés.',
        },
        {
            link: 'https://www.youtube.com/watch?v=JfRzLkYUhsM',
            thumbnail: 'https://img.youtube.com/vi/JfRzLkYUhsM/0.jpg',
            title: 'Configurar una cuenta de correo electrónico en mi teléfono celular',
            description: 'Tutorial paso a paso para configurar una cuenta de correo electrónico en tu dispositivo móvil.',
        },
        {
            link: 'https://www.youtube.com/watch?v=jmAUii6Htog',
            thumbnail: 'https://img.youtube.com/vi/jmAUii6Htog/0.jpg',
            title: 'Uso básico de Excel',
            description: 'Introducción a las funciones básicas de Excel para gestionar datos y crear hojas de cálculo.',
        },
        {
            link: 'https://www.youtube.com/watch?v=gcIw6Ehz_zA',
            thumbnail: 'https://img.youtube.com/vi/gcIw6Ehz_zA/0.jpg',
            title: 'Cómo realizar videollamadas con Zoom',
            description: 'Guía completa para realizar videollamadas utilizando la aplicación Zoom.',
        },
        {
            link: 'https://www.youtube.com/watch?v=utdX2h9C1Dg',
            thumbnail: 'https://img.youtube.com/vi/utdX2h9C1Dg/0.jpg',
            title: 'Instalación y uso de aplicaciones en iPhone',
            description: 'Tutorial de cómo descargar, instalar y usar aplicaciones en un dispositivo iPhone.',
        }
    ];

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background">
            <header className="px-4 md:px-6 py-4 border-b">
                <div className="container max-w-6xl mx-auto flex items-center justify-between">
                    <a className="flex items-center gap-2" href="#" rel="ugc">
                        <img src="/imagenes/wally.png" alt="Logo Wally" className="w-20 h-20" />
                        <span className="font-semibold text-lg">TechTips</span>
                    </a>
                    <img
                        src={`http://localhost:5000/uploads/${user.profilePicture}`}
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                        onClick={() => navigate('/editProfile')}
                    />
                </div>
            </header>
            <main className="flex-1 py-12 md:py-16 lg:py-20">
                <div className="container max-w-6xl mx-auto px-4 md:px-6">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 lg:mb-10">
                        Video Tutoriales
                    </h1>
                    <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 md:mb-12 lg:mb-14">
                        Aprende nuevas habilidades con nuestros videos tutoriales.
                    </p>
                    <div className="video-thumbnail-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                        {videos.map((video, index) => (
                            <a
                                key={index}
                                className="group bg-card rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-card-hover transition-colors"
                                href={video.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="video-thumbnail w-full mb-4"
                                />
                                <h3 className="video-title text-lg font-semibold mb-2 group-hover:text-primary-foreground">{video.title}</h3>
                                <p className="video-descripcion text-muted-foreground text-sm group-hover:text-primary-foreground">
                                    {video.description}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="bg-muted py-6 md:py-8 lg:py-10">
                <div className="container max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <img src="/imagenes/wally.png" alt="Logo Wally" className="w-20 h-20" />
                        <span className="text-muted-foreground">© 2024 McPrisma.</span>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Link className="text-muted-foreground hover:text-foreground" to="/FAQ">
                            Preguntas Frecuentes
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
};

export default VideoTutorials;
