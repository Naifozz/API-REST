export const createLivre = (titre, isbn, anneePublication, categorieId, id = null) => ({
    id,
    titre,
    isbn,
    anneePublication,
    categorieId,
});

// Fonctions de validation pures
export const validerLivre = (livre) => {
    const erreurs = [];

    if (!livre.titre || livre.titre.trim() === "") {
        erreurs.push("Le titre est requis");
    }

    if (livre.anneePublication && isNaN(livre.anneePublication)) {
        erreurs.push("L'année de publication doit être un nombre");
    }

    return {
        estValide: erreurs.length === 0,
        erreurs,
    };
};

// Fonctions métier pures
export const estEmpruntable = (livre, exemplaires = []) => {
    const exemplairesDisponibles = exemplaires.filter(
        (ex) => ex.idLivre === livre.id && ex.disponible === true
    );

    return exemplairesDisponibles.length > 0;
};

// Fonction pour transformer les données de la base de données en modèle de livre
export const dbToLivre = (dbLivre) => {
    if (!dbLivre) return null;

    return {
        id: dbLivre.ID_Livre,
        titre: dbLivre.Titre,
        isbn: dbLivre.ISBN,
        anneePublication: dbLivre.Annee_Publication,
        nbPages: dbLivre.Nb_Pages,
        editeur: dbLivre.Editeur,
    };
};

// Fonction pour transformer un modèle de livre en format pour la base de données
export const livreToDb = (livre) => {
    return {
        Titre: livre.titre,
        ISBN: livre.isbn,
        Annee_Publication: livre.anneePublication,
        Nb_Pages: livre.nbPages || null,
        Editeur: livre.editeur || null,
    };
};
