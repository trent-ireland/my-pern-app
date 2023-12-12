import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './Pages/HomePage';
import PricingPage from "./Pages/PricingPage";
import ServicePage from "./Pages/ServicePage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Pricing" element={<PricingPage />} />
        <Route path="/Service" element={<ServicePage />} />
    
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
