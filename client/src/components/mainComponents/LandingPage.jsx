import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const images = [
    "http://www.abuelosmodernos.com/example/slider01.jpg",
    "http://www.abuelosmodernos.com/example/slider02.jpg",
    "http://www.abuelosmodernos.com/example/slider03.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>

    <header className="fixed top-0 left-0 w-full px-4 md:px-6 z-10">
      <div className="mx-auto flex items-center justify-between gap-4 bg-transparent backdrop-blur-md">

        {/* Logotipo */}
        <div className="flex items-center">
          <img
            src="/imagenes/15.png" // Ruta relativa a la carpeta public
            alt="Logo"
            className="h-20 w-35 rounded-full"
          />
        </div>

        {/* Texto centrado
        <div className="flex-grow text-center ml-44">  
          <h1 className="text-white font-bold text-3xl">TechTips</h1> 
        </div> */}

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <Link to="/register" className="flex items-center py-4 px-6 gap-2">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-cyan-500 hover:bg-white hover:text-cyan-500 h-12 px-6 py-3">
              Registrarse
            </button>
          </Link>
          <Link to="/login" className="flex items-center py-4 px-6 gap-2">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-cyan-500 hover:bg-white hover:text-cyan-500 h-12 px-6 py-3">
              Ingresar
            </button>
          </Link>
        </div>
      </div>

    </header>

      <main>
      <div
          className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            minHeight: "75vh",
          }}
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover transition-all duration-1000"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>

          <div className="container relative mx-auto">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                  <h1 className="text-white font-bold text-5xl font-playfair">
                    Conectando generaciones, empoderando mentes.
                  </h1>
              </div>
            </div>
          </div>

        <section className="pb-20 bg-violet-700 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:-translate-y-2 duration-300">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                      <img src="/imagenes/wally.png" alt="Logo Wally" className='w-22 h-22 flex h-full w-full items-center justify-center rounded-full bg-muted'/>
                    </div>
                    <h6 className="text-xl font-semibold">Totalmente Gratis </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                    Contamos con un repertorio de utiles herramientas al alcance de tu mano
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:-translate-y-2 duration-300">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-blue-400">
                      <i className="fas fa-retweet"></i>
                      <img src="/imagenes/videos_tutoriales.png" alt="Logo Wally" className='w-22 h-22 flex h-full w-full items-center justify-center rounded-full bg-muted'/>
                    </div>
                    <h6 className="text-xl font-semibold">
                    Aprende de manera facil
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Videos explicativos, secciones para pedir ayuda, asistencia por IA 
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:-translate-y-2 duration-300">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-green-400">
                      <i className="fas fa-fingerprint"></i>
                      <img src="/imagenes/basura_inutil.png" alt="Logo Wally" className='w-22 h-22 flex h-full w-full items-center justify-center rounded-full bg-muted'/>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Compromiso en ayudarte
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      ¡Cada vez habran más y mejores funcionalidades para mejorar al máximo tu experiencia!
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}