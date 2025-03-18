process.env.NODE_ENV = "test";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { resetDbTest } from "../../config/databaseTest.js";
import { openDb } from "../../config/database.js";
import {
    serviceGetLivreById,
    serviceGetAllLivres,
    serviceCreateLivre,
    serviceUpdateLivre,
    serviceDeleteLivre,
} from "../../services/livreService.js";

beforeAll(async () => {
    // Réinitialiser la base de données de test avant d'exécuter les tests
    await resetDbTest();
});

afterAll(async () => {
    // Fermer la base de données après les tests
    const db = await openDb();
    await db.close();
});

describe("Livre Service Tests", () => {
    it("should retrieve all books", async () => {
        const livres = await serviceGetAllLivres();
        expect(livres).toBeInstanceOf(Array);
        expect(livres.length).toBeGreaterThan(0);
    });

    it("should retrieve a book by ID", async () => {
        const db = await openDb();
        // Créer un livre pour le test
        const newLivre = {
            Titre: "Livre Test",
            ISBN: "1234567890123",
            Annee_Publication: 2025,
            Nb_Pages: 300,
            Editeur: "Editeur Test",
        };
        await db.run(
            "INSERT INTO LIVRE (Titre, ISBN, Annee_Publication, Nb_Pages, Editeur) VALUES (?, ?, ?, ?, ?)",
            [
                newLivre.Titre,
                newLivre.ISBN,
                newLivre.Annee_Publication,
                newLivre.Nb_Pages,
                newLivre.Editeur,
            ]
        );
        const createdLivre = await db.get("SELECT * FROM LIVRE WHERE ISBN = ?", [newLivre.ISBN]);

        const livre = await serviceGetLivreById(createdLivre.ID_Livre);
        expect(livre).toBeDefined();
        expect(livre.ID_Livre).toBe(createdLivre.ID_Livre);
    });

    it("should create a new book", async () => {
        const newLivre = {
            Titre: "Nouveau Livre",
            ISBN: "1234567890126",
            Annee_Publication: 2025,
            Nb_Pages: 300,
            Editeur: "Editeur Test",
        };
        const livre = await serviceCreateLivre(newLivre);
        expect(livre).toBeDefined();
        expect(livre.Titre).toBe(newLivre.Titre);
        expect(livre.ISBN).toBe(newLivre.ISBN);
    });

    it("should update a book", async () => {
        const db = await openDb();
        // Créer un livre pour le test
        const newLivre = {
            Titre: "Livre Test",
            ISBN: "1234567890128",
            Annee_Publication: 2025,
            Nb_Pages: 300,
            Editeur: "Editeur Test",
        };
        await db.run(
            "INSERT INTO LIVRE (Titre, ISBN, Annee_Publication, Nb_Pages, Editeur) VALUES (?, ?, ?, ?, ?)",
            [
                newLivre.Titre,
                newLivre.ISBN,
                newLivre.Annee_Publication,
                newLivre.Nb_Pages,
                newLivre.Editeur,
            ]
        );
        const createdLivre = await db.get("SELECT * FROM LIVRE WHERE ISBN = ?", [newLivre.ISBN]);

        const updatedLivre = {
            Titre: "Livre Mis à Jour",
            ISBN: "1234567890148",
            Annee_Publication: 2025,
            Nb_Pages: 350,
            Editeur: "Editeur Mis à Jour",
        };
        const livre = await serviceUpdateLivre(createdLivre.ID_Livre, updatedLivre);

        // Vérifier que le livre a été mis à jour
        expect(livre).toBeDefined();
        expect(livre.Titre).toBe(updatedLivre.Titre);
        expect(livre.ISBN).toBe(updatedLivre.ISBN);
    });

    it("should delete a book and its associated records", async () => {
        const db = await openDb();

        // Créer un nouveau livre
        const newLivre = {
            Titre: "Livre à Supprimer",
            ISBN: "1234567890124",
            Annee_Publication: 2025,
            Nb_Pages: 300,
            Editeur: "Editeur Test",
        };
        await db.run(
            "INSERT INTO LIVRE (Titre, ISBN, Annee_Publication, Nb_Pages, Editeur) VALUES (?, ?, ?, ?, ?)",
            [
                newLivre.Titre,
                newLivre.ISBN,
                newLivre.Annee_Publication,
                newLivre.Nb_Pages,
                newLivre.Editeur,
            ]
        );
        const createdLivre = await db.get("SELECT * FROM LIVRE WHERE ISBN = ?", [newLivre.ISBN]);

        // Ajouter des enregistrements associés
        await db.run("INSERT INTO EXEMPLAIRE (ID_Livre, Etat, Disponibilite) VALUES (?, ?, ?)", [
            createdLivre.ID_Livre,
            1,
            1,
        ]);
        await db.run("INSERT INTO ECRITURE (ID_Auteur, ID_Livre, Role) VALUES (?, ?, ?)", [
            1,
            createdLivre.ID_Livre,
            "Auteur",
        ]);
        await db.run("INSERT INTO CATEGORIE_LIVRE (ID_Categorie, ID_Livre) VALUES (?, ?)", [
            1,
            createdLivre.ID_Livre,
        ]);

        // Supprimer le livre
        await serviceDeleteLivre(createdLivre.ID_Livre);

        // Vérifier que le livre a été supprimé
        const deletedLivre = await db.get("SELECT * FROM LIVRE WHERE ID_Livre = ?", [
            createdLivre.ID_Livre,
        ]);
        expect(deletedLivre).toBeUndefined();

        // Vérifier que les enregistrements associés ont été supprimés
        const associatedExemplaires = await db.all("SELECT * FROM EXEMPLAIRE WHERE ID_Livre = ?", [
            createdLivre.ID_Livre,
        ]);
        expect(associatedExemplaires.length).toBe(0);

        const associatedEcritures = await db.all("SELECT * FROM ECRITURE WHERE ID_Livre = ?", [
            createdLivre.ID_Livre,
        ]);
        expect(associatedEcritures.length).toBe(0);

        const associatedCategories = await db.all(
            "SELECT * FROM CATEGORIE_LIVRE WHERE ID_Livre = ?",
            [createdLivre.ID_Livre]
        );
        expect(associatedCategories.length).toBe(0);
    });
});
