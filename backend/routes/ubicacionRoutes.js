import express from "express";
import {
    createUbicacionController,
    deleteUbicacionController,
    getRandomUbicacionController,
    getUbicacionByIdController,
    updateUbicacionController
} from "../controllers/ubicacionController.js";

const ubicacionRouter = express.Router();

ubicacionRouter.get("/random", getRandomUbicacionController);
ubicacionRouter.get("/id/:id", getUbicacionByIdController);
ubicacionRouter.post("/", createUbicacionController);
ubicacionRouter.patch("/:id", updateUbicacionController);
ubicacionRouter.delete("/:id", deleteUbicacionController);

export default ubicacionRouter;
