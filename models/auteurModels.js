// Fonction pour valider un auteur
export const validerAuteur = (auteur) => {
    const erreurs = [];
    if (!auteur.Nom || !isNaN(auteur.Nom)) {
        erreurs.push("Le nom de l'auteur est requis et ne doit pas être un nombre");
    }
    if (!auteur.Prenom || !isNaN(auteur.Prenom)) {
        erreurs.push("Le prénom de l'auteur est requis et ne doit pas être un nombre");
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!auteur.Date_Naissance || !dateRegex.test(auteur.Date_Naissance)) {
        erreurs.push(
            "La date de naissance de l'auteur est requise et doit être au format YYYY-MM-DD"
        );
    }
    if (!auteur.ID_Pays || isNaN(auteur.ID_Pays)) {
        erreurs.push("L'ID du pays est requis et doit être un nombre");
    }
    return {
        estValide: erreurs.length === 0,
        erreurs,
    };
};

// Fonction pour transformer les données de la base de données en modèle d'auteur
export const dbToAuteur = (dbAuteur) => {
    if (!dbAuteur) return null;
    return {
        id: dbAuteur.ID_Auteur,
        nom: dbAuteur.Nom,
        prenom: dbAuteur.Prenom,
        dateNaissance: dbAuteur.Date_Naissance,
        idPays: dbAuteur.ID_Pays,
    };
};

// Fonction pour transformer un modèle d'auteur en format pour la base de données
export const auteurToDb = ({ Nom, Prenom, Date_Naissance, ID_Pays }) => {
    return {
        Nom,
        Prenom,
        Date_Naissance,
        ID_Pays,
    };
};
