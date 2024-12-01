import React, { useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.post('/user/login', formData);

      if (response.status === 200) {
        setSuccessMessage('¡Login exitoso!');
        window.location = "/homePage";
      }
    } catch (error) {
      setErrorMessage('Error al iniciar sesión');
      console.error('Error al iniciar sesión', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 md:px-6 border-b py-4">
        <div className="container max-w-6xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <img src="/imagenes/wally.png" alt="Logo Wally" className='w-10 h-10' />
            <span className="font-semibold text-lg text-black">TechTips</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[400px] space-y-6 mt-12 p-6 bg-white shadow-lg rounded-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-black">Iniciar Sesión</h1>
          <p className="text-gray-500">Ingresa para continuar</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">Email</label>
            <input
              className="w-full h-10 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="usuario@gmail.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black">Contraseña</label>
            <input
              className="w-full h-10 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Iniciar Sesión
          </button>

          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
        </form>

        <div className="mt-4 text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <Link className="text-blue-500 underline" to="/register">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
