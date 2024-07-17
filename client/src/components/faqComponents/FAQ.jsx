import React, { useState } from 'react';
import './FAQ.css';
import '../pageStyles/NavbarComponents.css';
import { Link } from 'react-router-dom';

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
    { question: "¿Qué es una aplicación y cómo la instalo en mi teléfono?", answer: "Una aplicación es un programa que puedes descargar y usar en tu teléfono para diferentes propósitos, como redes sociales, juegos, productividad y más. En TechTips, te explicamos cómo buscar, descargar e instalar aplicaciones desde la tienda de aplicaciones de tu dispositivo." },
    { question: "¿Cómo puedo ver videos en YouTube?", answer: "YouTube es una plataforma de videos en línea donde puedes ver contenido creado por usuarios de todo el mundo. En TechTips, te mostramos cómo buscar videos, suscribirte a canales, crear listas de reproducción y disfrutar de YouTube de manera segura." },
    { question: "¿Qué es el streaming de música y cómo lo uso?", answer: "El streaming de música te permite escuchar canciones en línea sin necesidad de descargarlas. En TechTips, te explicamos cómo suscribirte a servicios de streaming como Spotify, Apple Music o Amazon Music, buscar y reproducir música, y crear listas de reproducción personalizadas." },
    { question: "¿Cómo puedo cambiar la configuración de privacidad en mis cuentas en línea?", answer: "Ajustar la configuración de privacidad te ayuda a controlar quién puede ver tu información en plataformas en línea. En TechTips, te mostramos cómo acceder a la configuración de privacidad en redes sociales, servicios de correo electrónico y otras cuentas en línea para proteger tu información personal." },
    { question: "¿Qué es un emoji y cómo los uso en mis mensajes?", answer: "Los emojis son iconos que puedes añadir a tus mensajes para expresar emociones y ideas. En TechTips, te enseñamos cómo encontrar y usar emojis en diferentes aplicaciones y dispositivos, y cómo personalizar tu selección de emojis favoritos." },
    { question: "¿Cómo puedo compartir archivos entre dispositivos?", answer: "Compartir archivos te permite enviar documentos, fotos y otros archivos entre dispositivos diferentes. En TechTips, te mostramos cómo usar servicios de almacenamiento en la nube, aplicaciones de mensajería y transferencias directas para compartir archivos de manera fácil y segura." },
    { question: "¿Qué es un podcast y cómo puedo escucharlo?", answer: "Un podcast es un programa de audio que puedes escuchar en línea o descargar para escucharlo más tarde. En TechTips, te mostramos cómo buscar, suscribirte y escuchar podcasts sobre diferentes temas, desde noticias hasta entretenimiento y educación." },
];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 md:px-6 border-b">
          <div className="mx-auto flex items-center justify-between">
            <Link className="flex items-center gap-2" to="/homePage">
              <img src="/imagenes/left_arrow.png" alt="Back" className='h-[20px]'/>
            </Link>
            <img src="/imagenes/wally.png" alt="Logo Wally" className='w-12 h-12 cursor-pointer'/>

          </div>
        </header>
      <main className="flex-1 py-8">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 lg:mb-10">
            Preguntas Frecuentes
          </h1>
          <div className="mb-6 md:mb-8 lg:mb-10">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar preguntas..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 flex flex-col items-start justify-start text-left mb-4"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="font-semibold text-lg mb-2 w-full flex items-center justify-between"
                >
                  {faq.question}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`w-6 h-6 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {openIndex === index && (
                  <p className="text-gray-700">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-gray-200 py-4">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-center">
          <p className="text-sm text-gray-600">&copy; 2024 TechTips. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
