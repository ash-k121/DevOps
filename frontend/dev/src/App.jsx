import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "./landingPage/landing";
import Profile from "./profile/profile";
import Login from './navBar/navbar';

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Landing />} /> 
        <Route path="/profile" element={<Profile />} /> 
      
      </Routes>
    </Router>
  );
}

export default App;
