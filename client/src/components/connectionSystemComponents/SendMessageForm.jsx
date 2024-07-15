import React, { useState, useEffect } from 'react';
import api from '../../api';
import './SendMessageForm.css';

const SendMessageForm = ({ userId }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  const [message, setMessage] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newChatId, setNewChatId] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.get('contacts/userContacts');
      setContacts(response.data.contacts);
      setSelectedContact(response.data.contacts.length > 0 ? response.data.contacts[0].chatId : '');
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleContactChange = (e) => {
    setSelectedContact(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleNewContactChange = (e) => {
    setNewContactName(e.target.value);
  };

  const handleNewChatIdChange = (e) => {
    setNewChatId(e.target.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCreateContact = async () => {
    try {
      const response = await api.post('/contacts/addContact', {
        name: newContactName,
        chatId: newChatId,
      });
      const createdContact = response.data.contact;
      setContacts([...contacts, createdContact]);
      setNewContactName('');
      setNewChatId('');
      toggleModal(); // Close modal after successful creation
      alert('Contact created successfully!');
    } catch (error) {
      alert('Failed to create contact.');
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/telegram/send-message', {
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
    <div className="send-message-container">
      
      <nav className="navbarComponent">
        <div className="navbar-left">
          <a href="/homePage">←</a>
        </div>
        <div className="navbar-center">
          <span>TechTips</span>
        </div>
      </nav>

      <div className={`center-container ${showModal ? 'modal-open' : ''}`}>
        <div className="message-form">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-group">
              <label>
                Contact:
                <select value={selectedContact} onChange={handleContactChange}>
                  {contacts.map((contact) => (
                    <option key={contact._id} value={contact.chatId}>
                      {contact.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                Message:
                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  rows="4"
                  cols="50"
                />
              </label>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
          <button onClick={toggleModal} className="submit-button">Add Contact</button>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add Contact</h2>
              <form>
                <div className="form-group">
                  <label>
                    Name:
                    <input
                      type="text"
                      value={newContactName}
                      onChange={handleNewContactChange}
                      required
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Chat ID:
                    <input
                      type="text"
                      value={newChatId}
                      onChange={handleNewChatIdChange}
                      required
                    />
                  </label>
                </div>
                <button type="button" className="submit-button" onClick={handleCreateContact}>Create Contact</button>
                <button type="button" className="submit-button" onClick={toggleModal}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendMessageForm;
