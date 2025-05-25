import express from "express";
import {
    createUsuarioController,
    deleteUsuarioController,
    getUsuarioByIdController,
    getUsuarioByUsernameController,
    getUsuariosController,
    getUsuariosPublicosController,
    getUsuariosPrivadosController,
    loginUsuarioController,
    updateUsuarioController
} from "../controllers/usuarioController.js";

const usuarioRouter = express.Router();

usuarioRouter.get("/todos", getUsuariosController);
usuarioRouter.get("/publicos", getUsuariosPublicosController);
usuarioRouter.get("/privados", getUsuariosPrivadosController);
usuarioRouter.get("/id/:id", getUsuarioByIdController);
usuarioRouter.get("/username/:username", getUsuarioByUsernameController);
usuarioRouter.post("/", createUsuarioController);
usuarioRouter.post("/login", loginUsuarioController);
usuarioRouter.patch("/:id", updateUsuarioController);
usuarioRouter.delete("/:id", deleteUsuarioController);


export default usuarioRouter;
