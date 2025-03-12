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

export const routes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    try {
        // Routes pour les livres
        if (url === "/api/livres" && method === "GET") {
            await livreGetAll(req, res);
        } else if (url === "/api/livres" && method === "POST") {
            await controllersCreateLivre(req);
        } else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === "GET") {
            const id = url.split("/")[3];

            await getLivreById(req, res, id);
        } else if (url.match(/^\/api\/livres\?categorie=\d+$/) && method === "GET") {
            const categorie = url.split("=")[1];

            await controllersCategorieLivre(res, categorie);
        } else if (url.match(/^\/api\/livres\?auteur=\d+$/) && method === "GET") {
            const auteur = url.split("=")[1];

            await controllersLivreAuteur(res, auteur);
        } else if (url.match(/^\/api\/livres\?page=\d+&limit=\d+$/) && method === "GET") {
            const params = url.split("?")[1].split("&");
            const page = params[0].split("=")[1];
            const limit = params[1].split("=")[1];
            const offset = (page - 1) * limit;

            await controllersLivrePage(res, offset, limit);
        } else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === "PUT") {
            const id = url.split("/")[3];

            await controllersUpdateLivre(req, res, id);
        } else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === "DELETE") {
            const id = url.split("/")[3];

            await controllersDeleteLivre(res, id);
        }

        // Routes pour les auteurs
        else if (url === "/api/auteurs" && method === "GET") {
            await getAllAuteurs(res);
        } else if (url === "/api/auteurs" && method === "POST") {
            await createAuteur(req, res);
        } else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === "GET") {
            const id = url.split("/")[3];

            await getAuteurById(res, id);
        } else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === "PUT") {
            const id = url.split("/")[3];
            await updateAuteur(req, res, id);
        } else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === "DELETE") {
            const id = url.split("/")[3];
            await deleteAuteur(res, id);
        }

        // Routes pour les emprunts
        else if (url === "/api/emprunts" && method === "GET") {
            await empruntGetAll(res);
        } else if (url === "/api/emprunts" && method === "POST") {
            await controllersCreateEmprunt(req, res);
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
        res.end(JSON.stringify(error.message));
    }
};
