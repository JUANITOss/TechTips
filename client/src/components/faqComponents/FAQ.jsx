import React, { useState } from 'react';
import './FAQ.css';
import '../pageStyles/NavbarComponents.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setOpenIndex(null); // Close any open questions when search changes
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
    { question: "¿Qué es un navegador web y cómo lo uso?", answer: "Un navegador web es un programa que te permite acceder a internet y ver páginas web. Algunos ejemplos son Google Chrome, Firefox y Safari. En TechTips, te enseñamos cómo usar un navegador web para buscar información, acceder a sitios web y guardar tus páginas favoritas." },
    { question: "¿Cómo puedo proteger mi información personal en internet?", answer: "Proteger tu información personal en internet es crucial para evitar fraudes y robos de identidad. En TechTips, te damos consejos sobre cómo crear contraseñas seguras, reconocer correos electrónicos fraudulentos y ajustar la configuración de privacidad en tus cuentas en línea." },
    { question: "¿Qué es un antivirus y por qué lo necesito?", answer: "Un antivirus es un software que te ayuda a proteger tu computadora de virus y otros programas maliciosos. En TechTips, te explicamos cómo instalar y usar un antivirus para mantener tu dispositivo seguro y qué hacer si tu computadora está infectada." },
    { question: "¿Cómo puedo hacer una copia de seguridad de mis datos?", answer: "Hacer una copia de seguridad de tus datos te asegura que no perderás información importante si tu dispositivo falla. En TechTips, te mostramos cómo hacer copias de seguridad en un disco externo, en la nube y en otros dispositivos." },
    { question: "¿Qué es una actualización de software y por qué es importante?", answer: "Las actualizaciones de software son mejoras y correcciones que los desarrolladores hacen a sus programas. En TechTips, te explicamos cómo actualizar tus aplicaciones y sistemas operativos, y por qué mantenerlos actualizados es esencial para la seguridad y el rendimiento." },
    { question: "¿Cómo puedo usar Google Maps para encontrar direcciones?", answer: "Google Maps es una herramienta útil para encontrar direcciones y navegar de un lugar a otro. En TechTips, te mostramos cómo usar Google Maps para buscar direcciones, obtener indicaciones paso a paso y explorar lugares cercanos." },
    { question: "¿Qué es una aplicación de mensajería y cuáles son las más populares?", answer: "Las aplicaciones de mensajería te permiten enviar mensajes instantáneos a otros usuarios. Algunas de las más populares son WhatsApp, Facebook Messenger y Telegram. En TechTips, te enseñamos cómo descargar, instalar y usar estas aplicaciones para comunicarte con tus amigos y familiares." },
    { question: "¿Cómo puedo personalizar la pantalla de inicio de mi teléfono?", answer: "Personalizar la pantalla de inicio de tu teléfono te permite acceder rápidamente a tus aplicaciones favoritas. En TechTips, te mostramos cómo cambiar el fondo de pantalla, mover y organizar aplicaciones, y añadir widgets útiles." },
    { question: "¿Qué es el almacenamiento en caché y cómo afecta mi dispositivo?", answer: "El almacenamiento en caché guarda datos temporales en tu dispositivo para que las aplicaciones funcionen más rápido. En TechTips, te explicamos cómo borrar la caché para liberar espacio y solucionar problemas de rendimiento." },
    { question: "¿Cómo puedo conectarme a una red Wi-Fi?", answer: "Conectarse a una red Wi-Fi te permite acceder a internet sin usar datos móviles. En TechTips, te mostramos cómo buscar y conectarte a redes Wi-Fi disponibles, y cómo resolver problemas comunes de conexión." },
    { question: "¿Cómo puedo configurar mi correo electrónico en mi teléfono?", answer: "Configurar tu correo electrónico en tu teléfono te permite acceder a tus mensajes desde cualquier lugar. En TechTips, te mostramos cómo añadir tu cuenta de correo a la aplicación de correo predeterminada de tu dispositivo, ya sea Android o iOS." },
    { question: "¿Qué es una aplicación y cómo la instalo en mi teléfono?", answer: "Una aplicación es un programa que puedes descargar y usar en tu teléfono para realizar diferentes tareas. En TechTips, te explicamos cómo buscar, descargar e instalar aplicaciones desde la tienda de aplicaciones de tu dispositivo, como Google Play Store o App Store." },
    { question: "¿Cómo puedo tomar y compartir fotos con mi teléfono?", answer: "Tomar y compartir fotos con tu teléfono es una forma divertida de capturar y compartir momentos. En TechTips, te mostramos cómo usar la cámara de tu teléfono para tomar fotos y cómo compartirlas con tus amigos y familiares a través de mensajes o redes sociales." },
    { question: "¿Qué es un navegador web y cómo lo uso?", answer: "Un navegador web es una aplicación que te permite acceder a internet y visitar sitios web. En TechTips, te enseñamos cómo usar un navegador web como Google Chrome, Firefox o Safari para buscar información, guardar tus páginas favoritas y navegar de forma segura." },
    { question: "¿Cómo puedo proteger mi dispositivo con una contraseña?", answer: "Proteger tu dispositivo con una contraseña ayuda a mantener tu información segura. En TechTips, te mostramos cómo configurar una contraseña, un PIN o una huella digital en tu teléfono o tableta para mejorar la seguridad de tus datos." },
    { question: "¿Cómo puedo escuchar música en línea?", answer: "Escuchar música en línea es fácil con servicios de streaming como Spotify, Apple Music y YouTube Music. En TechTips, te guiamos sobre cómo crear una cuenta, buscar y reproducir tus canciones favoritas y crear listas de reproducción." },
    { question: "¿Qué es un PDF y cómo lo abro en mi dispositivo?", answer: "Un PDF es un formato de documento que se utiliza para compartir archivos de manera que se vean igual en cualquier dispositivo. En TechTips, te enseñamos cómo abrir y leer archivos PDF en tu teléfono o computadora usando aplicaciones gratuitas como Adobe Acrobat Reader." },
    { question: "¿Cómo puedo hacer videollamadas grupales?", answer: "Hacer videollamadas grupales te permite conectarte con varias personas al mismo tiempo. En TechTips, te explicamos cómo usar aplicaciones como Zoom, Microsoft Teams y Google Meet para organizar y participar en videollamadas grupales de forma sencilla." },
    { question: "¿Cómo puedo liberar espacio en mi teléfono?", answer: "Liberar espacio en tu teléfono es importante para mantener su buen rendimiento. En TechTips, te mostramos cómo eliminar aplicaciones y archivos innecesarios, limpiar la caché y utilizar almacenamiento en la nube para liberar espacio en tu dispositivo." },
    { question: "¿Qué es una actualización de software y por qué es importante?", answer: "Las actualizaciones de software son mejoras que los desarrolladores hacen a sus aplicaciones y sistemas operativos. En TechTips, te explicamos cómo actualizar tu software para obtener nuevas funciones, mejorar la seguridad y corregir errores en tu dispositivo." },
    { question: "¿Cómo puedo crear una cuenta en Instagram?", answer: "Instagram es una popular red social para compartir fotos y videos. En TechTips, te mostramos cómo descargar la aplicación, crear una cuenta y empezar a usar Instagram para seguir a tus amigos, compartir tus fotos y explorar contenido interesante." },
    { question: "¿Cómo puedo enviar mensajes de texto desde mi computadora?", answer: "Enviar mensajes de texto desde tu computadora puede ser útil si prefieres escribir en un teclado más grande. En TechTips, te explicamos cómo usar aplicaciones como WhatsApp Web y mensajes de Google para enviar y recibir mensajes de texto desde tu computadora." },
    { question: "¿Qué es un asistente virtual y cómo lo uso?", answer: "Un asistente virtual es una aplicación que te ayuda a realizar tareas mediante comandos de voz. En TechTips, te enseñamos cómo usar asistentes virtuales como Google Assistant, Siri y Alexa para realizar llamadas, enviar mensajes, obtener información y mucho más." },
    { question: "¿Cómo puedo conectar mi teléfono a una TV?", answer: "Conectar tu teléfono a una TV te permite ver contenido en una pantalla más grande. En TechTips, te mostramos cómo usar cables HDMI, Chromecast o AirPlay para conectar tu teléfono a tu TV y disfrutar de videos, fotos y aplicaciones en tu televisor." },
    { question: "¿Cómo puedo crear y gestionar contactos en mi teléfono?", answer: "Crear y gestionar contactos en tu teléfono te facilita la comunicación. En TechTips, te enseñamos cómo añadir nuevos contactos, editar información existente y organizar tus contactos en grupos para una gestión más sencilla." },
    { question: "¿Cómo puedo usar Google Drive para almacenar mis archivos?", answer: "Google Drive es un servicio de almacenamiento en la nube que te permite guardar y acceder a tus archivos desde cualquier dispositivo. En TechTips, te mostramos cómo subir, organizar y compartir tus archivos en Google Drive de manera segura y eficiente." },
    { question: "¿Cómo puedo escanear documentos con mi teléfono?", answer: "Escanear documentos con tu teléfono es fácil y conveniente. En TechTips, te enseñamos cómo usar aplicaciones como Adobe Scan o la cámara de tu teléfono para escanear documentos y guardarlos como archivos PDF o imágenes." },
    { question: "¿Cómo puedo hacer compras en línea de manera segura?", answer: "Hacer compras en línea es cómodo, pero es importante hacerlo de manera segura. En TechTips, te damos consejos sobre cómo elegir sitios web confiables, proteger tu información de pago y reconocer señales de posibles fraudes." },
    { question: "¿Cómo puedo compartir mi ubicación con amigos y familiares?", answer: "Compartir tu ubicación con amigos y familiares puede ser útil para mantenerte seguro y conectado. En TechTips, te mostramos cómo usar aplicaciones como Google Maps y WhatsApp para compartir tu ubicación en tiempo real." },
    { question: "¿Cómo puedo traducir texto usando mi teléfono?", answer: "Traducir texto usando tu teléfono es sencillo con aplicaciones como Google Translate. En TechTips, te enseñamos cómo traducir texto escrito, hablado o incluso desde imágenes usando tu teléfono." },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="faq-content">
        <h1>Frequently Asked Questions</h1>
        <input
          type="text"
          placeholder="Buscar preguntas..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="faq-search"
        />
        <ul className="faq-list">
          {filteredFaqs.map((faq, index) => (
            <li key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <div className="faq-question" onClick={() => toggleQuestion(index)}>
                <span>{faq.question}</span>
                <span className="toggle-icon">{openIndex === index ? '-' : '+'}</span>
              </div>
              {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FAQ;
