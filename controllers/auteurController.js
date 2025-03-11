import {
    serviceGetAuteurById,
    serviceGetAllAuteurs,
    serviceCreateAuteur,
    serviceUpdateAuteur,
    serviceDeleteAuteur,
} from "../services/auteurService.js";
import { auteurValidation } from "../utils/validator.js";

// Fonction pour récupérer un auteur par son ID
export async function getAuteurById(id) {
    try {
        const auteur = await serviceGetAuteurById(id);
        if (auteur === null) {
            throw new Error("L'auteur n'existe pas");
        }
        return auteur;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'auteur: ${error.message}`);
    }
}

// Fonction pour récupérer tous les auteurs
export async function getAllAuteurs() {
    try {
        const auteurs = await serviceGetAllAuteurs();
        if (auteurs === null) {
            throw new Error("Aucun auteur dans la base de données");
        }
        return auteurs;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des auteurs: ${error.message}`);
    }
}

// Fonction pour créer un auteur
export async function createAuteur(auteurData) {
    try {
        const validation = await auteurValidation(auteurData);
        if (validation !== null) {
            throw new Error(validation);
        }
        const auteur = await serviceCreateAuteur(auteurData);
        return auteur;
    } catch (error) {
        throw new Error(`Erreur lors de la création de l'auteur: ${error.message}`);
    }
}

// Fonction pour mettre à jour un auteur
export async function updateAuteur(id, auteurData) {
    try {
        const validation = await auteurValidation(auteurData);
        const existe = await getAuteurById(id);
        if (validation !== null) {
            throw new Error(validation);
        }
        const auteur = await serviceUpdateAuteur(id, auteurData);
        return auteur;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'auteur: ${error.message}`);
    }
}

// Fonction pour supprimer un auteur
export async function deleteAuteur(id) {
    try {
        const result = await serviceDeleteAuteur(id);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'auteur: ${error.message}`);
    }
}
