import React, { useState, useEffect } from 'react';

const ApiBorrowings = () => {
  const [emprunts, setEmprunts] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  // Form states
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [dateEmprunt, setDateEmprunt] = useState(new Date().toISOString().split('T')[0]);
  const [dateRetourPrevue, setDateRetourPrevue] = useState(
    new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch borrowings
      const empRes = await fetch('https://pr-hackthon-lrv.vercel.app/api/emprunts');
      if (!empRes.ok) throw new Error('Failed to fetch borrowings');
      const empData = await empRes.json();
      setEmprunts(empData);

      // 2. Fetch books to populate form
      const bookRes = await fetch('https://pr-hackthon-lrv.vercel.app/api/livres');
      if (!bookRes.ok) throw new Error('Failed to fetch books');
      const bookData = await bookRes.json();
      // Only show books that have positive copy count
      setAvailableBooks(bookData.filter(b => b.nombre_exemplaires > 0));

      // 3. Fetch members to populate form
      const memRes = await fetch('https://pr-hackthon-lrv.vercel.app/api/membres');
      if (!memRes.ok) throw new Error('Failed to fetch members');
      const memData = await memRes.json();
      setAvailableMembers(memData);
    } catch (err) {
      console.error(err);
      setError('Impossible de se connecter à l\'API Laravel sur Vercel (https://pr-hackthon-lrv.vercel.app).');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBook || !selectedMember) {
      setAlert({ type: 'error', text: 'Veuillez sélectionner un livre et un membre.' });
      return;
    }

    setSubmitLoading(true);
    setAlert(null);
    try {
      const response = await fetch('https://pr-hackthon-lrv.vercel.app/api/emprunts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          id_livre: Number(selectedBook),
          id_membre: Number(selectedMember),
          date_emprunt: dateEmprunt,
          date_retour_prevue: dateRetourPrevue
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Erreur lors de la création');
      }

      setAlert({ type: 'success', text: 'Succès ! Emprunt enregistré sur le serveur Laravel.' });
      
      // Reset form fields
      setSelectedBook('');
      setSelectedMember('');
      
      // Refresh list
      fetchData();

      // Clear alert after 3s
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', text: `Erreur: ${err.message}` });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div>
      <div className="filter-bar">
        <div>
          <h1 className="page-title">Emprunts (API Intégration Directe)</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Consommation dynamique du point de terminaison REST de notre backend Laravel: <code>GET & POST https://pr-hackthon-lrv.vercel.app/api/emprunts</code>
          </p>
        </div>
        <button className="btn btn-secondary" onClick={fetchData} disabled={loading}>
          {loading ? 'Chargement...' : '🔄 Actualiser'}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {alert && (
        <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'}`} style={{ marginBottom: '1.5rem' }}>
          <span>{alert.type === 'success' ? '✓' : '⚠️'}</span>
          <span>{alert.text}</span>
        </div>
      )}

      <div className="grid-2">
        {/* Form panel */}
        <div className="glass-card">
          <h2 className="section-title">
            <span style={{ fontSize: '1.25rem' }}>⚡</span> Ajouter un Emprunt (API backend)
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="api-book-select">Livre</label>
              <select
                id="api-book-select"
                className="form-control"
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                required
                disabled={loading}
              >
                <option value="" disabled>-- Choisir un livre --</option>
                {availableBooks.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.titre} (Exemplaires: {b.nombre_exemplaires})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="api-member-select">Membre</label>
              <select
                id="api-member-select"
                className="form-control"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                required
                disabled={loading}
              >
                <option value="" disabled>-- Choisir un membre --</option>
                {availableMembers.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.prenom} {m.nom} ({m.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="api-date-emprunt">Date d'emprunt</label>
              <input
                type="date"
                id="api-date-emprunt"
                className="form-control"
                value={dateEmprunt}
                onChange={(e) => setDateEmprunt(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="api-date-retour">Date de retour prévue</label>
              <input
                type="date"
                id="api-date-retour"
                className="form-control"
                value={dateRetourPrevue}
                onChange={(e) => setDateRetourPrevue(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={submitLoading || loading}
            >
              {submitLoading ? 'Envoi en cours...' : 'Enregistrer sur le Serveur'}
            </button>
          </form>
        </div>

        {/* Table panel */}
        <div className="glass-card">
          <h2 className="section-title">
            <span style={{ fontSize: '1.25rem' }}>🗄️</span> Emprunts sur la base de données
          </h2>
          <div className="table-container">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <div style={{
                  display: 'inline-block',
                  width: '30px',
                  height: '30px',
                  border: '3px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  borderTopColor: 'var(--primary)',
                  animation: 'spin 1s linear infinite',
                }}></div>
              </div>
            ) : emprunts.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Livre</th>
                    <th>Membre</th>
                    <th>Date Emprunt</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {emprunts.map(emp => (
                    <tr key={emp.id}>
                      <td style={{ fontWeight: '700', color: 'var(--primary)' }}>#{emp.id}</td>
                      <td style={{ fontWeight: '600' }}>{emp.livre ? emp.livre.titre : 'Livre inconnu'}</td>
                      <td>{emp.membre ? `${emp.membre.prenom} ${emp.membre.nom}` : 'Membre inconnu'}</td>
                      <td>{new Date(emp.date_emprunt).toLocaleDateString('fr-FR')}</td>
                      <td>
                        <span className={`badge ${emp.statut === 'En cours' ? 'badge-warning' : 'badge-success'}`}>
                          {emp.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <span style={{ fontSize: '2rem', display: 'block' }}>📁</span>
                <p style={{ marginTop: '0.5rem' }}>Aucun emprunt enregistré sur la base de données.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiBorrowings;
