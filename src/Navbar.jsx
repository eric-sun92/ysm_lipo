import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you'll create a separate CSS file for styling

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <a href="https://medicine.yale.edu/lab/chandra/" className="logo" style={{ fontFamily: "ITC", textDecoration: "none" }}>Chandra Lab</a>
      
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
      </div>
      
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><Link to="/heatmap" onClick={() => setIsMenuOpen(false)}>Lipofuscin Atlas</Link></li>
        {/* <li><Link to="/fullheatmap">Tab 2</Link></li> */}
        <li><Link to="/coronal" onClick={() => setIsMenuOpen(false)}>Coronal Heatmap</Link></li>
        <li><Link to="/proteome" onClick={() => setIsMenuOpen(false)}>Lipofuscin Proteome</Link></li>
        <li><Link to="/references" onClick={() => setIsMenuOpen(false)}>Contact & References</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
