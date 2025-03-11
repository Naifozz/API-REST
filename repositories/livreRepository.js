import { openDb } from "../config/database.js";

// Fonction pour trouver un article par son ID
export async function findLivreById(id) {
    const db = await openDb();
    const livre = await db.get("SELECT * FROM LIVRE WHERE ID_Livre = ?", [id]);
    return livre;
}

// Fonction pour trouver tous les articles
export async function getAllLivres() {
    const db = await openDb();
    const livres = await db.all("SELECT * FROM LIVRE");
    return livres;
}

// Fonction pour supprimer un article
export async function deleteLivre(id) {
    const db = await openDb();
    await db.run("DELETE FROM LIVRE WHERE ID_Livre = ?", [id]);
    return { success: true, message: "Livre deleted successfully" };
}

// Fonction pour mettre à jour un article
export async function createLivre(livreData) {
    const db = await openDb();
    const { Titre, ISBN, Annee_Publication, Nb_Pages, Editeur } = livreData;
    await db.run(
        "INSERT INTO LIVRE (Titre, ISBN, Annee_Publication, Nb_Pages, Editeur) VALUES (?, ?, ?, ?, ?)",
        [Titre, ISBN, Annee_Publication, Nb_Pages, Editeur]
    );
    const livre = await db.get("SELECT * FROM LIVRE WHERE Titre = ?", [Titre]);
    return livre;
}

// Fonction pour mettre à jour un article
export async function updateLivre(id, livreData) {
    const db = await openDb();
    const { Titre, ISBN, Annee_Publication, Nb_Pages, Editeur } = livreData;
    await db.run(
        "UPDATE LIVRE SET Titre = ?, ISBN = ?, Annee_Publication = ?, Nb_Pages = ?, Editeur = ? WHERE ID_Livre = ?",
        [Titre, ISBN, Annee_Publication, Nb_Pages, Editeur, id]
    );
    const livre = await db.get("SELECT * FROM LIVRE WHERE ID_Livre = ?", [id]);
    return livre;
}

// Livre par categorie

export async function categorieLivre(id) {
    const db = await openDb();
    const livre = await db.all(
        `SELECT C.Nom, L.Titre, L.ISBN, L.Annee_Publication, L.Nb_Pages, L.Editeur FROM LIVRE L 
        JOIN CATEGORIE_LIVRE ON L.ID_Livre = CATEGORIE_LIVRE.ID_Livre 
        JOIN CATEGORIE C ON C.ID_Categorie = CATEGORIE_LIVRE.ID_Categorie 
        WHERE C.ID_Categorie = ?`,
        [id]
    );
    return livre;
}
export async function livreAuteur(id) {
    const db = await openDb();
    const livres = await db.all(
        `
        SELECT A.Nom, A.Prenom, L.Titre, L.ISBN, L.Annee_Publication, L.Nb_Pages, L.Editeur FROM LIVRE L
        JOIN ECRITURE E ON L.ID_Livre = E.ID_Livre
        JOIN AUTEUR A ON A.ID_Auteur = E.ID_Auteur
        WHERE A.ID_Auteur = ?`,
        [id]
    );
    return livres;
}

export async function livrePage(offset, limit) {
    const db = await openDb();
    const livres = await db.all(`SELECT * FROM LIVRE LIMIT ? OFFSET ?`, [limit, offset]);
    return livres;
}
