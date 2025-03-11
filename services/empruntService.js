import {
    findEmpruntById,
    getAllEmprunts,
    createEmprunt,
    updateEmprunt,
    deleteEmprunt,
} from "../repositories/empruntRepository.js";

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
export async function serviceCreateEmprunt(empruntData) {
    try {
        const emprunt = await createEmprunt(empruntData);
        return emprunt;
    } catch (error) {
        throw new Error(`Erreur lors de la création de l'emprunt: ${error.message}`);
    }
}

// Fonction pour mettre à jour un emprunt
export async function serviceUpdateEmprunt(id, empruntData) {
    try {
        const emprunt = await updateEmprunt(id, empruntData);
        return emprunt;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'emprunt: ${error.message}`);
    }
}

// Fonction pour supprimer un emprunt
export async function serviceDeleteEmprunt(id) {
    try {
        const result = await deleteEmprunt(id);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'emprunt: ${error.message}`);
    }
}
