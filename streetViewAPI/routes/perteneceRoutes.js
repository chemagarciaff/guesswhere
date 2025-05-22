import express from "express";
import {
    getTodasRelacionesController,
    getCategoriasPorUbicacionController,
    getUbicacionesPorCategoriaController,
    getUbicacionAleatoriaPorCategoriaController,
    createRelacionController,
    deleteRelacionController,
    deleteRelacionesPorUbicacionController,
    deleteRelacionesPorCategoriaController
} from "../controllers/perteneceController.js";

const perteneceRouter = express.Router();
perteneceRouter.get("/todas", getTodasRelacionesController);
perteneceRouter.get("/ubicaciones/:id", getCategoriasPorUbicacionController);
perteneceRouter.get("/categoria/:id", getUbicacionAleatoriaPorCategoriaController);
perteneceRouter.get("/categorias/:id", getUbicacionesPorCategoriaController);
perteneceRouter.post("/", createRelacionController);
perteneceRouter.delete("/:id", deleteRelacionController);
perteneceRouter.delete("/ubicacion/:id", deleteRelacionesPorUbicacionController);
perteneceRouter.delete("/categoria/:id", deleteRelacionesPorCategoriaController)
;

export default perteneceRouter;