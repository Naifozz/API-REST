// routes/routes.js
import {
    livreGetAll,
    getLivreById,
    controllersCreateLivre,
    controllersUpdateLivre,
    controllersDeleteLivre,
} from "../controllers/livreController.js";
import * as auteurController from "../controllers/auteurController.js";
import {
    getEmpruntById,
    empruntGetAll,
    controllersCreateEmprunt,
    controllersUpdateEmprunt,
    controllersDeleteEmprunt,
} from "../controllers/empruntController.js";
import { logger } from "../utils/logger.js";
import { parseRequestBody } from "../utils/httpHelper.js";

export const routes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    // Routes pour les livres
    if (url === "/api/livres" && method === "GET") {
        const livres = await livreGetAll();

        res.writeHead(201, { "Content-type": "application/json" });
        res.end(JSON.stringify(livres.data));
    } else if (url === "/api/livres" && method === "POST") {
        const livreData = await parseRequestBody(req);

        const result = await controllersCreateLivre(livreData);

        if (!result.success) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result.error));
        }

        res.writeHead(201, { "Content-type": "application/json" });
        res.end(JSON.stringify("Données envoyées", result.data));
    } else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === "GET") {
        const id = url.split("/")[3];
        const livre = await getLivreById(id);

        if (!livre.success) {
            res.writeHead(400, { "Content-type": "application/json" });
            res.end(JSON.stringify(livre.error));
        }

        res.writeHead(201, { "Content-type": "application/json" });
        res.end(JSON.stringify(livre.data));
    } else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === "PUT") {
        const id = url.split("/")[3];
        const livreData = await parseRequestBody(req);

        const result = await controllersUpdateLivre(id, livreData);

        if (!result.success) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result.error));
        }

        res.writeHead(201, { "Content-type": "application/json" });
        res.end(JSON.stringify("Données envoyées", result.data));
    } else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === "DELETE") {
        const id = url.split("/")[3];
        const result = await controllersDeleteLivre(id);

        res.end(JSON.stringify(result.message));
    }

    // Routes pour les auteurs
    else if (url === "/api/auteurs" && method === "GET") {
    } else if (url === "/api/auteurs" && method === "POST") {
        auteurController.createAuteur(req, res);
    } else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === "GET") {
        const id = url.split("/")[3];
        auteurController.getAuteurById(req, res, parseInt(id));
    } else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === "PUT") {
        const id = url.split("/")[3];
        auteurController.updateAuteur(req, res, parseInt(id));
    } else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === "DELETE") {
        const id = url.split("/")[3];
        auteurController.deleteAuteur(req, res, parseInt(id));

        // Routes pour les emprunts
    } else if (url === "/api/emprunts" && method === "GET") {
        const emprunts = await empruntGetAll();

        res.writeHead(201, { "Content-type": "application/json" });
        res.end(JSON.stringify(emprunts.data));
    } else if (url === "/api/emprunts" && method === "POST") {
        const empruntData = await parseRequestBody(req);

        const result = await controllersCreateEmprunt(empruntData);

        if (!result.success) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result.error));
        }

        res.writeHead(201, { "Content-type": "application/json" });
        res.end(JSON.stringify("Données envoyées", result.data));
    } else if (url.match(/^\/api\/emprunts\/([0-9]+)$/) && method === "GET") {
        const id = url.split("/")[3];
        const emprunt = await getEmpruntById(id);

        if (!emprunt.success) {
            res.writeHead(400, { "Content-type": "application/json" });
            res.end(JSON.stringify(emprunt.error));
        }

        res.writeHead(201, { "Content-type": "application/json" });
        res.end(JSON.stringify(emprunt.data));
    } else if (url.match(/^\/api\/emprunts\/([0-9]+)$/) && method === "PUT") {
        const id = url.split("/")[3];
        const empruntData = await parseRequestBody(req);

        const result = await controllersUpdateEmprunt(id, empruntData);

        if (!result.success) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result.error));
        }

        res.writeHead(201, { "Content-type": "application/json" });
        res.end(JSON.stringify("Données envoyées", result.data));
    } else if (url.match(/^\/api\/emprunts\/([0-9]+)$/) && method === "DELETE") {
        const id = url.split("/")[3];
        const result = await controllersDeleteEmprunt(id);

        res.end(JSON.stringify(result.message));
    }
    // Route non trouvée
    else {
        logger.warn(`Route non trouvée: ${method} ${url}`);
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: "Route non trouvée" }));
    }
};
