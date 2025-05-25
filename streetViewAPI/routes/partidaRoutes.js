import express from "express";
import {
    getTodasPartidasController,
    getPartidaByIdController,
    getPartidasByIdJugadorController,
    createPartidaController,
    deletePartidaByIdController
} from "../controllers/partidaController.js";


const partidaRouter = express.Router();
partidaRouter.get('/todas', getTodasPartidasController);
partidaRouter.get('/:id', getPartidaByIdController);
partidaRouter.get('/:id/jugador', getPartidasByIdJugadorController);
partidaRouter.post('/', createPartidaController);
partidaRouter.delete('/:id', deletePartidaByIdController);

export default partidaRouter;