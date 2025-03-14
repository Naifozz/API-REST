import { describe, it, expect } from "vitest";
import { getAllLivres, deleteLivre } from "../../repositories/livreRepository.js";

describe("Livre Service Tests", () => {
    it("should retrieve all books", async () => {
        const livres = await getAllLivres();
        expect(livres).toBeInstanceOf(Array);
        expect(livres.length).toBeGreaterThan(0);
    });

    it("should delete a book by ID", async () => {
        const id = 1; // Remplacez par un ID valide dans votre base de données
        const result = await deleteLivre(id);
        expect(result.success).toBe(true);
        expect(result.message).toBe("Livre supprimé avec succès");
    });
});
