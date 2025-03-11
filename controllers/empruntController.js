import {
    serviceGetEmpruntById,
    serviceGetAllEmprunt,
    serviceCreateEmprunt,
    serviceUpdateEmprunt,
    serviceDeleteEmprunt,
} from "../services/empruntService.js";
import { empruntValidation } from "../utils/validator.js";

// Fonction pour récupérer un emprunt par son ID
export async function getEmpruntById(id) {
    try {
        const emprunt = await serviceGetEmpruntById(id);
        return emprunt;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'emprunt: ${error.message}`);
    }
}

// Fonction pour récupérer tous les emprunts
export async function empruntGetAll() {
    try {
        const emprunts = await serviceGetAllEmprunt();
        return emprunts;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des emprunts: ${error.message}`);
    }
}

// Fonction pour créer un emprunt
export async function controllersCreateEmprunt(empruntData) {
    try {
        const validation = await empruntValidation(empruntData);
        if (validation !== null) {
            throw new Error(validation);
        }
        const emprunt = await serviceCreateEmprunt(empruntData);
        return emprunt;
    } catch (error) {
        throw new Error(`Erreur lors de la création de l'emprunt: ${error.message}`);
    }
}

// Fonction pour mettre à jour un emprunt
export async function controllersUpdateEmprunt(id, empruntData) {
    try {
        const validation = await empruntValidation(empruntData);
        if (validation !== null) {
            throw new Error(validation);
        }
        const emprunt = await serviceUpdateEmprunt(id, empruntData);
        return emprunt;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'emprunt: ${error.message}`);
    }
}

// Fonction pour supprimer un emprunt
export async function controllersDeleteEmprunt(id) {
    try {
        const result = await serviceDeleteEmprunt(id);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'emprunt: ${error.message}`);
    }
}
