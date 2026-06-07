import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="brand">
          <span style={{ fontSize: '1.75rem' }}>📚</span>
          <span>BiblioTech Cloud</span>
        </NavLink>
        <ul className="nav-menu">
          <li>
            <NavLink to="/redux-livres" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Livres (Redux)
            </NavLink>
          </li>
          <li>
            <NavLink to="/redux-emprunts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Emprunts (Redux)
            </NavLink>
          </li>
          <li>
            <NavLink to="/api-livres" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Livres (API)
            </NavLink>
          </li>
          <li>
            <NavLink to="/api-emprunts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Emprunts (API)
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
