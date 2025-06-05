import express from "express";
import {
    createFavoritoController,
    deleteFavoritoController,
    getFavoritosByIdJugadorController,
    getFavoritosController,
} from "../controllers/favoritoController.js";


const favoritoRouter = express.Router();

favoritoRouter.get("/todos", getFavoritosController);
favoritoRouter.get("/id/:id_jugador", getFavoritosByIdJugadorController);
favoritoRouter.post("/", createFavoritoController);
favoritoRouter.delete("/:id_jugador/:id_ubicacion", deleteFavoritoController);

export default favoritoRouter;