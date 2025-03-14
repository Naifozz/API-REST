import sqlite3 from "sqlite3";
import { readFile, copyFile } from "fs/promises";
import path from "path";

/**
 * Copie la base de données initiale dans la base de données de test.
 */
const copyDatabase = async () => {
    const sourceDbPath = path.resolve("./config/bibliotheque.db");
    const testDbPath = path.resolve("./config/bibliotheque_test.db");
    await copyFile(sourceDbPath, testDbPath); // Copie du fichier
};

/**
 * Réinitialise la base de données de test pour revenir à son état initial.
 */
export const resetDbTest = async () => {
    try {
        await copyDatabase(); // Copier la base de données

        // Lire le fichier SQL
        const sqlFilePath = path.resolve("./config/init.sql");
        const sql = await readFile(sqlFilePath, "utf-8");

        // Ouvrir la base de données
        const db = new sqlite3.Database(path.resolve("./config/bibliotheque_test.db"));

        // Exécuter le script SQL
        db.exec(sql, (err) => {
            if (err) {
                console.error("Erreur lors de l'exécution du script SQL:", err.message);
            } else {
                console.info("Base de données de test initialisée avec succès.");
            }
        });

        db.close((err) => {
            if (err) {
                console.error("Erreur lors de la fermeture de la base de données:", err.message);
            } else {
                console.info("Base de données de test fermée avec succès.");
            }
        });
    } catch (error) {
        console.error("Erreur lors de la réinitialisation de la base de données de test:", error);
    }
};
