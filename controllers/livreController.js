import {
    serviceGetLivreById,
    serviceGetAll,
    serviceCreateLivre,
    serviceUpdateLivre,
    serviceDeleteLivre,
    serviceCategorieLivre,
    serviceLivreAuteur,
} from "../services/livreService.js";
import { livreValidation } from "../utils/validator.js";

// Fonction pour récupérer un article par son ID
export async function getLivreById(id) {
    const livre = await serviceGetLivreById(id);
    if (livre === null) {
        return {
            success: false,
            error: "Le livre n'existe pas",
        };
    } else {
        return { success: true, data: livre };
    }
}

// Fonction pour récupérer tous les articles
export async function livreGetAll() {
    const livres = await serviceGetAll();
    if (livres === null) {
        return {
            success: false,
            error: "Aucun livre dans la base de données",
        };
    } else {
        return { success: true, data: livres };
    }
}

// Fonction pour créer un article
export async function controllersCreateLivre(livreData) {
    const livre = await serviceCreateLivre(livreData);
    return { success: true, data: livre };
}

// Fonction pour mettre à jour un article
export async function controllersUpdateLivre(id, livreData) {
    const validation = await livreValidation(livreData);
    if (validation !== null) {
        return {
            success: false,
            error: validation,
        };
    } else {
        const livre = await serviceUpdateLivre(id, livreData);
        return { success: true, data: livre };
    }
}

// Fonction pour supprimer un article
export async function controllersDeleteLivre(id) {
    const result = await serviceDeleteLivre(id);
    return result;
}
export async function controllersCategorieLivre(id) {
    const result = await serviceCategorieLivre(id);
    return result;
}

export async function controllersLivreAuteur(id) {
    const result = await serviceLivreAuteur(id);
    return result;
}
