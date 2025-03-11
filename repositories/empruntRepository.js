import { openDb } from "../config/database.js";

// Fonction pour trouver un emprunt par son ID
export async function findEmpruntById(id) {
    try {
        const db = await openDb();
        const emprunt = await db.get("SELECT * FROM EMPRUNT WHERE ID_Emprunt = ?", [id]);
        if (!emprunt) {
            throw new Error("Emprunt non trouvé");
        }
        return emprunt;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'emprunt: ${error.message}`);
    }
}

// Fonction pour trouver tous les emprunts
export async function getAllEmprunts() {
    try {
        const db = await openDb();
        const emprunts = await db.all("SELECT * FROM EMPRUNT");
        if (!emprunts) {
            throw new Error("Aucun emprunt trouvé");
        }
        return emprunts;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des emprunts: ${error.message}`);
    }
}

// Fonction pour supprimer un emprunt
export async function deleteEmprunt(id) {
    try {
        const db = await openDb();
        const result = await db.run("DELETE FROM EMPRUNT WHERE ID_Emprunt = ?", [id]);
        if (result.changes === 0) {
            throw new Error("Emprunt non trouvé ou déjà supprimé");
        }
        return "Emprunt supprimé avec succès";
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'emprunt: ${error.message}`);
    }
}

// Fonction pour créer un emprunt
export async function createEmprunt(empruntData) {
    try {
        const db = await openDb();
        const { ID_Membre, ID_Exemplaire, Date_Retour_Effective } = empruntData;
        await db.run(
            "INSERT INTO EMPRUNT (ID_Membre, ID_Exemplaire, Date_Retour_Effective) VALUES (?, ?, ?)",
            [ID_Membre, ID_Exemplaire, Date_Retour_Effective]
        );
        const emprunt = await db.get(
            "SELECT * FROM EMPRUNT WHERE ID_Membre = ? AND ID_Exemplaire = ? AND Date_Retour_Effective = ?",
            [ID_Membre, ID_Exemplaire, Date_Retour_Effective]
        );
        if (!emprunt) {
            throw new Error("Erreur lors de la création de l'emprunt");
        }
        return emprunt;
    } catch (error) {
        throw new Error(`Erreur lors de la création de l'emprunt: ${error.message}`);
    }
}

// Fonction pour mettre à jour un emprunt
export async function updateEmprunt(id, empruntData) {
    try {
        const db = await openDb();
        const { ID_Membre, ID_Exemplaire, Date_Retour_Effective } = empruntData;
        const result = await db.run(
            "UPDATE EMPRUNT SET ID_Membre = ?, ID_Exemplaire = ?, Date_Retour_Effective = ? WHERE ID_Emprunt = ?",
            [ID_Membre, ID_Exemplaire, Date_Retour_Effective, id]
        );
        if (result.changes === 0) {
            throw new Error("Emprunt non trouvé ou aucune mise à jour effectuée");
        }
        const emprunt = await db.get("SELECT * FROM EMPRUNT WHERE ID_Emprunt = ?", [id]);
        if (!emprunt) {
            throw new Error("Erreur lors de la mise à jour de l'emprunt");
        }
        return emprunt;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'emprunt: ${error.message}`);
    }
}
