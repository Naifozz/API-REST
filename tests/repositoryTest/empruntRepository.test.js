process.env.NODE_ENV = "test";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { resetDbTest } from "../../config/databaseTest.js";
import { openDb } from "../../config/database.js";
import {
    findEmpruntById,
    getAllEmprunts,
    createEmprunt,
    updateEmprunt,
    deleteEmprunt,
} from "../../repositories/empruntRepository.js";

beforeAll(async () => {
    // Réinitialiser la base de données de test avant d'exécuter les tests
    await resetDbTest();
});

afterAll(async () => {
    // Fermer la base de données après les tests
    const db = await openDb();
    await db.close();
});

describe("Emprunt Repository Tests", () => {
    it("should retrieve all loans", async () => {
        const emprunts = await getAllEmprunts();
        expect(emprunts).toBeInstanceOf(Array);
        expect(emprunts.length).toBeGreaterThan(0);
    });

    it("should retrieve a loan by ID", async () => {
        const db = await openDb();
        // Créer un emprunt pour le test
        const newEmprunt = {
            ID_Membre: 1,
            ID_Exemplaire: 1,
            Date_Retour_Effective: null,
        };
        await createEmprunt(newEmprunt);
        const createdEmprunt = await db.get(
            "SELECT * FROM EMPRUNT WHERE ID_Membre = ? AND ID_Exemplaire = ?",
            [newEmprunt.ID_Membre, newEmprunt.ID_Exemplaire]
        );

        const emprunt = await findEmpruntById(createdEmprunt.ID_Emprunt);
        expect(emprunt).toBeDefined();
        expect(emprunt.ID_Emprunt).toBe(createdEmprunt.ID_Emprunt);
    });

    it("should create a new loan", async () => {
        const newEmprunt = {
            ID_Membre: 1,
            ID_Exemplaire: 1,
            Date_Retour_Effective: null,
        };
        const emprunt = await createEmprunt(newEmprunt);
        expect(emprunt).toBeDefined();
        expect(emprunt.ID_Membre).toBe(newEmprunt.ID_Membre);
        expect(emprunt.ID_Exemplaire).toBe(newEmprunt.ID_Exemplaire);
    });

    it("should update a loan", async () => {
        const db = await openDb();
        // Créer un emprunt pour le test
        const newEmprunt = {
            ID_Membre: 1,
            ID_Exemplaire: 1,
            Date_Retour_Effective: null,
        };
        await createEmprunt(newEmprunt);
        const createdEmprunt = await db.get(
            "SELECT * FROM EMPRUNT WHERE ID_Membre = ? AND ID_Exemplaire = ?",
            [newEmprunt.ID_Membre, newEmprunt.ID_Exemplaire]
        );

        const updatedEmprunt = {
            ID_Membre: 2,
            ID_Exemplaire: 2,
            Date_Retour_Effective: "2025-12-31",
        };
        await updateEmprunt(createdEmprunt.ID_Emprunt, updatedEmprunt);

        // Vérifier que l'emprunt a été mis à jour
        const emprunt = await db.get("SELECT * FROM EMPRUNT WHERE ID_Emprunt = ?", [
            createdEmprunt.ID_Emprunt,
        ]);
        expect(emprunt).toBeDefined();
        expect(emprunt.ID_Membre).toBe(updatedEmprunt.ID_Membre);
        expect(emprunt.ID_Exemplaire).toBe(updatedEmprunt.ID_Exemplaire);
        expect(emprunt.Date_Retour_Effective).toBe(updatedEmprunt.Date_Retour_Effective);
    });

    it("should delete a loan", async () => {
        const db = await openDb();
        // Créer un emprunt pour le test
        const newEmprunt = {
            ID_Membre: 1,
            ID_Exemplaire: 1,
            Date_Retour_Effective: null,
        };
        await createEmprunt(newEmprunt);
        const createdEmprunt = await db.get(
            "SELECT * FROM EMPRUNT WHERE ID_Membre = ? AND ID_Exemplaire = ?",
            [newEmprunt.ID_Membre, newEmprunt.ID_Exemplaire]
        );

        // Supprimer l'emprunt
        await deleteEmprunt(createdEmprunt.ID_Emprunt);

        // Vérifier que l'emprunt a été supprimé
        const deletedEmprunt = await db.get("SELECT * FROM EMPRUNT WHERE ID_Emprunt = ?", [
            createdEmprunt.ID_Emprunt,
        ]);

        expect(deletedEmprunt).toBeUndefined();
    });
});
