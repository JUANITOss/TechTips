import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
//import './HomePage.css';
//import '../pageStyles/NavbarHome.css';

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
        // <div>
        //     <nav className="navbarHome">
        //         <button className="logout-button" onClick={handleLogout}>Logout</button>
        //         <div className="logo">
        //             <img src="/imagenes/wally.png" alt="Logo Wally" />
        //         </div>
        //         <img 
        //             src={`http://localhost:5000/uploads/${user.profilePicture}`} 
        //             alt="Profile" 
        //             className="profile-picture" 
        //             onClick={() => navigate('/editProfile')}
        //         />
        //     </nav>
        //     <div className="homepage-content">
        //         <div className="section-buttons">
        //             <Link to="/postSystem" className="no-underline">
        //                 <div className="section-button">
        //                     <img src="/imagenes/foro.png" alt="Placeholder" className="section-image" />
        //                     <h2>Foro</h2>
        //                 </div>
        //             </Link>
        //             <Link to="/FAQ" className="no-underline">
        //             <div className="section-button">
        //                 <img src="/imagenes/preguntas_frecuentes.png" alt="preguntas_frecuentes_img" className="section-image" />
        //                 <h2>Preguntas Frecuentes</h2>
        //             </div>
        //             </Link>
        //             <Link to="/sendMessage" className="no-underline">
        //             <div className="section-button">
        //                 <img src="/imagenes/basura_inutil.png" alt="Placeholder" className="section-image" />
        //                 <h2>Telegram Bot</h2>
        //             </div>
        //             </Link>
        //             <Link to="/tutorials" className="no-underline">
        //             <div className="section-button">
        //                 <img src="/imagenes/videos_tutoriales.png" alt="Placeholder" className="section-image" />
        //                 <h2>Videos Tutoriales</h2>
        //             </div>
        //             </Link>
        //             <Link to="/chatbot" className="no-underline">
        //             <div className="section-button">
        //                 <img src="/imagenes/chatbot.png" alt="Placeholder" className="section-image" />
        //                 <h2>Chatbot</h2>
        //             </div>
        //             </Link>
        //         </div>
        //     </div>
        // </div>

        <div
  class="max-w-md mx-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden"
>
  <div class="flex flex-col h-[400px]">
    <div class="px-4 py-3 border-b dark:border-zinc-700">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-zinc-800 dark:text-white">
          Chatbot Assistant
        </h2>
        <div class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Online
        </div>
      </div>
    </div>
    <div
      class="flex-1 p-3 overflow-y-auto flex flex-col space-y-2"
      id="chatDisplay"
    >
      <div
        class="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm"
      >
        Hello! How can I assist you today?
      </div>
      <div
        class="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm"
      >
        Hello! I need a Chatbot!
      </div>
    </div>
    <div class="px-3 py-2 border-t dark:border-zinc-700">
      <div class="flex gap-2">
        <input
          placeholder="Type your message..."
          class="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
          id="chatInput"
          type="text"
        />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
          id="sendButton"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</div>


    );
};

export default HomePage;
