import express from "express";
import cors from 'cors';
import multer from 'multer';

import {
    createUsuarioController,
    deleteUsuarioController,
    getUsuarioByIdController,
    getUsuarioByUsernameController,
    getUsuariosSinVerificarController,
    getUsuariosJugadorersController,
    getUsuarioByEmailController,
    getUsuariosController,
    getUsuariosPublicosController,
    getAvatarByIdController,
    loginUsuarioController,
    updateUsuarioController
} from "../controllers/usuarioController.js";



const usuarioRouter = express.Router();
const upload = multer();

usuarioRouter.get("/todos", getUsuariosController);
usuarioRouter.get("/publicos", getUsuariosPublicosController);
usuarioRouter.get("/id/:id", getUsuarioByIdController);
usuarioRouter.get("/username/:username", getUsuarioByUsernameController);
usuarioRouter.get("/sinVerificar", getUsuariosSinVerificarController);
usuarioRouter.get("/jugadores", getUsuariosJugadorersController);
usuarioRouter.get("/avatar/:id", getAvatarByIdController);
usuarioRouter.get("/email/:email", getUsuarioByEmailController);
usuarioRouter.post("/", upload.single('avatar'), createUsuarioController);
usuarioRouter.post("/login", loginUsuarioController);
usuarioRouter.patch("/:id", upload.none(), updateUsuarioController);
usuarioRouter.delete("/:id", deleteUsuarioController);


export default usuarioRouter;
