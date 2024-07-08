import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Selecciona una sección:</h1>
      <div>
        <h2>Foro (Posts)</h2>
        <Link to="/postSystem">Ir al Foro</Link>
      </div>
      <div>
        <h2>Preguntas Frecuentes (Próximamente)</h2>
        <p>En construcción</p>
      </div>
      <div>
        <h2>Helpdesk (Próximamente)</h2>
        <p>En construcción</p>
      </div>
      <div>
        <h2>Videos Tutoriales (Próximamente)</h2>
        <p>En construcción</p>
      </div>
      <div>
        <h2>Chatbot (Próximamente)</h2>
        <p>En construcción</p>
      </div>
    </div>
  );
};

export default HomePage;
