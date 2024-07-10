import React, { useState } from 'react';
import api from '../../api';  // Ajusta la ruta según sea necesario
import '../pageStyles/NavbarComponents.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await api.post('/chatbot', { prompt: input });
      const botMessage = { sender: 'bot', text: response.data.generatedText || 'No se obtuvo respuesta de la IA' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      const errorMessage = { sender: 'bot', text: `Error al obtener respuesta de la IA: ${error.response ? error.response.data.details : error.message}` };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }

    setInput('');
  };

  return (
    <div>
      
      <nav className="navbarComponent">
          <div className="navbar-left">
            <a href="/homePage">←</a>
          </div>
          <div className="navbar-center">
            <span>TechTips</span> 
          </div>
      </nav>

      <h2>Chatbot</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <strong>{msg.sender === 'user' ? 'Tú' : 'Chatbot'}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chatbot;
