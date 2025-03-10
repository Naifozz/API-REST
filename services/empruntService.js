import {
    findEmpruntById,
    getAllEmprunts,
    createEmprunt,
    updateEmprunt,
    deleteEmprunt,
} from "../repositories/empruntRepository.js";

// Fonction pour récupérer un article par son ID
export async function serviceGetEmpruntById(id) {
    const livre = await findEmpruntById(id);
    return livre;
}

// Fonction pour récupérer tous les articles
export async function serviceGetAllEmprunt() {
    const emprunts = await getAllEmprunts();
    return emprunts;
}

// Fonction pour créer un article
export async function serviceCreateEmprunt(empruntData) {
    const emprunt = await createEmprunt(empruntData);
    if (!emprunt.success) {
        return emprunt;
    } else {
        return { succes: true, data: emprunt };
    }
    // const validation = await livreValidation(livreData);
    // if (validation !== null) {
    //     return {
    //         success: false,
    //         error: validation,
    //     };
    // } else {
    //     const livre = await createLivre(livreData);
    //     return { success: true, data: livre };
    // }
}

// Fonction pour mettre à jour un article
export async function serviceUpdateEmprunt(id, empruntData) {
    const emprunt = await updateEmprunt(id, empruntData);
    if (!emprunt.success) {
        return emprunt;
    } else {
        return { succes: true, data: emprunt };
    }
    // const validation = await livreValidation(livreData);
    // if (validation !== null) {
    //     return {
    //         success: false,
    //         error: validation,
    //     };
    // } else {
    //     const livre = await updateLivre(id, livreData);
    //     return { success: true, data: livre };
    // }
}

// Fonction pour supprimer un article
export async function serviceDeleteEmprunt(id) {
    const result = await deleteEmprunt(id);
    return result;
}
