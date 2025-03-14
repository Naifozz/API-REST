import {
    serviceGetEmpruntById,
    serviceGetAllEmprunt,
    serviceCreateEmprunt,
    serviceUpdateEmprunt,
    serviceDeleteEmprunt,
} from "../services/empruntService.js";
import { parseRequestBody } from "../utils/httpHelper.js";

// Fonction pour récupérer un emprunt par son ID
export async function getEmpruntById(req, res, id) {
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
export async function empruntGetAll(req, res) {
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
        const emprunt = await serviceCreateEmprunt(res, empruntData);
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
        const emprunt = await serviceUpdateEmprunt(res, id, empruntData);

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(emprunt));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify("Erreur Serveur", error.message));
    }
}

// Fonction pour supprimer un emprunt
export async function controllersDeleteEmprunt(req, res, id) {
    try {
        const result = await serviceDeleteEmprunt(id);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(result));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify("Erreur Serveur"));
    }
}
