import React, { useState } from 'react';
import './FAQ.css';
import '../pageStyles/NavbarComponents.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { question: "¿Cómo puedo aprender a usar WhatsApp para comunicarme con mi familia?", answer: "WhatsApp es una aplicación de mensajería muy popular que te permite enviar mensajes de texto, realizar llamadas de voz y video, y compartir fotos y videos. En TechTips, tenemos un tutorial paso a paso que te mostrará cómo descargar la aplicación, crear una cuenta y empezar a usarla para mantenerte en contacto con tus seres queridos." },
    { question: "¿Qué es una videollamada y cómo la hago en mi teléfono?", answer: "Una videollamada es una llamada en la que puedes ver a la otra persona a través de la cámara de tu teléfono o computadora. Puedes hacer videollamadas usando aplicaciones como WhatsApp, Zoom o Skype. En TechTips, ofrecemos guías detalladas sobre cómo hacer videollamadas utilizando diferentes aplicaciones." },
    { question: "¿Cómo puedo enviar correos electrónicos y adjuntar archivos?", answer: "Enviar correos electrónicos es una forma rápida de comunicarte y compartir documentos con otras personas. En TechTips, te mostramos cómo crear una cuenta de correo electrónico, escribir y enviar correos, y adjuntar archivos como fotos y documentos a tus mensajes." },
    { question: "¿Qué son las redes sociales y cómo me registro en Facebook?", answer: "Las redes sociales son plataformas en línea donde puedes conectarte con amigos y familiares, compartir fotos y noticias, y seguir tus intereses. Facebook es una de las redes sociales más populares. En TechTips, tenemos una guía que te enseñará cómo crear una cuenta en Facebook y empezar a usarla." },
    { question: "¿Cómo puedo buscar información en Internet de manera segura?", answer: "Buscar información en Internet es una herramienta poderosa, pero es importante hacerlo de manera segura para evitar sitios web fraudulentos. En TechTips, te enseñamos cómo utilizar motores de búsqueda como Google, evaluar la credibilidad de los sitios web y proteger tu información personal mientras navegas." },
    { question: "¿Qué es una nube (cloud) y cómo guardo mis fotos en ella?", answer: "La nube es un espacio de almacenamiento en línea donde puedes guardar tus archivos, como fotos y documentos, para acceder a ellos desde cualquier dispositivo con Internet. En TechTips, ofrecemos tutoriales sobre cómo usar servicios de almacenamiento en la nube como Google Drive, Dropbox y iCloud para guardar y organizar tus fotos." },
    { question: "¿Cómo instalo nuevas aplicaciones en mi teléfono o tableta?", answer: "Instalar nuevas aplicaciones te permite agregar más funcionalidades a tu dispositivo. En TechTips, te mostramos cómo buscar y descargar aplicaciones desde la tienda de aplicaciones de tu dispositivo, ya sea Google Play Store para Android o App Store para iOS." },
    { question: "¿Cómo puedo ver películas y series en línea?", answer: "Hay muchas plataformas de streaming como Netflix, Amazon Prime y Disney+ donde puedes ver películas y series en línea. En TechTips, te guiamos sobre cómo suscribirte a estos servicios, buscar contenido y empezar a disfrutar de tus programas favoritos." },
    { question: "¿Qué es la banca en línea y cómo puedo usarla de manera segura?", answer: "La banca en línea te permite gestionar tus finanzas desde tu computadora o teléfono. En TechTips, te enseñamos cómo acceder a la banca en línea, realizar transacciones y mantener tus datos bancarios seguros mediante buenas prácticas de seguridad." },
    { question: "¿Cómo configuro mi dispositivo para que sea accesible para mí?", answer: "Los dispositivos modernos tienen muchas opciones de accesibilidad para ayudar a personas con diferentes necesidades. En TechTips, te mostramos cómo ajustar el tamaño del texto, usar la función de dictado por voz, activar el modo de alto contraste y otras configuraciones que pueden hacer tu dispositivo más fácil de usar." },
  ];

  return (
    <div className="faq-container">
      <nav className="navbarComponent">
        <div className="navbar-left">
          <a href="/homePage">←</a>
        </div>
        <div className="navbar-center logo">
          <img src="/imagenes/preguntas_frecuentes.png" alt="FAQ Wally" />
        </div>
      </nav>

      <h1>Frequently Asked Questions</h1>
      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleQuestion(index)}>
              <span>{faq.question}</span>
              <br />
              <br />
              <span className="toggle-icon">{openIndex === index ? 'v' : '^'}</span>
            </div>
            {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
