import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import './SendMessageForm.css'; // Estilos específicos del componente

const SendMessageForm = () => {
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para el pop-up de añadir contacto
  const [showTutorialModal, setShowTutorialModal] = useState(false); // Estado para el pop-up de tutorial
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

  const toggleTutorialModal = () => {
    setShowTutorialModal(!showTutorialModal);
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
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 md:px-6 border-b">
        <div className="container max-w-6xl mx-auto flex items-center justify-between">
          <Link className="flex items-center gap-2" to="/homePage">
            <img src="/imagenes/wally.png" alt="Logo Wally" className='w-20 h-20'/>
            <span className="font-semibold text-lg">TechTips</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="center-container">
            <div className="message-form">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 lg:mb-10 text-black">
                Contactar Asistente 
              </h2>
              <form onSubmit={handleSubmit} className="form-content">
                <div className="form-group">
                  <label className="text-lg mb-2">Contact:</label>
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
                </div>
                <div className="form-group">
                  <label className="text-lg mb-2">Message:</label>
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    rows="4"
                    cols="50"
                    required
                  />
                </div>
                <button type="submit" className="submit-button">Send Message</button>
              </form>
              <button onClick={toggleModal} className="submit-button">Add Contact</button>
            </div>
            {showModal && (
              <div className="modal">
                <div className="modal-content smaller">
                  <h2>Add Contact</h2>
                  <form>
                    <div className="form-group">
                      <label>Name:</label>
                      <input
                        type="text"
                        value={newContactName}
                        onChange={handleNewContactChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Contact ID:</label>
                      <input
                        type="text"
                        value={newContactId}
                        onChange={handleNewContactIdChange}
                        required
                      />
                    </div>
                    <button type="button" className="submit-button" onClick={handleCreateContact}>Create Contact</button>
                    <button type="button" className="submit-button" onClick={toggleModal}>Cancel</button>
                  </form>
                </div>
              </div>
            )}
            <div className="popup">
              <button className="popup-button" onClick={toggleTutorialModal}>Tutorial</button>
              {showTutorialModal && (
                <div className="modal">
                  <div className="modal-content">
                    <h2>Tutorial</h2>
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
                    <button className="popup-close" onClick={toggleTutorialModal}>Cerrar</button>
                  </div>
                </div>
              )}
            </div>
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

export default SendMessageForm;
