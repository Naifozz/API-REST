import { openDb } from "../config/database.js";

// Fonction pour trouver un auteur par son ID
export async function findAuteurById(id) {
    try {
        const db = await openDb();
        const auteur = await db.get("SELECT * FROM AUTEUR WHERE ID_Auteur = ?", [id]);
        if (!auteur) {
            throw new Error("Auteur non trouvé");
        }
        return auteur;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'auteur: ${error.message}`);
    }
}

// Fonction pour trouver tous les auteurs
export async function getAllAuteurs() {
    try {
        const db = await openDb();
        const auteurs = await db.all("SELECT * FROM AUTEUR");
        if (!auteurs) {
            throw new Error("Aucun auteur trouvé");
        }
        return auteurs;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des auteurs: ${error.message}`);
    }
}

// Fonction pour supprimer un auteur
export async function deleteAuteur(id) {
    try {
        const db = await openDb();
        const result = await db.run("DELETE FROM AUTEUR WHERE ID_Auteur = ?", [id]);
        if (result.changes === 0) {
            throw new Error("Auteur non trouvé ou déjà supprimé");
        }
        return "Auteur supprimé avec succès";
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'auteur: ${error.message}`);
    }
}

// Fonction pour créer un auteur
export async function createAuteur(auteurData) {
    try {
        const db = await openDb();
        const { Nom, Prenom, Date_Naissance, ID_Pays } = auteurData;
        await db.run(
            "INSERT INTO AUTEUR (Nom, Prenom, Date_Naissance, ID_Pays) VALUES (?, ?, ?, ?)",
            [Nom, Prenom, Date_Naissance, ID_Pays]
        );
        const auteur = await db.get("SELECT * FROM AUTEUR WHERE Nom = ?", [Nom]);
        if (!auteur) {
            throw new Error("Erreur lors de la création de l'auteur");
        }
        return auteur;
    } catch (error) {
        throw new Error(`Erreur lors de la création de l'auteur: ${error.message}`);
    }
}

// Fonction pour mettre à jour un auteur
export async function updateAuteur(id, auteurData) {
    try {
        const db = await openDb();
        const { Nom, Prenom, Date_Naissance, ID_Pays } = auteurData;
        const result = await db.run(
            "UPDATE AUTEUR SET Nom = ?, Prenom = ?, Date_Naissance = ?, ID_Pays = ? WHERE ID_Auteur = ?",
            [Nom, Prenom, Date_Naissance, ID_Pays, id]
        );
        if (result.changes === 0) {
            throw new Error("Auteur non trouvé ou aucune mise à jour effectuée");
        }
        const auteur = await db.get("SELECT * FROM AUTEUR WHERE ID_Auteur = ?", [id]);
        if (!auteur) {
            throw new Error("Erreur lors de la mise à jour de l'auteur");
        }
        return auteur;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'auteur: ${error.message}`);
    }
}
