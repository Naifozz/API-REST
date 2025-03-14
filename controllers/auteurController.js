import {
    serviceGetAuteurById,
    serviceGetAllAuteurs,
    serviceCreateAuteur,
    serviceUpdateAuteur,
    serviceDeleteAuteur,
} from "../services/auteurService.js";
import { auteurValidation } from "../utils/validator.js";
import { parseRequestBody } from "../utils/httpHelper.js";

// Fonction pour récupérer un auteur par son ID
export async function getAuteurById(req, res, id) {
    try {
        const auteur = await serviceGetAuteurById(id);

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: auteur }));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}

// Fonction pour récupérer tous les auteurs
export async function getAllAuteurs(req, res) {
    const auteurs = await serviceGetAllAuteurs();
    try {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: auteurs }));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: "Erreur Serveur" }));
    }
}

// Fonction pour créer un auteur
export async function createAuteur(req, res) {
    const auteurData = await parseRequestBody(req);
    try {
        const auteur = await serviceCreateAuteur(res, auteurData);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(auteur));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}

// Fonction pour mettre à jour un auteur
export async function updateAuteur(req, res, id) {
    const auteurData = await parseRequestBody(req);
    try {
        const auteur = await serviceUpdateAuteur(id, auteurData);

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: auteur }));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}

// Fonction pour supprimer un auteur
export async function deleteAuteur(req, res, id) {
    try {
        const result = await serviceDeleteAuteur(id);

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: result }));
    } catch (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}
