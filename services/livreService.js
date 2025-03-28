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
import { findAuteurById } from "../repositories/auteurRepository.js";
import { livreToDb, validerLivre } from "../models/livreModels.js";

// Fonction pour récupérer un livre par son ID
export async function serviceGetLivreById(id) {
    try {
        const livre = await findLivreById(id);
        if (!livre) {
            throw new Error("Livre non trouvé");
        }
        return livre;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Fonction pour récupérer tous les livres
export async function serviceGetAll() {
    try {
        const livres = await getAllLivres();
        if (livres.length === 0) {
            throw new Error("Aucun livre trouvé");
        }
        return livres;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Fonction pour créer un livre
export async function serviceCreateLivre(res, livreData) {
    const dbLivre = livreToDb(livreData);
    const validation = validerLivre(livreData);

    if (!validation.estValide) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: validation.erreurs }));
    }
    try {
        const livre = await createLivre(dbLivre);
        return livre;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Fonction pour mettre à jour un livre
export async function serviceUpdateLivre(res, id, livreData) {
    try {
        const dbLivre = livreToDb(livreData);
        const validation = validerLivre(livreData);
        if (!validation.estValide) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: validation.erreurs }));
        }
        const livre = await updateLivre(id, dbLivre);
        const existe = await findLivreById(id);
        if (!existe) {
            throw new Error("Livre non trouvé");
        }
        return livre;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Fonction pour supprimer un livre
export async function serviceDeleteLivre(id) {
    try {
        const existe = await findLivreById(id);
        if (!existe) {
            throw new Error("Livre non trouvé");
        }
        const result = await deleteLivre(id);

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Fonction pour récupérer les livres par catégorie
export async function serviceCategorieLivre(id) {
    try {
        const result = await categorieLivre(id);
        if (result.length === 0) {
            throw new Error("Catégorie non trouvée");
        }

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Fonction pour récupérer les livres par auteur
export async function serviceLivreAuteur(id) {
    try {
        const existe = await findAuteurById(id);
        if (!existe) {
            throw new Error("Auteur non trouvé");
        }
        try {
            const result = await livreAuteur(id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

// Fonction pour récupérer les livres par page
export async function serviceLivrePage(offset, limit) {
    try {
        const result = await livrePage(offset, limit);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}
