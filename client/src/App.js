import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import PricingPage from "./pages/pricingPage";
import ServicePage from './pages/ServicePage';
import AdminPage from './pages/adminPage';
import './App.css'; 

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricingPage" element={<PricingPage />} />
        <Route path="/servicePage" element={<ServicePage />} />
        <Route path="/adminPage" element={<AdminPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
