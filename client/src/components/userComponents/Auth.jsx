import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import './Auth.css';
import '../pageStyles/NavbarAuth.css';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [clickedButton, setClickedButton] = useState(null);

  const handleToggle = (button) => {
    setIsRegister(button === 'register');
    setClickedButton(button);
  };

  return (
    <div className="auth-container">
      <div className="navbarAuth">
        <h1 className="navbar-title">TechTips</h1>
      </div>
  
      <nav className="auth-nav">
        <button
          className={`auth-toggle-button ${isRegister ? 'active' : ''} ${clickedButton === 'register' ? 'clicked' : ''}`}
          onClick={() => handleToggle('register')}
        >
          Register
        </button>
        <button
          className={`auth-toggle-button ${!isRegister ? 'active' : ''} ${clickedButton === 'login' ? 'clicked' : ''}`}
          onClick={() => handleToggle('login')}
        >
          Login
        </button>
      </nav>
      {isRegister ? <Register /> : <Login />}
    </div>
  );
};

export default Auth;
