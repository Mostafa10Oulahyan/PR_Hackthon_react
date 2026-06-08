import React, { useState, useEffect } from 'react';

const ApiBooks = () => {
  const [livres, setLivres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://pr-hackthon-lrv.vercel.app/api/livres');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLivres(data);
    } catch (err) {
      console.error('API Fetch Error:', err);
      setError('Impossible de se connecter à l\'API Laravel sur Vercel (https://pr-hackthon-lrv.vercel.app).');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <div className="filter-bar">
        <div>
          <h1 className="page-title">Livres (Depuis API Laravel)</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Consommation dynamique du point de terminaison REST de notre backend Laravel: <code>GET https://pr-hackthon-lrv.vercel.app/api/livres</code>
          </p>
        </div>
        <button className="btn btn-secondary" onClick={fetchBooks} disabled={loading}>
          {loading ? 'Chargement...' : '🔄 Actualiser'}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <div className="glass-card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              borderTopColor: 'var(--primary)',
              animation: 'spin 1s linear infinite',
              marginBottom: '1rem'
            }}></div>
            <p>Chargement des livres depuis le serveur...</p>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : livres.length > 0 ? (
          <div className="books-grid">
            {livres.map((livre) => (
              <div className="book-card" key={livre.id}>
                <div>
                  <h3 className="book-title">{livre.titre}</h3>
                  <div className="book-meta">ISBN: {livre.isbn}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Exemplaires: <strong>{livre.nombre_exemplaires}</strong>
                  </span>
                  <span className={`badge ${livre.nombre_exemplaires > 0 ? 'badge-success' : 'badge-danger'}`}>
                    {livre.nombre_exemplaires > 0 ? 'Disponible' : 'Indisponible'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '2rem', display: 'block' }}>📂</span>
            <h3>Aucun livre trouvé dans la base de données SQLite.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiBooks;
