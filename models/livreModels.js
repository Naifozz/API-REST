// Fonctions de validation pures
export const validerLivre = (livre) => {
    const erreurs = [];

    if (!livre.Titre || livre.Titre.trim() === "") {
        erreurs.push("Le titre est requis");
    }

    if (livre.Annee_Publication && isNaN(livre.Annee_Publication)) {
        erreurs.push("L'année de publication doit être un nombre");
    }
    const dateRegex = /^\d{4}$/;
    if (livre.Annee_Publication && !dateRegex.test(livre.Annee_Publication)) {
        erreurs.push("L'année de publication doit être au format YYYY");
    }

    if (livre.Nb_Pages && isNaN(livre.Nb_Pages)) {
        erreurs.push("Le nombre de pages doit être un nombre");
    }

    if (livre.ISBN && livre.ISBN.length !== 13) {
        erreurs.push("L'ISBN doit comporter 13 chiffres");
    }

    if (livre.Editeur && livre.Editeur.length < 3) {
        erreurs.push("L'éditeur doit comporter au moins 3 caractères");
    }

    return {
        estValide: erreurs.length === 0,
        erreurs,
    };
};

// Fonction pour transformer les données de la base de données en modèle de livre
export const dbToLivre = (dbLivre) => {
    if (!dbLivre) return null;

    return {
        Id: dbLivre.ID_Livre,
        Titre: dbLivre.Titre,
        Isbn: dbLivre.ISBN,
        Annee_Publication: dbLivre.Annee_Publication,
        Nb_Pages: dbLivre.Nb_Pages,
        Editeur: dbLivre.Editeur,
    };
};

// Fonction pour transformer un modèle de livre en format pour la base de données
export const livreToDb = ({ Titre, ISBN, Annee_Publication, Nb_Pages, Editeur }) => {
    return {
        Titre,
        ISBN,
        Annee_Publication,
        Nb_Pages,
        Editeur,
    };
};
