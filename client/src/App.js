import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/userComponents/Auth';
import PostSystem from './components/postsComponents/PostSystem';
import HomePage from './components/mainComponents/HomePage';
import Register from './components/userComponents/Register';
import Login from './components/userComponents/Login';
import Profile from './components/userComponents/Profile';
import FAQ from './components/faqComponents/FAQ';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/" element={<Auth/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/editProfile" element={<Profile/>} />


          <Route path="/homePage" element={<HomePage />}/>
          
          <Route path="/postSystem" element={<PostSystem/>}/>
          <Route path="/FAQ" element={<FAQ/>}/>

          <Route path="/*" element={<Auth/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
