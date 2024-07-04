import React from 'react';
import './Navbar.css'; // Assuming you'll create a separate CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="https://medicine.yale.edu/lab/chandra/" className="logo" style={{fontFamily: "ITC", textDecoration: "none"}}>Chandra Lab</a>
      <ul className="nav-links">
        <li><a href="/">Home</a></li> 
        <li><a href="/heatmap">Lipofuscin Atlas</a></li>
        {/* <li><a href="/fullheatmap">Tab 2</a></li> */}
        <li><a href="/coronal">Coronal Heatmap</a></li>
        <li><a href="/Venn">Venn</a></li>
        <li><a href="/references">Contact & References</a></li>

      </ul>
    </nav>
  );
};

export default Navbar;
