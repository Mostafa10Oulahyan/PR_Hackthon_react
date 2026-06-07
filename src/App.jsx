import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReduxBooks from './components/ReduxBooks';
import ReduxBorrowings from './components/ReduxBorrowings';
import ApiBooks from './components/ApiBooks';
import ApiBorrowings from './components/ApiBorrowings';

// Beautiful dashboard home view
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
          <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
            🖥️ Accéder à l'Admin Blade (Laravel)
          </a>
          <a href="http://localhost:8000/api/livres" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
            🔌 Tester la Route API REST
          </a>
        </div>
      </div>

      <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        🚀 Explorer les Dossiers de l'Examen
      </h2>

      <div className="grid-2">
        {/* Card 1: Redux Local */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.5rem' }}>⚛️</span>
              <span className="badge badge-success">Dossier 3 & 4A</span>
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
              📚 Liste Livres
            </Link>
            <Link to="/redux-emprunts" className="btn btn-secondary" style={{ flex: 1, fontSize: '0.85rem' }}>
              🔄 Emprunter
            </Link>
          </div>
        </div>

        {/* Card 2: Laravel API Client */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🔌</span>
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
              📂 API Livres
            </Link>
            <Link to="/api-emprunts" className="btn btn-secondary" style={{ flex: 1, fontSize: '0.85rem' }}>
              ⚡ API Emprunts
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
