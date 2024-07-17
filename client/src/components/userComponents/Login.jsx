import React, { useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/user/login', formData);
      console.log(response.data);

      if (response.status === 200) {
        window.location="/homePage";
      }

    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
        <header className="px-4 md:px-6 border-b">
          <div className="container max-w-6xl mx-auto flex items-center justify-center">
            <Link className="flex items-center gap-2" to="/homePage">
              <img src="/imagenes/wally.png" alt="Logo Wally" className='w-10 h-10'/>
              <span className="font-semibold text-lg">TechTips</span>
            </Link>
          </div>
        </header>
    <div className="mx-auto max-w-[400px] space-y-6 mt-6">
  <div className="space-y-2 text-center">
    <h1 className="text-3xl font-bold text-black">Iniciar Sesión</h1>
    <p className="text-gray-500 dark:text-gray-400">Inicia sesión para empezar</p>
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
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"        >
          Contraseña
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="password" name="password" placeholder="********" onChange={handleChange} required
        />

        <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-violet-700 h-10 px-4 py-2 w-full">
          Iniciar Sesión
        </button>
        <div class="mt-4 text-center text-sm">
          ¿Aún no tienes una cuenta?{" "}
          <Link class="underline" to="/register">
            Registrate
          </Link>
        </div>

      </div>
    </form>
  </div>
</div>
</div>
  );
};

export default Login;
