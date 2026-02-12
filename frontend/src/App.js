import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './component/login/login';
import Home from './component/home/home';
import Navbar from './component/navbar/navbar';
import Registor from './component/JAP/registor';
import Home1 from './component/home1/home1';
import AboutPage from './component/about/about';
import Contact from './component/contact/contact';
import Vel from './component/vel/vel';
import Profile from './component/profile/profile';
import {jwtDecode} from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      fetchUserData(decodedToken);
    } else {
      setLoading(false); // No token, so no need to fetch data
    }
  }, []);

  const fetchUserData = async (decodedToken) => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false); // Data fetched or failed, stop loading
    }
  };

  // Function to update user after login or profile update
  const handleUserUpdate = (userData) => {
    setUser(userData);
  };

  if (loading) {
    return <div className="loading">Loading...</div>; // Display a loading indicator while loading
  }

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<Login onUserUpdate={handleUserUpdate} />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/" element={<Home1 user={user} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Home user={user} />} />
        <Route path="/vel" element={<Vel user={user} />} />
        <Route path="/profile" element={<Profile user={user} onUserUpdate={handleUserUpdate} />} />
        <Route path="/vel/registor" element={<Registor />} />
      </Routes>
    </div>
  );
}

export default App;
