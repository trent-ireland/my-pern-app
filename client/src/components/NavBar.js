import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="/ireland-sprinklers.jpg" alt="Logo" />
      </div>
      <div className={`nav-links ${menuVisible ? 'show' : ''}`}>
        {location.pathname !== '/' && (
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
        )}
        {location.pathname !== '/pricing' && (
          <Link to="/pricing" onClick={toggleMenu}>
            Pricing
          </Link>
        )}
        {location.pathname !== '/services' && (
          <Link to="/services" onClick={toggleMenu}>
            Services
          </Link>
        )}
      </div>
      <div className="admin-login">
        <Link to="/admin" className="admin-link">
          Admin Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
