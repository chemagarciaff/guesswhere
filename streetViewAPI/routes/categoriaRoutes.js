import express from "express";
import {
    createCategoriaController,
    deleteCategoriaController,
    getCategoriaByIdController,
    getCategoriaByNombreController,
    getCategoriasController,
    updateCategoriaController
} from "../controllers/categoriaController.js";

const categoriaRouter = express.Router();

categoriaRouter.get("/todas", getCategoriasController);
categoriaRouter.get("/id/:id", getCategoriaByIdController);
categoriaRouter.get("/nombre/:nombre", getCategoriaByNombreController);
categoriaRouter.post("/", createCategoriaController);
categoriaRouter.patch("/:id", updateCategoriaController);
categoriaRouter.delete("/:id", deleteCategoriaController);

export default categoriaRouter;