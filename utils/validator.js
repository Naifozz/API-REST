export async function livreValidation(livre) {
    const errors = [];

    // Vérification du titre
    if (!livre.Titre || livre.Titre.length < 3) {
        errors.push("Le titre doit comporter au moins 3 caractères");
    }

    // Vérification de l'ISBN
    if (!livre.ISBN || livre.ISBN.length < 13 || isNaN(livre.ISBN)) {
        errors.push("L'ISBN est requis, doit comporter au moins 13 caractères et être un nombre");
    }

    // Vérification de l'année de publication
    if (
        !livre.Annee_Publication ||
        livre.Annee_Publication.toString().length !== 4 ||
        isNaN(livre.Annee_Publication)
    ) {
        errors.push(
            "L'année de publication est requise, doit comporter 4 chiffres et être un nombre"
        );
    }

    // Vérification du nombre de pages
    if (!livre.Nb_Pages || isNaN(livre.Nb_Pages)) {
        errors.push("Le nombre de pages est requis et doit être un nombre");
    }

    // Vérification de l'éditeur
    if (!livre.Editeur || livre.Editeur.length < 3) {
        errors.push("L'éditeur doit comporter au moins 3 caractères");
    }

    return errors.length > 0 ? errors : null;
}
export async function empruntValidation(emprunt) {
    const errors = [];

    // Vérification de l'ID du membre
    if (!emprunt.ID_Membre || isNaN(emprunt.ID_Membre)) {
        errors.push("L'ID du membre est requis et doit être un nombre");
    }
    // Vérification de l'ID de l'exemplaire
    if (!emprunt.ID_Exemplaire || isNaN(emprunt.ID_Exemplaire)) {
        errors.push("L'ID de l'exemplaire est requis et doit être un nombre");
    }
    return errors.length > 0 ? errors : null;
}
export async function auteurValidation(auteur) {
    const errors = [];

    // Vérification du nom
    if (!auteur.Nom || auteur.Nom.length < 3) {
        errors.push("Le nom doit comporter au moins 3 caractères");
    }
    if (!isNaN(auteur.Nom)) {
        errors.push("Le nom ne peut pas être un nombre");
    }
    // Vérification du prénom
    if (!auteur.Prenom || auteur.Prenom.length < 3) {
        errors.push("Le prénom doit comporter au moins 3 caractères");
    }
    if (!isNaN(auteur.Prenom)) {
        errors.push("Le prénom ne peut pas être un nombre");
    }
    // Vérification de la date de naissance
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!auteur.Date_Naissance || !dateRegex.test(auteur.Date_Naissance)) {
        errors.push("La date de naissance est requise et doit être au format YYYY-MM-DD");
    }

    // Vérification de l'ID du pays
    if (!auteur.ID_Pays || isNaN(auteur.ID_Pays)) {
        errors.push("L'ID du pays est requis et doit être un nombre");
    }
    return errors.length > 0 ? errors : null;
}
