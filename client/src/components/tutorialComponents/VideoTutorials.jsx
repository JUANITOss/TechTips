import React, { useState, useEffect } from 'react';
import api from '../../api';
import './VideoTutorials.css';
import '../pageStyles/NavbarComponents.css';

const VideoTutorials = () => {
    const [user, setUser] = useState({});

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
    ];

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 md:px-6 lg:py-12">
                {videos.map((video, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                        <a className="absolute inset-0 z-10" href={video.link} target="_blank" rel="noopener noreferrer"></a>
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            width="400"
                            height="225"
                            className="object-cover w-full aspect-video"
                        />
                        <div className="p-4 bg-background">
                            <h3 className="text-lg font-bold line-clamp-2 group-hover:text-violet-700">{video.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {video.description}
                            </p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default VideoTutorials;
