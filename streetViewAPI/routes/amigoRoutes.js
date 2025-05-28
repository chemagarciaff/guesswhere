import express from "express";
import {
    getAmigosByIdController, 
    getAmigosConfirmadosByIdController,
    getAmigosController,
    getPeticionesByIdController,
    listarJugadoresNoAmigos,
    createAmigoController,
    updateAmigoController,
    deleteAmigoController
} from "../controllers/amigoController.js";

const amigoRouter = express.Router();
amigoRouter.get("/todos", getAmigosController);
amigoRouter.get("/id/:id_jugador", getAmigosByIdController);
amigoRouter.get("/confirmados/:id_jugador", getAmigosConfirmadosByIdController);
amigoRouter.get("/peticiones/:id_jugador", getPeticionesByIdController);
amigoRouter.get('/jugadores-disponibles/:id', listarJugadoresNoAmigos);
amigoRouter.post("/", createAmigoController);
amigoRouter.patch("/:id_jugador1/:id_jugador2", updateAmigoController);
amigoRouter.delete("/:id_jugador1/:id_jugador2", deleteAmigoController);

export default amigoRouter;