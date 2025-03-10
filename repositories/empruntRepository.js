import { openDb } from "../config/database.js";

// Fonction pour trouver un article par son ID
export async function findEmpruntById(id) {
    const db = await openDb();
    const emprunt = await db.get("SELECT * FROM EMPRUNT WHERE ID_Emprunt = ?", [id]);
    return emprunt;
}

// Fonction pour trouver tous les articles
export async function getAllEmprunts() {
    const db = await openDb();
    const emprunts = await db.all("SELECT * FROM EMPRUNT");
    return emprunts;
}

// Fonction pour supprimer un article
export async function deleteEmprunt(id) {
    const db = await openDb();
    await db.run("DELETE FROM EMPRUNT WHERE ID_Emprunt = ?", [id]);
    return { success: true, message: "Emprunt deleted successfully" };
}

// Fonction pour mettre à jour un article
export async function createEmprunt(empruntData) {
    const db = await openDb();
    const { ID_Membre, ID_Exemplaire, Date_retour_Effective } = empruntData;
    await db.run(
        "INSERT INTO EMPRUNT (ID_Membre, ID_Exemplaire, Date_Retour_Effective) VALUES (?, ?, ?)",
        [ID_Membre, ID_Exemplaire, Date_retour_Effective]
    );
    const success = "Emprunt ajouté";
    return success;
}

// Fonction pour mettre à jour un article
export async function updateEmprunt(id, empruntData) {
    const db = await openDb();
    const { ID_Membre, ID_Exemplaire, Date_retour_Effective } = empruntData;
    await db.run(
        "UPDATE EMPRUNT SET ID_Membre = ?, ID_Exemplaire = ?, Date_Retour_Effective = ? WHERE ID_Emprunt = ?",
        [ID_Membre, ID_Exemplaire, Date_retour_Effective, id]
    );
    const emprunt = await db.get("SELECT * FROM EMPRUNT WHERE ID_Emprunt = ?", [id]);
    return emprunt;
}
