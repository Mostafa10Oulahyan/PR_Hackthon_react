import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterStatus } from '../store/librarySlice';

const ReduxBooks = () => {
  const dispatch = useDispatch();
  const { livres, filterStatus } = useSelector((state) => state.library);

  // Filter books based on status selection
  const filteredLivres = livres.filter((livre) => {
    if (filterStatus === 'Tous') return true;
    return livre.statut === filterStatus;
  });

  const handleFilterChange = (e) => {
    dispatch(setFilterStatus(e.target.value));
  };

  return (
    <div>
      <div className="filter-bar">
        <div>
          <h1 className="page-title">Livres (Redux Local)</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Démonstration de la gestion d'état locale avec Redux Store
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>Filtrer par statut:</label>
          <select 
            value={filterStatus} 
            onChange={handleFilterChange} 
            className="form-control"
            style={{ width: '180px', padding: '0.5rem 0.75rem' }}
          >
            <option value="Tous">Tous les livres</option>
            <option value="Disponible">Disponible</option>
            <option value="Indisponible">Indisponible</option>
          </select>
        </div>
      </div>

      <div className="glass-card">
        {filteredLivres.length > 0 ? (
          <div className="books-grid">
            {filteredLivres.map((livre) => (
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
            <svg style={{ width: '2.5rem', height: '2.5rem', display: 'block', margin: '0 auto 1rem', opacity: 0.4 }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
            </svg>
            <h3>Aucun livre ne correspond au filtre.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReduxBooks;
