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
      setErrorMessage('Please select a valid image file');
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
        setSuccessMessage('User registered successfully!');
        console.log(response.data);
        window.location="/homePage";
      }

    } catch (error) {
      setErrorMessage('Error registering user');
      console.error('Error registering user', error);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
        <header className="px-4 md:px-6 border-b">
          <div className="container max-w-6xl mx-auto flex items-center justify-center ">
            <div className="flex items-center gap-2">
              <img src="/imagenes/wally.png" alt="Logo Wally" className='w-10 h-10'/>
              <span className="font-semibold text-lg">TechTips</span>
            </div>
          </div>
        </header>
<div className="mx-auto max-w-[400px] space-y-6 mt-12">
  <div className="space-y-2 text-center">
    <h1 className="text-3xl font-bold text-black">Registrarse</h1>
    <p className="text-gray-500 dark:text-gray-400">Crea tu cuenta para empezar</p>
  </div>
  <div>
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="email"
        >
          Email
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="email" name="email" placeholder="usuario@gmail.com" onChange={handleChange} required
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Usuario
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="username" name="username" placeholder="usuario123" onChange={handleChange} required
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"        >
          Contraseña
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="password" name="password" placeholder="********" onChange={handleChange} required
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Nombre
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="text" name="name" placeholder="Martin" onChange={handleChange} required
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Apellido
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="text" name="surname" placeholder="Rodriguez" onChange={handleChange} required
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Numero de Telefono
        </label>
        <div className="relative mt-2 w-full flex">
                <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                    <select className="text-sm outline-none rounded-lg h-full">
                        <option>AR</option>
                        <option>UY</option>
                        <option>PY</option>
                    </select>
                </div>
                <input type="text" name="phoneNumber" onChange={handleChange} required placeholder="+54 (555) 000-000" 
                        className="w-full flex h-10 pl-[4.5rem] pr-3 py-2 appearance-none bg-background rounded-md outline-none border text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-5"/>
                </div>
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Foto de Perfil
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="file" name="profilePicture" onChange={handleFileChange} accept=".jpeg, .jpg, .png, .svg"
        />
        <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-violet-700 h-10 px-4 py-2 w-full">
          Register
        </button>
          {errorMessage && <p className='error'>{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </form>
    <div className="mt-4 text-center text-sm">
      ¿Ya tienes una cuenta?{" "}
      <Link className="underline" to="/login">
        Iniciar Sesión
      </Link>
    </div>
  </div>
</div>
</div>

  );
};

export default Register;
