import React, { useState } from 'react';
import api from '../../api';

const contacts = [
  { id: 1, name: 'Contact 1', chatId: 'chat_id_1' },
  { id: 2, name: 'Contact 2', chatId: 'chat_id_2' },
  { id: 3, name: 'Contact 3', chatId: 'chat_id_3' },
];

const SendMessageForm = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0].chatId);
  const [message, setMessage] = useState('');

  const handleContactChange = (e) => {
    setSelectedContact(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/telegram/send', {
        chatId: selectedContact,
        message: message,
      });
      if (response.data.success) {
        alert('Message sent successfully!');
        setMessage('');
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      alert('An error occurred while sending the message.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Envia un mensaje:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Contacto:
            <select value={selectedContact} onChange={handleContactChange}>
              {contacts.map((contact) => (
                <option key={contact.id} value={contact.chatId}>
                  {contact.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Mensaje:
            <textarea
              value={message}
              onChange={handleMessageChange}
              rows="4"
              cols="50"
            />
          </label>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default SendMessageForm;
