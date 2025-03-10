import { openDb } from "../config/database.js";

// Fonction pour trouver un article par son ID
export async function findAuteurById(id) {
    const db = await openDb();
    const auteur = await db.get("SELECT * FROM AUTEUR WHERE ID_Auteur = ?", [id]);
    return auteur;
}

// Fonction pour trouver tous les articles
export async function getAllAuteurs() {
    const db = await openDb();
    const auteurs = await db.all("SELECT * FROM AUTEUR");
    return auteurs;
}

// Fonction pour supprimer un article
export async function deleteAuteur(id) {
    const db = await openDb();
    await db.run("DELETE FROM AUTEUR WHERE ID_Auteur = ?", [id]);
    return { success: true, message: "Auteur deleted successfully" };
}

// Fonction pour mettre à jour un article
export async function createAuteur(auteurData) {
    const db = await openDb();
    const { Nom, Prenom, Date_Naissance, ID_Pays } = auteurData;
    await db.run("INSERT INTO AUTEUR (Nom, Prenom, Date_Naissance, ID_Pays) VALUES (?, ?, ?, ?)", [
        Nom,
        Prenom,
        Date_Naissance,
        ID_Pays,
    ]);
    const auteur = await db.get("SELECT * FROM AUTEUR WHERE Nom = ?", [Nom]);
    return auteur;
}

// Fonction pour mettre à jour un article
export async function updateAuteur(id, auteurData) {
    const db = await openDb();
    const { Nom, Prenom, Date_Naissance, ID_Pays } = auteurData;
    await db.run(
        "UPDATE AUTEUR SET Nom = ?, Prenom = ?, Date_Naissance = ?, ID_Pays = ? WHERE ID_Auteur = ?",
        [Nom, Prenom, Date_Naissance, ID_Pays, id]
    );
    const auteur = await db.get("SELECT * FROM AUTEUR WHERE ID_Auteur = ?", [id]);
    return { success: true, data: auteur };
}
