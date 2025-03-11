import {
    findLivreById,
    getAllLivres,
    createLivre,
    updateLivre,
    deleteLivre,
    categorieLivre,
    livreAuteur,
    livrePage,
} from "../repositories/livreRepository.js";

// Fonction pour récupérer un livre par son ID
export async function serviceGetLivreById(id) {
    try {
        const livre = await findLivreById(id);
        return livre;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du livre: ${error.message}`);
    }
}

// Fonction pour récupérer tous les livres
export async function serviceGetAll() {
    try {
        const livres = await getAllLivres();
        return livres;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des livres: ${error.message}`);
    }
}

// Fonction pour créer un livre
export async function serviceCreateLivre(livreData) {
    try {
        const livre = await createLivre(livreData);
        return livre;
    } catch (error) {
        throw new Error(`Erreur lors de la création du livre: ${error.message}`);
    }
}

// Fonction pour mettre à jour un livre
export async function serviceUpdateLivre(id, livreData) {
    try {
        const livre = await updateLivre(id, livreData);
        return livre;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du livre: ${error.message}`);
    }
}

// Fonction pour supprimer un livre
export async function serviceDeleteLivre(id) {
    try {
        const result = await deleteLivre(id);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression du livre: ${error.message}`);
    }
}

// Fonction pour récupérer les livres par catégorie
export async function serviceCategorieLivre(id) {
    try {
        const result = await categorieLivre(id);
        return result;
    } catch (error) {
        throw new Error(
            `Erreur lors de la récupération des livres par catégorie: ${error.message}`
        );
    }
}

// Fonction pour récupérer les livres par auteur
export async function serviceLivreAuteur(id) {
    try {
        const result = await livreAuteur(id);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des livres par auteur: ${error.message}`);
    }
}

// Fonction pour récupérer les livres par page
export async function serviceLivrePage(offset, limit) {
    try {
        const result = await livrePage(offset, limit);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des livres par page: ${error.message}`);
    }
}
