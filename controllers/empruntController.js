import {
    serviceGetEmpruntById,
    serviceGetAllEmprunt,
    serviceCreateEmprunt,
    serviceUpdateEmprunt,
    serviceDeleteEmprunt,
} from "../services/empruntService.js";
import { empruntValidation } from "../utils/validator.js";

// Fonction pour récupérer un article par son ID
export async function getEmpruntById(id) {
    const livre = await serviceGetEmpruntById(id);
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
export async function empruntGetAll() {
    const emprunt = await serviceGetAllEmprunt();
    if (emprunt === null) {
        return {
            success: false,
            error: "Aucun livre dans la base de données",
        };
    } else {
        return { success: true, data: emprunt };
    }
}

// Fonction pour créer un article
export async function controllersCreateEmprunt(empruntData) {
    const validation = await empruntValidation(empruntData);

    if (validation !== null) {
        return {
            success: false,
            error: validation,
        };
    } else {
        const emprunt = await serviceCreateEmprunt(empruntData);
        return { success: true, data: emprunt };
    }
}

// Fonction pour mettre à jour un article
export async function controllersUpdateEmprunt(id, empruntData) {
    const existe = await getEmpruntById(id);
    const validation = await empruntValidation(empruntData);
    if (existe === null) {
        return {
            success: false,
            error: "Il n'existe pas de livre avec cet ID",
        };
    } else if (validation !== null) {
        return {
            success: false,
            error: validation,
        };
    } else {
        const emprunt = await serviceUpdateEmprunt(id, empruntData);
        return { success: true, data: emprunt };
    }
}

// Fonction pour supprimer un article
export async function controllersDeleteEmprunt(id) {
    const result = await serviceDeleteEmprunt(id);
    return result;
}
