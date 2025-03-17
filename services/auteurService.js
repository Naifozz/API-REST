import {
    findAuteurById,
    getAllAuteurs,
    createAuteur,
    updateAuteur,
    deleteAuteur,
} from "../repositories/auteurRepository.js";
import { deleteExemplaire } from "../repositories/exemplaireRepository.js";
import { auteurToDb, validerAuteur } from "../models/auteurModels.js";

// Fonction pour récupérer un auteur par son ID
export async function serviceGetAuteurById(id) {
    try {
        const auteur = await findAuteurById(id);
        if (auteur === null) {
            throw new Error("Auteur non trouvé");
        }
        return auteur;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'auteur: ${error.message}`);
    }
}

// Fonction pour récupérer tous les auteurs
export async function serviceGetAllAuteurs() {
    try {
        const auteurs = await getAllAuteurs();
        if (auteurs === null) {
            throw new Error("Aucun auteur trouvé");
        }
        return auteurs;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des auteurs: ${error.message}`);
    }
}

// Fonction pour créer un auteur
export async function serviceCreateAuteur(res, auteurData) {
    try {
        const dbAuteur = auteurToDb(auteurData);
        const validation = validerAuteur(auteurData);
        if (!validation.estValide) {
            throw new Error(JSON.stringify(validation.erreurs));
        }
        const auteur = await createAuteur(dbAuteur);
        return auteur;
    } catch (error) {
        throw new Error(`Erreur lors de la création de l'auteur: ${error.message}`);
    }
}

// Fonction pour mettre à jour un auteur
export async function serviceUpdateAuteur(id, auteurData) {
    try {
        const dbAuteur = auteurToDb(auteurData);

        const validation = validerAuteur(auteurData);
        if (!validation.estValide) {
            throw new Error(JSON.stringify(validation.erreurs));
        }
        const existe = await findAuteurById(id);
        if (!existe) {
            throw new Error("Auteur non trouvé");
        }
        const auteur = await updateAuteur(id, dbAuteur);
        return auteur;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'auteur: ${error.message}`);
    }
}

// Fonction pour supprimer un auteur
export async function serviceDeleteAuteur(id) {
    try {
        const exemplaire = await deleteExemplaire(id);
        const result = await deleteAuteur(id);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'auteur: ${error.message}`);
    }
}
