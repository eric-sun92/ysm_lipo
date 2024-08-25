import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you'll create a separate CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="https://medicine.yale.edu/lab/chandra/" className="logo" style={{ fontFamily: "ITC", textDecoration: "none" }}>Chandra Lab</a>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/heatmap">Lipofuscin Atlas</Link></li>
        {/* <li><Link to="/fullheatmap">Tab 2</Link></li> */}
        <li><Link to="/coronal">Coronal Heatmap</Link></li>
        <li><Link to="/Venn">Lipofuscin Proteome</Link></li>
        <li><Link to="/references">Contact & References</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
