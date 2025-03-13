import {
    serviceGetEmpruntById,
    serviceGetAllEmprunt,
    serviceCreateEmprunt,
    serviceUpdateEmprunt,
    serviceDeleteEmprunt,
} from "../services/empruntService.js";
import { empruntValidation } from "../utils/validator.js";

// Fonction pour récupérer un emprunt par son ID
export async function getEmpruntById(id) {
    try {
        const emprunt = await serviceGetEmpruntById(id);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: emprunt }));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: "Erreur Serveur" }));
    }
}

// Fonction pour récupérer tous les emprunts
export async function empruntGetAll(res) {
    try {
        const emprunts = await serviceGetAllEmprunt();
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: emprunts }));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify("Erreur Serveur"));
    }
}

// Fonction pour créer un emprunt
export async function controllersCreateEmprunt(req, res) {
    const empruntData = await parseRequestBody(req);
    try {
        const validation = await empruntValidation(empruntData);
        if (validation !== null) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: validation }));
        }
        const emprunt = await serviceCreateEmprunt(empruntData);
        res.writeHead(201, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: emprunt }));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}

// Fonction pour mettre à jour un emprunt
export async function controllersUpdateEmprunt(req, res, id) {
    const empruntData = await parseRequestBody(req);
    try {
        const validation = await empruntValidation(empruntData);
        if (validation !== null) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: validation }));
        }
        const emprunt = await serviceUpdateEmprunt(id, empruntData);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify("Données envoyées", emprunt));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify("Erreur Serveur", error.message));
    }
}

// Fonction pour supprimer un emprunt
export async function controllersDeleteEmprunt(id) {
    try {
        const result = await serviceDeleteEmprunt(id);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(result));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify("Erreur Serveur"));
    }
}
