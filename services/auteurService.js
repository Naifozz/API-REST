import {
    findAuteurById,
    getAllAuteurs,
    createAuteur,
    updateAuteur,
    deleteAuteur,
} from "../repositories/auteurRepository.js";

// Fonction pour récupérer un auteur par son ID
export async function serviceGetAuteurById(id) {
    try {
        const auteur = await findAuteurById(id);
        return auteur;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'auteur: ${error.message}`);
    }
}

// Fonction pour récupérer tous les auteurs
export async function serviceGetAllAuteurs() {
    try {
        const auteurs = await getAllAuteurs();
        return auteurs;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des auteurs: ${error.message}`);
    }
}

// Fonction pour créer un auteur
export async function serviceCreateAuteur(auteurData) {
    try {
        const auteur = await createAuteur(auteurData);
        return auteur;
    } catch (error) {
        throw new Error(`Erreur lors de la création de l'auteur: ${error.message}`);
    }
}

// Fonction pour mettre à jour un auteur
export async function serviceUpdateAuteur(id, auteurData) {
    try {
        const auteur = await updateAuteur(id, auteurData);
        return auteur;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'auteur: ${error.message}`);
    }
}

// Fonction pour supprimer un auteur
export async function serviceDeleteAuteur(id) {
    try {
        const result = await deleteAuteur(id);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'auteur: ${error.message}`);
    }
}
