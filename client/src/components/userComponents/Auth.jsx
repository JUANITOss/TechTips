import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import './Auth.css';
import '../pageStyles/NavbarAuth.css';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);

  const handleToggle = () => {
    setIsRegister(!isRegister);
  };

  return (
    
    <div className="auth-container">
      <div className="navbarAuth">
        <h1 className="navbar-title">TechTips</h1>
      </div>
  
      <nav className="auth-nav">
        <button
          className={`auth-toggle-button ${isRegister ? 'active' : ''}`}
          onClick={() => setIsRegister(true)}
        >
          Register
        </button>
        <button
          className={`auth-toggle-button ${!isRegister ? 'active' : ''}`}
          onClick={() => setIsRegister(false)}
        >
          Login
        </button>
      </nav>
      {isRegister ? <Register /> : <Login />}
    </div>
  );
};

export default Auth;
