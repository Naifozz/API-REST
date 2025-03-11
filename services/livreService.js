import {
    findLivreById,
    getAllLivres,
    createLivre,
    updateLivre,
    deleteLivre,
    categorieLivre,
    livreAuteur,
} from "../repositories/livreRepository.js";

// Fonction pour récupérer un article par son ID
export async function serviceGetLivreById(id) {
    const livre = await findLivreById(id);
    return livre;
}

// Fonction pour récupérer tous les articles
export async function serviceGetAll() {
    const livres = await getAllLivres();
    return livres;
}

// Fonction pour créer un article
export async function serviceCreateLivre(livreData) {
    const livre = await createLivre(livreData);
    if (!livre.success) {
        return livre;
    } else {
        return { success: true, data: livre };
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
export async function serviceUpdateLivre(id, livreData) {
    const livre = await updateLivre(id, livreData);
    if (!livre.success) {
        return livre;
    } else {
        return { success: true, data: livre };
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
export async function serviceDeleteLivre(id) {
    const result = await deleteLivre(id);
    return result;
}

export async function serviceCategorieLivre(id) {
    const result = await categorieLivre(id);
    return result;
}

export async function serviceLivreAuteur(id) {
    const result = await livreAuteur(id);
    return result;
}
