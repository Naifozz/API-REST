process.env.NODE_ENV = "test";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { resetDbTest } from "../../config/databaseTest.js";
import { openDb } from "../../config/database.js";
import {
    findAuteurById,
    getAllAuteurs,
    createAuteur,
    updateAuteur,
    deleteAuteur,
} from "../../repositories/auteurRepository.js";

beforeAll(async () => {
    // Réinitialiser la base de données de test avant d'exécuter les tests
    await resetDbTest();
});

afterAll(async () => {
    // Fermer la base de données après les tests
    const db = await openDb();
    await db.close();
});

describe("Auteur Repository Tests", () => {
    it("should retrieve all authors", async () => {
        const auteurs = await getAllAuteurs();
        expect(auteurs).toBeInstanceOf(Array);
        expect(auteurs.length).toBeGreaterThan(0);
    });

    it("should retrieve an author by ID", async () => {
        const db = await openDb();
        // Créer un auteur pour le test
        const newAuteur = {
            Nom: "Doe",
            Prenom: "John",
            Date_Naissance: "1980-01-01",
            ID_Pays: 1,
        };
        await createAuteur(newAuteur);
        const createdAuteur = await db.get("SELECT * FROM AUTEUR WHERE Nom = ?", [newAuteur.Nom]);

        const auteur = await findAuteurById(createdAuteur.ID_Auteur);
        expect(auteur).toBeDefined();
        expect(auteur.ID_Auteur).toBe(createdAuteur.ID_Auteur);
    });

    it("should create a new author", async () => {
        const newAuteur = {
            Nom: "Smith",
            Prenom: "Jane",
            Date_Naissance: "1990-05-15",
            ID_Pays: 2,
        };
        const auteur = await createAuteur(newAuteur);
        expect(auteur).toBeDefined();
        expect(auteur.nom).toBe(newAuteur.Nom);
        expect(auteur.prenom).toBe(newAuteur.Prenom);
    });

    it("should update an author", async () => {
        const db = await openDb();
        // Créer un auteur pour le test
        const newAuteur = {
            Nom: "Brown",
            Prenom: "Charlie",
            Date_Naissance: "1975-03-10",
            ID_Pays: 3,
        };
        await createAuteur(newAuteur);
        const createdAuteur = await db.get("SELECT * FROM AUTEUR WHERE Nom = ?", [newAuteur.Nom]);

        const updatedAuteur = {
            Nom: "Brown",
            Prenom: "Charles",
            Date_Naissance: "1975-03-10",
            ID_Pays: 4,
        };
        const auteur = await updateAuteur(createdAuteur.ID_Auteur, updatedAuteur);

        // Vérifier que l'auteur a été mis à jour
        expect(auteur).toBeDefined();
        expect(auteur.prenom).toBe(updatedAuteur.Prenom);
        expect(auteur.idPays).toBe(updatedAuteur.ID_Pays);
    });

    it("should delete an author", async () => {
        const db = await openDb();
        // Créer un auteur pour le test
        const newAuteur = {
            Nom: "Taylor",
            Prenom: "Chris",
            Date_Naissance: "1985-07-20",
            ID_Pays: 5,
        };
        await createAuteur(newAuteur);
        const createdAuteur = await db.get("SELECT * FROM AUTEUR WHERE Nom = ?", [newAuteur.Nom]);

        // Supprimer l'auteur
        await deleteAuteur(createdAuteur.ID_Auteur);

        // Vérifier que l'auteur a été supprimé
        const deletedAuteur = await db.get("SELECT * FROM AUTEUR WHERE ID_Auteur = ?", [
            createdAuteur.ID_Auteur,
        ]);
        expect(deletedAuteur).toBeUndefined();
    });
});
