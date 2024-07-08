import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);

  const handleToggle = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div>
      <div>
        <button onClick={handleToggle}>{isRegister ? 'Go to Login' : 'Go to Register'}</button>
      </div>
      {isRegister ? <Register /> : <Login />}
    </div>
  );
};

export default Auth;
