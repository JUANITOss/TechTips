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
        <div className="flex flex-col min-h-[100vh] bg-background">
            <header className="px-4 md:px-6 border-b">
                <div className="container max-w-6xl mx-auto flex items-center justify-between">
                    <Link className="flex items-center gap-2" to="/homePage">
                        <img src="/imagenes/wally.png" alt="Logo Wally" className="w-20 h-20" />
                        <span className="font-semibold text-lg">TechTips</span>
                    </Link>
                    {/* Puedes agregar aquí elementos de navegación adicionales si es necesario */}
                </div>
            </header>
            <main className="flex-1 py-12 md:py-16 lg:py-20">
                <div className="container max-w-6xl mx-auto px-4 md:px-6">
                    {/* Contenido principal del chatbot */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 lg:mb-10 text-black">
                        ChatBot
                    </h1>
                    {/* Formulario de entrada para enviar mensajes al chatbot */}
                    <form onSubmit={handleSubmit} className="mb-8">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                        />
                        <button type="submit" className="ml-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover focus:outline-none">
                            Enviar
                        </button>
                    </form>
                    
                    {/* Visualización de mensajes */}
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`p-4 rounded-lg ${message.sender === 'user' ? 'bg-gray-200' : 'bg-gray-300'}`}>
                                {message.sender === 'bot' ? (
                                    <ReactMarkdown>{message.text}</ReactMarkdown>
                                ) : (
                                    <p className="text-sm">{message.text}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Chatbot;
