import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import
import Home from './component/Home';
import Navbar from './component/Navbar';
import Login from './component/Login';
import Signin from './component/Signin';
import CarOrBikeSelection from './component/CarOrBikeSelection';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signin />} />
        <Route path="/car-or-bike-selection" element={<CarOrBikeSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
