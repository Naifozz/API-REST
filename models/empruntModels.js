// Fonction pour valider un emprunt
export const validerEmprunt = (emprunt) => {
    const erreurs = [];
    if (!emprunt.ID_Membre || isNaN(emprunt.ID_Membre)) {
        erreurs.push("L'ID du membre est requis et doit etre un nombre");
    }
    if (!emprunt.ID_Exemplaire || isNaN(emprunt.ID_Exemplaire)) {
        erreurs.push("L'ID de l'exemplaire est requis et doit etre un nombre");
    }
    return {
        estValide: erreurs.length === 0,
        erreurs,
    };
};

// Fonction pour transformer les données de la base de données en modèle d'emprunt
export const dbToEmprunt = (dbEmprunt) => {
    if (!dbEmprunt) return null;
    return {
        id: dbEmprunt.ID_Emprunt,
        idMembre: dbEmprunt.ID_Membre,
        idExemplaire: dbEmprunt.ID_Exemplaire,
        dateEmprunt: dbEmprunt.dateEmprunt,
        dateRetourPrevue: dbEmprunt.Date_Retour_Prevue,
        dateRetourEffective: dbEmprunt.Date_Retour_Effective,
    };
};

// Fonction pour transformer un modèle d'emprunt en format pour la base de données
export const empruntToDb = ({ ID_Membre, ID_Exemplaire, Date_Retour_Effective }) => {
    return {
        ID_Membre,
        ID_Exemplaire,
        Date_Retour_Effective,
    };
};
