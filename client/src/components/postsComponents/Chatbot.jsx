import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const userMessage = { sender: 'user', text: userInput };
    setMessages([...messages, userMessage]);
    setUserInput('');

    try {
      const response = await axios.post('https://api.gemini.com/chat', {
        message: userInput,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer AIzaSyDJsdIl8ulGHR_urNpVmIXwEyvWmHeGQBw', // Asegúrate de reemplazar con tu token real
        }
      });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error communicating with the Gemini API', error);
      const errorMessage = { sender: 'bot', text: 'Error: Unable to communicate with the API' };
      setMessages([...messages, userMessage, errorMessage]);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.sender === 'user' ? 'right' : 'left',
              padding: '5px',
            }}
          >
            <strong>{message.sender === 'user' ? 'You' : 'Bot'}:</strong> {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        style={{ width: 'calc(100% - 30px)', padding: '5px', margin: '10px 0' }}
      />
      <button onClick={sendMessage} style={{ padding: '5px 10px' }}>
        Send
      </button>
    </div>
  );
};

export default Chatbot;
