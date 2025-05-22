import express from "express";
import {
    createUsuarioController,
    deleteUsuarioController,
    getUsuarioByIdController,
    getUsuarioByUsernameController,
    getUsuariosController,
    loginUsuarioController,
    updateUsuarioController
} from "../controllers/usuarioController.js";

const usuarioRouter = express.Router();

usuarioRouter.get("/todos", getUsuariosController);
usuarioRouter.get("/id/:id", getUsuarioByIdController);
usuarioRouter.get("/username/:username", getUsuarioByUsernameController);
usuarioRouter.post("/", createUsuarioController);
usuarioRouter.post("/login", loginUsuarioController);
usuarioRouter.patch("/:id", updateUsuarioController);
usuarioRouter.delete("/:id", deleteUsuarioController);


export default usuarioRouter;
