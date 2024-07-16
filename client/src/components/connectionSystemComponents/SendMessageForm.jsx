import React, { useState, useEffect } from 'react';
import api from '../../api'; // Importa la instancia de Axios
import './SendMessageForm.css';

const SendMessageForm = () => {
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactId, setNewContactId] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get('/contacts/userContacts');
        setContacts(response.data.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/telegram/sendMessage', { contactId, messageText });
      setStatusMessage(response.data.message);
      setContactId('');
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
      setStatusMessage('Failed to send message');
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleNewContactChange = (e) => {
    setNewContactName(e.target.value);
  };

  const handleNewContactIdChange = (e) => {
    setNewContactId(e.target.value);
  };

  const handleCreateContact = async () => {
    try {
      await api.post('/contacts/addContact', { name: newContactName, contactId: newContactId });
      const response = await api.get('/contacts/userContacts');
      setContacts(response.data.contacts);
      setNewContactName('');
      setNewContactId('');
      toggleModal();
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <div className="send-message-container">
      <nav className="navbarComponent">
        <div className="navbar-left">
          <a href="/homePage">←</a>
        </div>
        <div className="navbar-center logo">
          <img src="/imagenes/basura_inutil.png" alt="basura Wally" />
        </div>
      </nav>

      <div className={`center-container ${showModal ? 'modal-open' : ''}`}>
        <div className="message-form">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-group">
              <label>
                Contact:
                <select
                  className='select-contacts'
                  value={contactId}
                  onChange={(e) => setContactId(e.target.value)}
                  required
                >
                  <option value="">Select a contact</option>
                  {contacts.map((contact) => (
                    <option key={contact._id} value={contact.contactId}>
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
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows="4"
                  cols="50"
                  required
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
                    Contact ID:
                    <input
                      type="text"
                      value={newContactId}
                      onChange={handleNewContactIdChange}
                      required
                    />
                  </label>
                </div>
                <p className="disclaimer">
                Como agrego un asistente?
                
<br />
<br />
<b>PASO 1: Obtener el Id del asistente por agregar</b>
<br />
Para obtener el Id, el asistente debe abrir la barra de búsqueda de Telegram, tipear userinfobot y copiar el id que le devuelva al campo de Contact Id al momento de agregar un nuevo asistente, el nombre puede ser personalizado.
<br />
<br />
<b>PASO 2: Sincronizar al asistente con nuestro bot</b>
<br />
Para sincronizar al asistente con nuestro bot, el asistente debe abrir la siguiente url e iniciar el chat: http://t.me/techTipsMcPrisma_bot
<br />
<br />
<b>PASO 3: Ya está! Ahora el usuario debe seleccionar a su asistente desde el selector y escribir su mensaje.</b>
                </p>
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