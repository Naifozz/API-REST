import {
    livreGetAll,
    getLivreById,
    controllersCreateLivre,
    controllersUpdateLivre,
    controllersDeleteLivre,
    controllersCategorieLivre,
    controllersLivreAuteur,
    controllersLivrePage,
} from "../controllers/livreController.js";
import {
    getAuteurById,
    getAllAuteurs,
    createAuteur,
    updateAuteur,
    deleteAuteur,
} from "../controllers/auteurController.js";
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

    try {
        // Routes pour les livres
        if (url === "/api/livres" && method === "GET") {
            const livres = await livreGetAll();

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(livres));
        } else if (url === "/api/livres" && method === "POST") {
            const livreData = await parseRequestBody(req);
            const result = await controllersCreateLivre(livreData);

            res.writeHead(201, { "Content-type": "application/json" });
            res.end(JSON.stringify(result));
        } else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === "GET") {
            const id = url.split("/")[3];
            const livre = await getLivreById(id);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(livre));
        } else if (url.match(/^\/api\/livres\?categorie=\d+$/) && method === "GET") {
            const categorie = url.split("=")[1];
            const result = await controllersCategorieLivre(categorie);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(result));
        } else if (url.match(/^\/api\/livres\?auteur=\d+$/) && method === "GET") {
            const auteur = url.split("=")[1];
            const result = await controllersLivreAuteur(auteur);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(result));
        } else if (url.match(/^\/api\/livres\?page=\d+&limit=\d+$/) && method === "GET") {
            const params = url.split("?")[1].split("&");
            const page = params[0].split("=")[1];
            const limit = params[1].split("=")[1];
            const offset = (page - 1) * limit;
            const result = await controllersLivrePage(offset, limit);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(result));
        } else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === "PUT") {
            const id = url.split("/")[3];
            const livreData = await parseRequestBody(req);
            const result = await controllersUpdateLivre(id, livreData);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(result));
        } else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === "DELETE") {
            const id = url.split("/")[3];
            const result = await controllersDeleteLivre(id);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(result));
        }

        // Routes pour les auteurs
        else if (url === "/api/auteurs" && method === "GET") {
            const auteurs = await getAllAuteurs();
            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(auteurs));
        } else if (url === "/api/auteurs" && method === "POST") {
            const auteurData = await parseRequestBody(req);
            const result = await createAuteur(auteurData);

            res.writeHead(201, { "Content-type": "application/json" });
            res.end(JSON.stringify(result));
        } else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === "GET") {
            const id = url.split("/")[3];
            const auteur = await getAuteurById(id);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(auteur));
        } else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === "PUT") {
            const id = url.split("/")[3];
            const auteurData = await parseRequestBody(req);
            const result = await updateAuteur(id, auteurData);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(result));
        } else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === "DELETE") {
            const id = url.split("/")[3];
            const result = await deleteAuteur(id);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(result));
        }

        // Routes pour les emprunts
        else if (url === "/api/emprunts" && method === "GET") {
            const emprunts = await empruntGetAll();
            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(emprunts));
        } else if (url === "/api/emprunts" && method === "POST") {
            const empruntData = await parseRequestBody(req);
            const result = await controllersCreateEmprunt(empruntData);

            res.writeHead(201, { "Content-type": "application/json" });
            res.end(JSON.stringify("Données envoyées", result));
        } else if (url.match(/^\/api\/emprunts\/([0-9]+)$/) && method === "GET") {
            const id = url.split("/")[3];
            const emprunt = await getEmpruntById(id);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(emprunt));
        } else if (url.match(/^\/api\/emprunts\/([0-9]+)$/) && method === "PUT") {
            const id = url.split("/")[3];
            const empruntData = await parseRequestBody(req);
            const result = await controllersUpdateEmprunt(id, empruntData);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify("Données envoyées", result));
        } else if (url.match(/^\/api\/emprunts\/([0-9]+)$/) && method === "DELETE") {
            const id = url.split("/")[3];
            const result = await controllersDeleteEmprunt(id);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(result));
        }

        // Route non trouvée
        else {
            logger.warn(`Route non trouvée: ${method} ${url}`);
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify("Route non trouvée"));
        }
    } catch (error) {
        logger.error(`Erreur lors du traitement de la requête: ${error.message}`);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify("Erreur interne du serveur"));
    }
};
