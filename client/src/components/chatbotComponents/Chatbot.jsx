import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import api from '../../api';  // Ajusta la ruta según sea necesario

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
    <div className="chatbot-container">
      <nav className="navbarComponent">
        <div className="navbar-left">
          <a href="/homePage">←</a>
        </div>
        <div className="navbar-center logo">
          <img src="/imagenes/chatbot.png" alt="Logo Wally" />
        </div>
      </nav>
      <div className="chat-log-container">
        <div className="chat-log">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <strong>{msg.sender === 'user' ? 'Tú' : 'Chatbot'}: </strong>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
          />
          <button className="button" type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
