import React from 'react';
import './VideoTutorials.css';
import '../pageStyles/NavbarComponents.css';

const VideoTutorials = () => {
    const videos = [
        {
            link: 'https://www.youtube.com/watch?v=example1',
            thumbnail: 'https://img.youtube.com/vi/example1/0.jpg',
            title: 'Video Title 1',
            description: 'This is a short description for video 1.',
        },
        {
            link: 'https://www.youtube.com/watch?v=example2',
            thumbnail: 'https://img.youtube.com/vi/example2/0.jpg',
            title: 'Video Title 2',
            description: 'This is a short description for video 2.',
        },
        {
            link: 'https://www.youtube.com/watch?v=example3',
            thumbnail: 'https://img.youtube.com/vi/example3/0.jpg',
            title: 'Video Title 3',
            description: 'This is a short description for video 3.',
        },
        {
            link: 'https://www.youtube.com/watch?v=example4',
            thumbnail: 'https://img.youtube.com/vi/example4/0.jpg',
            title: 'Video Title 4',
            description: 'This is a short description for video 4.',
        },
        {
            link: 'https://www.youtube.com/watch?v=example5',
            thumbnail: 'https://img.youtube.com/vi/example5/0.jpg',
            title: 'Video Title 5',
            description: 'This is a short description for video 5.',
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
