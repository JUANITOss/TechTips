import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import '../../index.css';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput(''); // Borrar el campo de entrada inmediatamente después de añadir el mensaje

        try {
            const response = await api.post('/chatbot', { prompt: input });
            const botMessage = { sender: 'bot', text: response.data.generatedText || 'No se obtuvo respuesta de la IA' };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            const errorMessage = { sender: 'bot', text: `Error al obtener respuesta de la IA: ${error.response ? error.response.data.details : error.message}` };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        }
    };

    return (
        <main className="flex-1">
            <div className="mx-auto bg-background shadow-md rounded-lg overflow-hidden">
                <div class="flex flex-col min-h-screen max-h-screen rounded-lg bg-background">
                    <div className="flex flex-col min-h-[100vh] bg-background">
                        <header className="px-4 md:px-6 border-b">
                            <div className="mx-auto flex items-center justify-between">
                                <Link className="flex items-center py-4 px-6 gap-2" to="/homePage">
                                    <img src="/imagenes/left_arrow.png" alt="Back" className='h-[20px]'/>
                                </Link>
                            </div>
                        </header>
                    {/* Contenido principal del chatbot */}
                    <div class="text-primary-foreground py-4 px-6 flex items-center rounded-lg justify-center">
                        <div class="flex items-center gap-3">
                        <span class="relative flex overflow-hidden rounded-full w-8 h-8">
                            
                            <img src="/imagenes/wally.png" alt="Logo Wally" className='w-12 h-12 flex h-full w-full items-center justify-center rounded-full bg-muted'/>
                            
                        </span>
                        <div>
                            <h2 class="font-medium">Wally</h2>
                            <p class="text-sm text-primary-foreground/80">Online</p>
                        </div>
                        </div>
                    </div>
                    
                    {/* Visualización de mensajes */}
                    <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2" id="chatDisplay">
                        {messages.map((message, index) => (
                            <div 
                                key={index} 
                                className={`chat-message ${message.sender === 'user' ? 'self-end bg-blue-500 text-white' : 'self-start bg-violet-700 text-white'} max-w-xs rounded-lg px-3 py-1.5 text-sm`}
                            >
                                {message.sender === 'bot' ? (
                                    <ReactMarkdown>{message.text}</ReactMarkdown>
                                ) : (
                                    <p>{message.text}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Formulario de entrada para enviar mensajes al chatbot */}
                    <div class="bg-background px-6 py-4 border-t">
                        <div class="relative">
                        <form onSubmit={handleSubmit} class="flex min-h-[80px] w-full border border-input bg-neutral-700 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-16 rounded-lg resize-none">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe tu mensaje..."
                                className="w-full px-4 py-2 rounded-lg bg-neutral-700 focus:outline-none focus:border-primary"
                            />
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-violet-700 hover:text-accent-foreground h-10 w-10 absolute top-1/2 -translate-y-1/2 right-2"
                            type="submit"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="w-5 h-5"
                            >
                            <path d="m22 2-7 20-4-9-9-4Z"></path>
                            <path d="M22 2 11 13"></path>
                            </svg>
                            <span class="sr-only">Send</span>
                        </button>
                        </form>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </main>
        
        
    );
};

{/* <div class="bg-background px-6 py-4 border-t">
    <div class="relative">
      <form onSubmit={handleSubmit}>
        class="flex min-h-[80px] w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-16 rounded-lg resize-none"
        placeholder="Type your message..."
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 absolute top-1/2 -translate-y-1/2 right-2"
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5"
        >
          <path d="m22 2-7 20-4-9-9-4Z"></path>
          <path d="M22 2 11 13"></path>
        </svg>
        <span class="sr-only">Send</span>
      </button>
      </form>
    </div>
  </div> */}

export default Chatbot;
