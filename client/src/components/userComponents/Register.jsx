import React, { useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    name: '',
    surname: '',
    phoneNumber: '',
    profilePicture: null,
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData({
        ...formData,
        profilePicture: file,
      });
    } else {
      setErrorMessage('Por favor, selecciona un archivo de imagen válido');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await api.post('/user/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccessMessage('¡Usuario registrado exitosamente!');
        console.log(response.data);
        window.location = "/homePage";
      }
    } catch (error) {
      setErrorMessage('Error al registrar el usuario');
      console.error('Error al registrar el usuario', error);
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
          <h1 className="text-3xl font-bold text-black">Registrarse</h1>
          <p className="text-gray-500">Crea tu cuenta para empezar</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {['email', 'Usuario', 'Contraseña', 'Nombre', 'Apellido'].map((field) => (
            <div key={field} className="space-y-2">
              <label className="text-sm font-medium text-black">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                className="w-full h-10 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Ingrese ${field}`}
                required
              />
            </div>
          ))}

          <div className="space-y-2">
            <label className="text-sm font-medium text-black">Número de Teléfono</label>
            <div className="relative mt-2 w-full flex">
              <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                <select className="text-sm outline-none rounded-lg h-full">
                  <option>AR</option>
                  <option>UY</option>
                  <option>PY</option>
                </select>
              </div>
              <input
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                placeholder="+54 (555) 000-000"
                className="w-full h-10 pl-[4.5rem] pr-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black">Foto de Perfil</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              accept=".jpeg, .jpg, .png, .svg"
              className="w-full h-10 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Registrar
          </button>

          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
        </form>

        <div className="mt-4 text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link className="text-blue-500 underline" to="/login">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
