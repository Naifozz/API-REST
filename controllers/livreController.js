import {
    findLivreById,
    getAllLivres,
    createLivre,
    updateLivre,
    deleteLivre,
} from "../repositories/livreRepository.js";

// Fonction pour récupérer un article par son ID
export async function getLivreById(id) {
    const livre = await findLivreById(id);
    return livre;
}

// Fonction pour récupérer tous les articles
export async function getAll() {
    const livres = await getAllLivres();
    return livres;
}

// Fonction pour créer un article
export async function createLivre(livreData) {
    const validation = await livreValidation(livreData);
    if (validation !== null) {
        return {
            success: false,
            error: validation,
        };
    } else {
        const livre = await createLivre(livreData);
        return { success: true, data: livre };
    }
}

// Fonction pour mettre à jour un article
export async function updateLivre(id, livreData) {
    const validation = await livreValidation(livreData);
    if (validation !== null) {
        return {
            success: false,
            error: validation,
        };
    } else {
        const livre = await updateLivre(id, livreData);
        return { success: true, data: livre };
    }
}

// Fonction pour supprimer un article
export async function deleteLivre(id) {
    await deleteLivre(id);
    return { success: true, message: "Livre deleted successfully" };
}
