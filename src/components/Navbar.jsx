import React from 'react';
import { NavLink } from 'react-router-dom';

const BookIcon = () => (
  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="brand" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/Logo_large.png" alt="BiblioX" style={{ height: '2.2rem', width: 'auto' }} />
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

