import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import '../../index.css';

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
      <div className="flex flex-col min-h-[100dvh] bg-background">
        <header className="px-4 md:px-6 border-b">
          <div className="mx-auto flex items-center justify-between">
            <Link className="flex items-center gap-2" to="/homePage">
              <img src="/imagenes/wally.png" alt="Logo Wally" className='w-20 h-20'/>
              <span className="font-semibold text-lg">TechTips</span>
            </Link>
            <div className="flex items-center gap-4">
                <img 
                    src={`http://localhost:5000/uploads/${user.profilePicture}`} 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full cursor-pointer" 
                    onClick={() => navigate('/editProfile')}
                />
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
          </div>
        </header>
        <main className="flex-1 py-12 md:py-16 lg:py-20">
          <div className="container max-w-6xl mx-auto px-4 md:px-6">
            <div className="flex justify-center items-center">
              <img className='rounded-full object-cover h-90 w-90 -mb-64 -mt-64'
                src='/imagenes/17.png' alt='Logo TechTips'
              />
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-16 mb-6 md:mb-8 lg:mb-10 text-black">
              ¿Como podemos ayudarte?
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              <Link
                className="bg-gray-200 w-48 h-64 border border-transparent hover:border-violet-700 hover:text-violet-700 hover:stroke-violet-700 rounded-lg p-6 flex flex-col items-center justify-center text-center"
                to="/chatbot"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10 mb-4 text-primary group-hover:text-primary-foreground"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                </svg>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-foreground">ChatBot</h3>
                <p className="text-muted-foreground text-sm group-hover:text-primary-foreground">
                  Habla con Wally
                </p>
              </Link>
              <Link 
                className="bg-gray-200 w-48 h-64 border border-transparent hover:border-violet-700 hover:text-violet-700 hover:stroke-violet-700 rounded-lg p-6 flex flex-col items-center justify-center text-center"
                to="/sendMessage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10 mb-4 text-primary group-hover:text-primary-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-foreground">Contactar Asistente</h3>
                <p className="text-muted-foreground text-sm group-hover:text-primary-foreground">
                  Envia mensaje a un asistente
                </p>
              </Link>
              <Link
                className="bg-gray-200 w-48 h-64 border border-transparent hover:border-violet-700 hover:text-violet-700 hover:stroke-violet-700 rounded-lg p-6 flex flex-col items-center justify-center text-center"
                to="/tutorials"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10 mb-4 text-primary group-hover:text-primary-foreground"
                >
                  <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                  <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                </svg>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-foreground">Video Tutoriales</h3>
                <p className="text-muted-foreground text-sm group-hover:text-primary-foreground">
                  Aprende visualmente
                </p>
              </Link>
              <Link
                className="bg-gray-200 w-48 h-64 border border-transparent hover:border-violet-700 hover:text-violet-700 hover:stroke-violet-700 rounded-lg p-6 flex flex-col items-center justify-center text-center"
                to="/postSystem"
                rel="ugc"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10 mb-4 text-primary group-hover:text-primary-foreground"
                >
                  <path d="m8 2 1.88 1.88"></path>
                  <path d="M14.12 3.88 16 2"></path>
                  <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path>
                  <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path>
                  <path d="M12 20v-9"></path>
                  <path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path>
                  <path d="M6 13H2"></path>
                  <path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path>
                  <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path>
                  <path d="M22 13h-4"></path>
                  <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path>
                </svg>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-foreground">Foro</h3>
                <p className="text-muted-foreground text-sm group-hover:text-primary-foreground">
                  Soluciones de otros que podrian servirte
                </p>
              </Link>
            </div>
          </div>
        </main>

        <footer className="bg-muted py-6 md:py-8 lg:py-10">
          <div className="container max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/imagenes/mcPrisma.png" alt="Logo McPrisma" className='w-10 h-10'/>
              <span className="text-muted-foreground">© 2024 McPrisma.</span>
            </div>
            <nav className="flex items-center gap-4">
              <Link className="text-muted-foreground hover:text-foreground hover:text-violet-700" to="/FAQ">
                Preguntas Frecuentes
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    );
};

export default HomePage;
