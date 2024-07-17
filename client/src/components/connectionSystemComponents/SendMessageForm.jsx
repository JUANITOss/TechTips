import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import './SendMessageForm.css'; 

const SendMessageForm = () => {
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [showTutorialModal, setShowTutorialModal] = useState(false); 
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
          <div className="mx-auto flex items-center justify-between">
            <Link className="flex items-center gap-2" to="/homePage">
              <img src="/imagenes/left_arrow.png" alt="Back" className='h-[20px] border hover:border-violet-700 rounded'/>
            </Link>
            <img src="/imagenes/wally.png" alt="Logo Wally" className='w-12 h-12'/>

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
                  <label className="text-lg mb-2">Asistente:</label>
                  <div className="select-wrapper">
                    <select
                      className="py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                      value={contactId}
                      onChange={(e) => setContactId(e.target.value)}
                      required
                    >
                      <option value="">Seleccionar un Asistente</option>
                      {contacts.map((contact) => (
                        <option key={contact._id} value={contact.contactId}>
                          {contact.name}
                        </option>
                      ))}
                    </select>
                </div>

                </div>
                <div className="form-group">
                  <label className="text-lg mb-2">Mensaje a enviar:</label>
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    rows="4"
                    cols="50"
                    required
                  />
                </div>
                <button type="submit" className="submit-button">Enviar</button>
              </form>
              <button onClick={toggleModal} className="submit-button">Añadir Asistente</button>
            </div>
            {showModal && (
              <div className="modal">
                <div className="modal-content smaller">
                  <h2>Añadir Asistente</h2>
                  <form>
                    <div className="form-group">
                      <label>Nombre:</label>
                      <input
                        type="text"
                        value={newContactName}
                        onChange={handleNewContactChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>ID de contacto:</label>
                      <input
                        type="text"
                        value={newContactId}
                        onChange={handleNewContactIdChange}
                        required
                      />
                    </div>
                    <button type="button" className="submit-button" onClick={handleCreateContact}>Agregar</button>
                    <button type="button" className="submit-button" onClick={toggleModal}>Cancelar</button>
                  </form>
                </div>
              </div>
            )}
            <div className="popup">
              <button className="submit-button" id="tutorial-button" onClick={toggleTutorialModal}>Tutorial</button>
              {showTutorialModal && (
                <div className="modal">
                  <div className="modal-content">
                    <h2>Tutorial</h2>
                    <p className="disclaimer">
                      Como agrego un asistente?
                      <br />
                      <br />
                      <p>Para contactar con su asistente desde nuestra aplicación deberá realizar los siguientes pasos:</p>
                      <br />
                      <br />
                      <b>PASO 1: Obtener el Id del asistente por agregar</b>
                      <br />
                      Para obtener el Id, el asistente debe abrir la barra de búsqueda de Telegram, tipear userinfobot,seleccionar alguno de todos y copiar el id que le devuelva al campo de Contact Id al momento de agregar un nuevo asistente, el nombre puede ser personalizado.
                      <br />
                      <br />
                      <b>PASO 2: Sincronizar al asistente con nuestro bot</b>
                      <br />
                      Para sincronizar al asistente con nuestro bot, el asistente debe
                      <span><b><a href="https://web.telegram.org/k/#@techTipsMcPrisma_bot" target="_blank" parse_mode='html'> Presionar este texto para ir a bot e iniciar conversacion con el</a></b></span>
                      <br />
                      <br />
                      <p><b>PASO 3: Ya está!</b></p>
                      <p>Una vez esté iniciado el chat, usted debe seleccionar a su asistente recién agregado desde el selector y escribir su mensaje.</p> 
                    </p>
                    <button className="submit-button" onClick={toggleTutorialModal}>Cerrar</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SendMessageForm;
