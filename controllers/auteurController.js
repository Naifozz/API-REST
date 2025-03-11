import {
    serviceGetAuteurById,
    serviceGetAllAuteurs,
    serviceCreateAuteur,
    serviceUpdateAuteur,
    serviceDeleteAuteur,
} from "../services/auteurService.js";
import { auteurValidation } from "../utils/validator.js";
// Fonction pour récupérer un article par son ID
export async function getAuteurById(id) {
    const auteur = await serviceGetAuteurById(id);
    if (auteur === null) {
        return {
            success: false,
            error: "Le livre n'existe pas",
        };
    } else {
        return { success: true, data: auteur };
    }
}

// Fonction pour récupérer tous les articles
export async function getAllAuteurs() {
    const auteurs = await serviceGetAllAuteurs();
    if (auteurs === null) {
        return {
            success: false,
            error: "Aucun livre dans la base de données",
        };
    } else {
        return { success: true, data: auteurs };
    }
}

// Fonction pour créer un article
export async function createAuteur(auteurData) {
    const validation = await auteurValidation(auteurData);
    if (validation !== null) {
        return {
            success: false,
            error: validation,
        };
    } else {
        const auteur = await serviceCreateAuteur(auteurData);
        return { success: true, data: auteur };
    }
}

// Fonction pour mettre à jour un article
export async function updateAuteur(id, auteurData) {
    const validation = await auteurValidation(auteurData);
    const existe = await getAuteurById(id);
    if (validation !== null) {
        return {
            success: false,
            error: validation,
        };
    } else if (existe === null) {
        return {
            success: false,
            error: "Il n'existe pas de livre avec cet ID",
        };
    } else {
        const auteur = await serviceUpdateAuteur(id, auteurData);
        return { success: true, data: auteur };
    }
}

// Fonction pour supprimer un article
export async function deleteAuteur(id) {
    const result = await serviceDeleteAuteur(id);
    return result;
}
