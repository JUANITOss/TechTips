// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" component={Auth} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
