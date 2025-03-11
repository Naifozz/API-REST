import {
    serviceGetLivreById,
    serviceGetAll,
    serviceCreateLivre,
    serviceUpdateLivre,
    serviceDeleteLivre,
    serviceCategorieLivre,
    serviceLivreAuteur,
    serviceLivrePage,
} from "../services/livreService.js";
import { livreValidation } from "../utils/validator.js";

// Fonction pour récupérer un livre par son ID
export async function getLivreById(id) {
    try {
        const livre = await serviceGetLivreById(id);
        if (livre === null) {
            throw new Error("Le livre n'existe pas");
        }
        return livre;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du livre: ${error.message}`);
    }
}

// Fonction pour récupérer tous les livres
export async function livreGetAll() {
    try {
        const livres = await serviceGetAll();
        if (livres === null) {
            throw new Error("Aucun livre dans la base de données");
        }
        return livres;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des livres: ${error.message}`);
    }
}

// Fonction pour créer un livre
export async function controllersCreateLivre(livreData) {
    try {
        const validation = await livreValidation(livreData);
        if (validation !== null) {
            throw new Error(validation);
        }
        const livre = await serviceCreateLivre(livreData);
        return livre;
    } catch (error) {
        throw new Error(`Erreur lors de la création du livre: ${error.message}`);
    }
}

// Fonction pour mettre à jour un livre
export async function controllersUpdateLivre(id, livreData) {
    try {
        const validation = await livreValidation(livreData);
        if (validation !== null) {
            throw new Error(validation);
        }
        const livre = await serviceUpdateLivre(id, livreData);
        return livre;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du livre: ${error.message}`);
    }
}

// Fonction pour supprimer un livre
export async function controllersDeleteLivre(id) {
    try {
        const result = await serviceDeleteLivre(id);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression du livre: ${error.message}`);
    }
}

// Fonction pour récupérer les livres par catégorie
export async function controllersCategorieLivre(id) {
    try {
        const result = await serviceCategorieLivre(id);
        return result;
    } catch (error) {
        throw new Error(
            `Erreur lors de la récupération des livres par catégorie: ${error.message}`
        );
    }
}

// Fonction pour récupérer les livres par auteur
export async function controllersLivreAuteur(id) {
    try {
        const result = await serviceLivreAuteur(id);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des livres par auteur: ${error.message}`);
    }
}

// Fonction pour récupérer les livres par page
export async function controllersLivrePage(offset, limit) {
    try {
        const result = await serviceLivrePage(offset, limit);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des livres par page: ${error.message}`);
    }
}
