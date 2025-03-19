import { openDb } from "../config/database.js";

export async function verifierExemplaire(idExemplaire) {
    const db = await openDb();
    const exemplaire = await db.get("SELECT * FROM EXEMPLAIRE WHERE ID_Exemplaire = ?", [
        idExemplaire,
    ]);
    if (!exemplaire) {
        throw new Error("Exemplaire non trouvé");
    }
    return exemplaire;
}

export async function verifierDispo(idExemplaire) {
    const db = await openDb();
    const exemplaire = await db.get(
        "SELECT * FROM EXEMPLAIRE WHERE ID_Exemplaire = ? AND Disponibilite = 1",
        [idExemplaire]
    );
    if (!exemplaire) {
        throw new Error("Exemplaire non disponible");
    }
    return exemplaire;
}

export async function nonDispo(idExemplaire) {
    const db = await openDb();
    const exemplaire = await db.run(
        "UPDATE EXEMPLAIRE SET Disponibilite = 0 WHERE ID_Exemplaire = ?",
        [idExemplaire]
    );

    return exemplaire;
}

export async function rendreDispo(id) {
    const db = await openDb();
    const exemplaire = await db.get("SELECT ID_Exemplaire FROM EMPRUNT WHERE ID_Emprunt = ?", [id]);

    const exemplaireDispo = await db.run(
        "UPDATE EXEMPLAIRE SET Disponibilite = 1 WHERE ID_Exemplaire = ?",
        [exemplaire.ID_Exemplaire]
    );

    return exemplaireDispo;
}

export async function deleteExemplaire(id) {
    try {
        const db = await openDb();
        const result = await db.run("DELETE FROM EXEMPLAIRE WHERE ID_Exemplaire = ?", [id]);
        if (result.changes === 0) {
            throw new Error("Exemplaire non trouvé ou déjà supprimé");
        }
        return { success: true, message: "Exemplaire supprimé avec succès" };
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'exemplaire: ${error.message}`);
    }
}
