process.env.NODE_ENV = "test";
import { openDb } from "../config/database.js";
import { dbToLivre, livreToDb } from "../models/livreModels.js";

// Fonction pour trouver un livre par son ID
export async function findLivreById(id) {
    try {
        const db = await openDb();
        const livre = await db.get("SELECT * FROM LIVRE WHERE ID_Livre = ?", [id]);
        if (!livre) {
            throw new Error("Livre non trouvé");
        }
        console.log(dbToLivre(livre));

        return dbToLivre(livre);
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du livre: ${error.message}`);
    }
}

// Fonction pour trouver tous les livres
export async function getAllLivres() {
    try {
        const db = await openDb();
        const livres = await db.all("SELECT * FROM LIVRE");
        if (!livres) {
            throw new Error("Aucun livre trouvé");
        }
        return livres;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des livres: ${error.message}`);
    }
}

// Fonction pour supprimer un livre
export async function deleteLivre(id) {
    try {
        const db = await openDb();
        const result = await db.run("DELETE FROM LIVRE WHERE ID_Livre = ?", [id]);
        if (result.changes === 0) {
            throw new Error("Livre non trouvé ou déjà supprimé");
        }
        return { success: true, message: "Livre supprimé avec succès" };
    } catch (error) {
        throw new Error(`Erreur lors de la suppression du livre: ${error.message}`);
    }
}

// Fonction pour créer un livre
export async function createLivre(dbLivre) {
    try {
        const db = await openDb();

        await db.run(
            "INSERT INTO LIVRE (Titre, ISBN, Annee_Publication, Nb_Pages, Editeur) VALUES (?, ?, ?, ?, ?)",
            [
                dbLivre.Titre,
                dbLivre.ISBN,
                dbLivre.Annee_Publication,
                dbLivre.Nb_Pages,
                dbLivre.Editeur,
            ]
        );
        const newDbLivre = await db.get("SELECT * FROM LIVRE WHERE ISBN = ?", [dbLivre.ISBN]);
        if (!newDbLivre) {
            throw new Error("Erreur lors de la création du livre");
        }
        return dbToLivre(newDbLivre);
    } catch (error) {
        throw new Error(`Erreur lors de la création du livre: ${error.message}`);
    }
}

// Fonction pour mettre à jour un livre
export async function updateLivre(id, livreData) {
    try {
        const db = await openDb();
        const { Titre, ISBN, Annee_Publication, Nb_Pages, Editeur } = livreData;
        const result = await db.run(
            "UPDATE LIVRE SET Titre = ?, ISBN = ?, Annee_Publication = ?, Nb_Pages = ?, Editeur = ? WHERE ID_Livre = ?",
            [Titre, ISBN, Annee_Publication, Nb_Pages, Editeur, id]
        );
        if (result.changes === 0) {
            throw new Error("Livre non trouvé ou aucune mise à jour effectuée");
        }
        const livre = await db.get("SELECT * FROM LIVRE WHERE ID_Livre = ?", [id]);
        if (!livre) {
            throw new Error("Erreur lors de la mise à jour du livre");
        }
        return dbToLivre(livre);
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du livre: ${error.message}`);
    }
}

// Fonction pour récupérer les livres par catégorie
export async function categorieLivre(id) {
    try {
        const db = await openDb();
        const livre = await db.all(
            `SELECT C.Nom, L.Titre, L.ISBN, L.Annee_Publication, L.Nb_Pages, L.Editeur FROM LIVRE L 
            JOIN CATEGORIE_LIVRE ON L.ID_Livre = CATEGORIE_LIVRE.ID_Livre 
            JOIN CATEGORIE C ON C.ID_Categorie = CATEGORIE_LIVRE.ID_Categorie 
            WHERE C.ID_Categorie = ?`,
            [id]
        );
        if (!livre) {
            throw new Error("Aucun livre trouvé pour cette catégorie");
        }
        return livre;
    } catch (error) {
        throw new Error(
            `Erreur lors de la récupération des livres par catégorie: ${error.message}`
        );
    }
}

// Fonction pour récupérer les livres par auteur
export async function livreAuteur(id) {
    try {
        const db = await openDb();
        const livres = await db.all(
            `SELECT A.Nom, A.Prenom, L.Titre, L.ISBN, L.Annee_Publication, L.Nb_Pages, L.Editeur FROM LIVRE L
            JOIN ECRITURE E ON L.ID_Livre = E.ID_Livre
            JOIN AUTEUR A ON A.ID_Auteur = E.ID_Auteur
            WHERE A.ID_Auteur = ?`,
            [id]
        );
        if (!livres) {
            throw new Error("Aucun livre trouvé pour cet auteur");
        }
        return livres;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des livres par auteur: ${error.message}`);
    }
}

// Fonction pour récupérer les livres par page
export async function livrePage(offset, limit) {
    try {
        const db = await openDb();
        const livres = await db.all(`SELECT * FROM LIVRE LIMIT ? OFFSET ?`, [limit, offset]);
        if (!livres) {
            throw new Error("Aucun livre trouvé pour cette page");
        }
        return livres;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des livres par page: ${error.message}`);
    }
}
