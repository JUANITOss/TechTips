import React, { useState } from 'react';
import api from '../../api';

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
      const response = await api.post('/auth/register', formDataToSend, {
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
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="surname" placeholder="Surname" onChange={handleChange} required />
      <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
      <input type="file" name="profilePicture" onChange={handleFileChange} accept=".jpeg, .jpg, .png, .svg" />
      <button type="submit">Register</button>
      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
      {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
    </form>
  );
};

export default Register;
