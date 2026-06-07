import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  livres: [
    { id: 1, titre: "L'Alchimiste", isbn: "978-1", nombre_exemplaires: 5, statut: "Disponible" },
    { id: 2, titre: "Le Petit Prince", isbn: "978-2", nombre_exemplaires: 2, statut: "Disponible" }
  ],
  emprunts: [
    { id: 1, id_livre: 1, id_membre: 1, date_emprunt: "2026-04-10", date_retour_prevue: "2026-04-20", statut: "En cours" }
  ],
  filterStatus: 'Tous', // 'Tous', 'Disponible', 'Indisponible'
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    ajouterEmprunt: (state, action) => {
      const { id_livre, id_membre, date_emprunt, date_retour_prevue } = action.payload;
      
      // 1. Find the book
      const book = state.livres.find(b => b.id === Number(id_livre));
      if (!book || book.nombre_exemplaires <= 0) return;

      // 2. Decrement book copies and update status
      book.nombre_exemplaires -= 1;
      if (book.nombre_exemplaires === 0) {
        book.statut = 'Indisponible';
      }

      // 3. Generate new ID
      const nextId = state.emprunts.length > 0 
        ? Math.max(...state.emprunts.map(e => e.id)) + 1 
        : 1;

      // 4. Create and push borrowing
      const newEmprunt = {
        id: nextId,
        id_livre: Number(id_livre),
        id_membre: Number(id_membre),
        date_emprunt,
        date_retour_prevue,
        statut: 'En cours',
      };
      state.emprunts.push(newEmprunt);
    },
    supprimerEmprunt: (state, action) => {
      const empruntId = Number(action.payload);
      const empruntIndex = state.emprunts.findIndex(e => e.id === empruntId);
      
      if (empruntIndex !== -1) {
        const emprunt = state.emprunts[empruntIndex];
        
        // Find corresponding book to increment its copies
        const book = state.livres.find(b => b.id === emprunt.id_livre);
        if (book) {
          book.nombre_exemplaires += 1;
          book.statut = 'Disponible'; // Ensure it's available since copies > 0
        }

        // Remove the borrowing
        state.emprunts.splice(empruntIndex, 1);
      }
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    }
  }
});

export const { ajouterEmprunt, supprimerEmprunt, setFilterStatus } = librarySlice.actions;
export default librarySlice.reducer;
