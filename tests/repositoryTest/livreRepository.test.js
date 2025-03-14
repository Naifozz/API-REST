process.env.NODE_ENV = "test";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { resetDbTest } from "../../config/databaseTest.js";
import { openDb } from "../../config/database.js";
import {
    findLivreById,
    getAllLivres,
    createLivre,
    updateLivre,
    deleteLivre,
} from "../../repositories/livreRepository.js";

beforeAll(async () => {
    // Réinitialiser la base de données de test avant d'exécuter les tests
    await resetDbTest();
});

afterAll(async () => {
    // Fermer la base de données après les tests
    const db = await openDb();
    await db.close();
});

describe("Livre Repository Tests", () => {
    it("should retrieve all books", async () => {
        const livres = await getAllLivres();
        expect(livres).toBeInstanceOf(Array);
        expect(livres.length).toBeGreaterThan(0);
    });

    it("should retrieve a book by ID", async () => {
        const id = 1; // Remplacez par un ID valide dans votre base de données de test
        const livre = await findLivreById(id);
        expect(livre).toBeDefined();
        expect(livre.Id).toBe(id);
    });

    it("should create a new book", async () => {
        const newLivre = {
            Titre: "Nouveau Livre",
            ISBN: "1234567890123",
            Annee_Publication: 2025,
            Nb_Pages: 300,
            Editeur: "Editeur Test",
        };
        const livre = await createLivre(newLivre);
        expect(livre).toBeDefined();
        expect(livre.Titre).toBe(newLivre.Titre);
    });

    it("should update a book", async () => {
        const id = 1; // Remplacez par un ID valide dans votre base de données de test
        const updatedLivre = {
            Titre: "Livre Mis à Jour",
            ISBN: "1234567890127",
            Annee_Publication: 2025,
            Nb_Pages: 350,
            Editeur: "Editeur Mis à Jour",
        };
        const livre = await updateLivre(id, updatedLivre);
        expect(livre).toBeDefined();
        expect(livre.Titre).toBe(updatedLivre.Titre);
    });

    it("should delete a book", async () => {
        const id = 1; // Remplacez par un ID valide dans votre base de données de test
        const result = await deleteLivre(id);
        expect(result.success).toBe(true);
        expect(result.message).toBe("Livre supprimé avec succès");
    });
});
