import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReduxBooks from './components/ReduxBooks';
import ReduxBorrowings from './components/ReduxBorrowings';
import ApiBooks from './components/ApiBooks';
import ApiBorrowings from './components/ApiBorrowings';

const Home = () => {
  return (
    <div style={{ animation: 'fadeIn 0.6s ease-in-out' }}>
      <div className="glass-card" style={{ padding: '3.5rem 2.5rem', textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-1px' }}>
          Solution Full Stack <span style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #2dd4bf 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>BiblioTech Cloud</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
          Une plateforme moderne et performante de gestion de bibliothèque. Cette application implémente l'intégralité du cahier des charges de l'examen pratique de Développement Digital.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="https://pr-hackthon-lrv.vercel.app" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Accéder à l'Admin Blade (Laravel)
          </a>
          <a href="https://pr-hackthon-lrv.vercel.app/api/livres" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Tester la Route API REST
          </a>
        </div>
      </div>

      <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <svg style={{ width: '1.5rem', height: '1.5rem', color: '#a78bfa' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Explorer les Dossiers de l'Examen
      </h2>

      <div className="grid-2">
        {/* Card 1: Redux Local */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '12px', background: 'rgba(139,92,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', color: '#a78bfa' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <span className="badge badge-success">Dossier 3 &amp; 4A</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.75rem', color: 'white' }}>
              Gestion d'État avec Redux Local
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Démonstration d'une interface React ultra-réactive utilisant un store Redux local avec pré-chargement des données, filtres dynamiques, décrémentation automatique des exemplaires, et suppression d'emprunts avec restitution instantanée.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/redux-livres" className="btn btn-primary" style={{ flex: 1, fontSize: '0.85rem' }}>
              Livres (Redux)
            </Link>
            <Link to="/redux-emprunts" className="btn btn-secondary" style={{ flex: 1, fontSize: '0.85rem' }}>
              Emprunts (Redux)
            </Link>
          </div>
        </div>

        {/* Card 2: Laravel API Client */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '12px', background: 'rgba(20,184,166,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', color: '#2dd4bf' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="badge badge-warning">Dossier 4B</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.75rem', color: 'white' }}>
              Intégration d'API REST (Laravel)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Communication bidirectionnelle en direct avec la base de données SQLite de notre API Laravel via des requêtes HTTP asynchrones. Permet d'afficher les livres en temps réel, de lister les emprunts et d'enregistrer de nouveaux emprunts persistés sur le serveur.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/api-livres" className="btn btn-primary" style={{ flex: 1, fontSize: '0.85rem' }}>
              Livres (API)
            </Link>
            <Link to="/api-emprunts" className="btn btn-secondary" style={{ flex: 1, fontSize: '0.85rem' }}>
              Emprunts (API)
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />

        <main className="app-container" style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/redux-livres" element={<ReduxBooks />} />
            <Route path="/redux-emprunts" element={<ReduxBorrowings />} />
            <Route path="/api-livres" element={<ApiBooks />} />
            <Route path="/api-emprunts" element={<ApiBorrowings />} />
          </Routes>
        </main>

        <footer>
          &copy; 2026 BiblioTech Cloud. Solution Full Stack Développée pour Hackathon et Validation d'Examen Pratique.
        </footer>
      </div>
    </Router>
  );
}

export default App;
