import { openDb } from "../utils/db.js";

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
    await db.run("DELETE FROM LIVRE WHERE id = ?", [id]);
}

// Fonction pour mettre à jour un article
export async function createLivre(livreData) {
    const db = await openDb();
    const { titre, ISBN, Annee_Publication, Nb_Pages, Editeur } = livreData;
    await db.run(
        "INSERT INTO LIVRE (Titre, ISBN, Annee_Publication, Nb_Pages, Editeur) VALUES (?, ?, ?, ?, ?)",
        [titre, ISBN, Annee_Publication, Nb_Pages, Editeur]
    );
    const livre = await db.get("SELECT * FROM LIVRE WHERE Titre = ?", [Titre]);
    return livre;
}

// Fonction pour mettre à jour un article
export async function updateLivre(id, livreData) {
    const db = await openDb();
    const { titre, ISBN, Annee_Publication, Nb_Pages, Editeur } = livreData;
    await db.run(
        "UPDATE LIVRE SET Titre = ?, ISBN = ?, Annee_Publication = ?, Nb_Pages = ?, Editeur = ? WHERE ID_Livre = ?",
        [titre, ISBN, Annee_Publication, Nb_Pages, Editeur, id]
    );
    const livre = await db.get("SELECT * FROM LIVRE WHERE ID_Livre = ?", [id]);
    return livre;
}
