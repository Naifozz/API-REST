import {
    findAuteurById,
    getAllAuteurs,
    createAuteur,
    updateAuteur,
    deleteAuteur,
} from "../repositories/auteurRepository.js";

// Fonction pour récupérer un article par son ID
export async function serviceGetAuteurById(id) {
    const auteur = await findAuteurById(id);
    return auteur;
}

// Fonction pour récupérer tous les articles
export async function serviceGetAllAuteurs() {
    const auteurs = await getAllAuteurs();
    return auteurs;
}

// Fonction pour créer un article
export async function serviceCreateAuteur(auteurData) {
    const auteur = await createAuteur(auteurData);
    if (!auteur.success) {
        return auteur;
    } else {
        return { succes: true, data: auteur };
    }
    // const validation = await livreValidation(livreData);
    // if (validation !== null) {
    //     return {
    //         success: false,
    //         error: validation,
    //     };
    // } else {
    //     const livre = await createLivre(livreData);
    //     return { success: true, data: livre };
    // }
}

// Fonction pour mettre à jour un article
export async function serviceUpdateAuteur(id, auteurData) {
    const auteur = await updateAuteur(id, auteurData);
    if (!auteur.success) {
        return { success: "error" };
    } else {
        return { success: true, data: auteur };
    }
    // const validation = await livreValidation(livreData);
    // if (validation !== null) {
    //     return {
    //         success: false,
    //         error: validation,
    //     };
    // } else {
    //     const livre = await updateLivre(id, livreData);
    //     return { success: true, data: livre };
    // }
}

// Fonction pour supprimer un article
export async function serviceDeleteAuteur(id) {
    const result = await deleteAuteur(id);
    return result;
}
