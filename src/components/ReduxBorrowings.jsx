import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ajouterEmprunt, supprimerEmprunt } from '../store/librarySlice';

// Hardcoded members list for Redux Local demo to map IDs to Names
const LOCAL_MEMBERS = [
  { id: 1, nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@email.com' },
  { id: 2, nom: 'Curie', prenom: 'Marie', email: 'marie.curie@email.com' },
  { id: 3, nom: 'Einstein', prenom: 'Albert', email: 'albert.einstein@email.com' }
];

const ReduxBorrowings = () => {
  const dispatch = useDispatch();
  const { emprunts, livres } = useSelector((state) => state.library);
  
  // Local form states
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [dateEmprunt, setDateEmprunt] = useState(new Date().toISOString().split('T')[0]);
  const [dateRetourPrevue, setDateRetourPrevue] = useState(
    new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  
  // Alert message state
  const [alert, setAlert] = useState(null);

  // Filter books with positive copy count
  const availableBooks = livres.filter(b => b.nombre_exemplaires > 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBook || !selectedMember) {
      setAlert({ type: 'error', text: 'Veuillez sélectionner un livre et un membre.' });
      return;
    }

    const book = livres.find(b => b.id === Number(selectedBook));
    if (book.nombre_exemplaires <= 0) {
      setAlert({ type: 'error', text: 'Ce livre n\'est plus disponible.' });
      return;
    }

    dispatch(ajouterEmprunt({
      id_livre: selectedBook,
      id_membre: selectedMember,
      date_emprunt: dateEmprunt,
      date_retour_prevue: dateRetourPrevue
    }));

    // Reset form & show success
    setSelectedBook('');
    setSelectedMember('');
    setAlert({ type: 'success', text: 'Emprunt enregistré localement avec succès !' });
    
    // Auto clear alert
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDelete = (id) => {
    dispatch(supprimerEmprunt(id));
    setAlert({ type: 'success', text: 'Emprunt supprimé localement. L\'exemplaire a été restitué.' });
    setTimeout(() => setAlert(null), 3000);
  };

  // Helper helper to get book title by ID
  const getBookTitle = (id) => {
    const book = livres.find(b => b.id === id);
    return book ? book.titre : 'Livre inconnu';
  };

  // Helper to get member name by ID
  const getMemberName = (id) => {
    const member = LOCAL_MEMBERS.find(m => m.id === id);
    return member ? `${member.prenom} ${member.nom}` : 'Membre inconnu';
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="page-title">Emprunts (Redux Local)</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Gestion locale autonome des emprunts (sans appel API). L'ajout et la suppression mettent à jour les exemplaires immédiatement.
        </p>
      </div>

      {alert && (
        <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          <span>{alert.type === 'success' ? '✓' : '⚠️'}</span>
          <span>{alert.text}</span>
        </div>
      )}

      <div className="grid-2">
        {/* Section: Ajouter Emprunt Form */}
        <div className="glass-card">
          <h2 className="section-title">
            <span style={{ fontSize: '1.25rem' }}>➕</span> Ajouter un Emprunt (Local)
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="book-select">Livre</label>
              <select
                id="book-select"
                className="form-control"
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                required
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
              <label htmlFor="member-select">Membre</label>
              <select
                id="member-select"
                className="form-control"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                required
              >
                <option value="" disabled>-- Choisir un membre --</option>
                {LOCAL_MEMBERS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.prenom} {m.nom} ({m.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date-emprunt">Date d'emprunt</label>
              <input
                type="date"
                id="date-emprunt"
                className="form-control"
                value={dateEmprunt}
                onChange={(e) => setDateEmprunt(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date-retour">Date de retour prévue</label>
              <input
                type="date"
                id="date-retour"
                className="form-control"
                value={dateRetourPrevue}
                onChange={(e) => setDateRetourPrevue(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Enregistrer l'Emprunt
            </button>
          </form>
        </div>

        {/* Section: Liste des Emprunts */}
        <div className="glass-card">
          <h2 className="section-title">
            <span style={{ fontSize: '1.25rem' }}>📋</span> Liste des Emprunts
          </h2>
          <div className="table-container">
            {emprunts.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Livre</th>
                    <th>Membre</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {emprunts.map(emp => (
                    <tr key={emp.id}>
                      <td style={{ fontWeight: '700', color: 'var(--primary)' }}>#{emp.id}</td>
                      <td style={{ fontWeight: '600' }}>{getBookTitle(emp.id_livre)}</td>
                      <td>{getMemberName(emp.id_membre)}</td>
                      <td>
                        <span className={`badge ${emp.statut === 'En cours' ? 'badge-warning' : 'badge-success'}`}>
                          {emp.statut}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="btn btn-danger"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <span style={{ fontSize: '2rem', display: 'block' }}>📁</span>
                <p style={{ marginTop: '0.5rem' }}>Aucun emprunt enregistré dans le store local.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReduxBorrowings;
