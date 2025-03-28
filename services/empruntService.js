import {
    findEmpruntById,
    getAllEmprunts,
    createEmprunt,
    updateEmprunt,
    deleteEmprunt,
} from "../repositories/empruntRepository.js";
import { verifierDispo, nonDispo, rendreDispo } from "../repositories/exemplaireRepository.js";
import { validerEmprunt, dbToEmprunt, empruntToDb } from "../models/empruntModels.js";

// Fonction pour récupérer un emprunt par son ID
export async function serviceGetEmpruntById(id) {
    try {
        const emprunt = await findEmpruntById(id);
        return emprunt;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'emprunt: ${error.message}`);
    }
}

// Fonction pour récupérer tous les emprunts
export async function serviceGetAllEmprunt() {
    try {
        const emprunts = await getAllEmprunts();
        return emprunts;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des emprunts: ${error.message}`);
    }
}

// Fonction pour créer un emprunt
export async function serviceCreateEmprunt(res, empruntData) {
    try {
        const dbEmprunt = empruntToDb(empruntData);

        const dispo = await verifierDispo(dbEmprunt.ID_Exemplaire);
        if (!dispo) {
            throw new Error("Exemplaire non disponible");
        }

        const validation = validerEmprunt(empruntData);
        if (!validation.erreurs) {
            throw new Error(JSON.stringify(validation.erreurs));
        }
        const emprunt = await createEmprunt(dbEmprunt);

        const enleverDispo = await nonDispo(dbEmprunt.ID_Exemplaire);

        return emprunt;
    } catch (error) {
        throw new Error(`Erreur lors de la création de l'emprunt: ${error.message}`);
    }
}

// Fonction pour mettre à jour un emprunt
export async function serviceUpdateEmprunt(res, id, empruntData) {
    try {
        const dbEmprunt = empruntToDb(empruntData);

        const rendreDisponible = await rendreDispo(id);

        const dispo = await verifierDispo(dbEmprunt.ID_Exemplaire);
        if (!dispo) {
            throw new Error("Exemplaire non disponible");
        }
        const validation = validerEmprunt(empruntData);
        if (!validation.erreurs) {
            throw new Error(JSON.stringify(validation.erreurs));
        }
        const emprunt = await updateEmprunt(id, dbEmprunt);

        const enleverDispo = await nonDispo(dbEmprunt.ID_Exemplaire);
        return { success: true, data: emprunt };
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'emprunt: ${error.message}`);
    }
}

// Fonction pour supprimer un emprunt
export async function serviceDeleteEmprunt(id) {
    try {
        const rendreDisponible = await rendreDispo(id);
        const result = await deleteEmprunt(id);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'emprunt: ${error.message}`);
    }
}
