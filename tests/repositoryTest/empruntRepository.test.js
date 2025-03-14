process.env.NODE_ENV = "test";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
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
        const id = 2; // Remplacez par un ID valide dans votre base de données de test
        const emprunt = await findEmpruntById(id);
        expect(emprunt).toBeDefined();
        expect(emprunt.ID_Emprunt).toBe(id);
    });

    it("should create a new loan", async () => {
        const newEmprunt = {
            ID_Membre: 1,
            ID_Exemplaire: 1,
            Date_Retour_Effective: "",
        };
        const emprunt = await createEmprunt(newEmprunt);
        expect(emprunt).toBeDefined();
        expect(emprunt.ID_Membre).toBe(newEmprunt.ID_Membre);
    });

    it("should update a loan", async () => {
        const id = 2; // Remplacez par un ID valide dans votre base de données de test
        const updatedEmprunt = {
            ID_Emprunt: 2,
            ID_Membre: 1,
            ID_Exemplaire: 1,
            Date_Retour_Effective: "",
        };
        const emprunt = await updateEmprunt(id, updatedEmprunt);
        expect(emprunt).toBeDefined();
        expect(emprunt.ID_Membre).toBe(updatedEmprunt.ID_Membre);
    });

    it("should delete a loan", async () => {
        const id = 2; // Remplacez par un ID valide dans votre base de données de test
        const result = await deleteEmprunt(id);
        expect(result).toBe("Emprunt supprimé avec succès");
    });
});
