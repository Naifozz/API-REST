import {
    serviceGetLivreById,
    serviceGetAll,
    serviceCreateLivre,
    serviceUpdateLivre,
    serviceDeleteLivre,
    serviceCategorieLivre,
    serviceLivreAuteur,
    serviceLivrePage,
} from "../services/livreService.js";
import { parseRequestBody } from "../utils/httpHelper.js";

// Fonction pour récupérer un livre par son ID
export async function getLivreById(req, res, id) {
    try {
        const livre = await serviceGetLivreById(id);

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: livre }));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: "Erreur Serveur" }));
    }
}

// Fonction pour récupérer tous les livres
export async function livreGetAll(req, res) {
    try {
        const livres = await serviceGetAll();

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: livres }));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: "Erreur Serveur" }));
    }
}

// Fonction pour créer un livre
export async function controllersCreateLivre(req, res) {
    try {
        const livreData = await parseRequestBody(req);
        const livre = await serviceCreateLivre(res, livreData);

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: livre }));
    } catch (error) {
        const statusCode = error.message.includes("requis") ? 400 : 500;
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}

// Fonction pour mettre à jour un livre
export async function controllersUpdateLivre(req, res, id) {
    const livreData = await parseRequestBody(req);
    try {
        const livre = await serviceUpdateLivre(res, id, livreData);

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: livre }));
    } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}

// Fonction pour supprimer un livre
export async function controllersDeleteLivre(id) {
    try {
        const result = await serviceDeleteLivre(id);

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: result }));
    } catch (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}

// Fonction pour récupérer les livres par catégorie
export async function controllersCategorieLivre(res, id) {
    try {
        const result = await serviceCategorieLivre(id);

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: result }));
    } catch (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}

// Fonction pour récupérer les livres par auteur
export async function controllersLivreAuteur(res, id) {
    try {
        const result = await serviceLivreAuteur(id);

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: result }));
    } catch (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}

// Fonction pour récupérer les livres par page
export async function controllersLivrePage(offset, limit) {
    try {
        const result = await serviceLivrePage(offset, limit);

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: result }));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}
