import {
    serviceGetAuteurById,
    serviceGetAllAuteurs,
    serviceCreateAuteur,
    serviceUpdateAuteur,
    serviceDeleteAuteur,
} from "../services/auteurService.js";
import { auteurValidation } from "../utils/validator.js";

// Fonction pour récupérer un auteur par son ID
export async function getAuteurById(id) {
    try {
        const auteur = await serviceGetAuteurById(id);
        if (auteur === null) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Auteur non trouvé" }));
        }
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: auteur }));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}

// Fonction pour récupérer tous les auteurs
export async function getAllAuteurs() {
    try {
        const auteurs = await serviceGetAllAuteurs();

        if (auteurs === null) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Aucun auteur trouvé" }));
        }

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
        const validation = await auteurValidation(auteurData);
        if (validation !== null) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: validation }));
        }
        const auteur = await serviceCreateAuteur(auteurData);
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
        const validation = await auteurValidation(auteurData);
        if (validation !== null) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: validation }));
        }
        const existe = await getAuteurById(id);
        if (!existe) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Auteur non trouvé" }));
        }
        const auteur = await serviceUpdateAuteur(id, auteurData);

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: auteur }));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}

// Fonction pour supprimer un auteur
export async function deleteAuteur(res, id) {
    try {
        const result = await serviceDeleteAuteur(id);

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true, data: result }));
    } catch (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}
