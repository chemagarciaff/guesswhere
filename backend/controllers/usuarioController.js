import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import sendVerificationEmail from './nodemailer.js'; // Asegúrate de que esta función esté implementada correctamente
// const jwt = require('jsonwebtoken');


import {
    createUsuario,
    deleteUsuarioById,
    getUsuarioById,
    getUsuarioByUsername,
    getUsuariosJugadorers,
    getUsuarioSinVerificar,
    getUsuarioByEmail,
    getUsuarios,
    getUsuariosPublicos,
    getAvatarById,
    updateUsuario
} from "../database/models/usuarioModel.js";



export async function getUsuariosController(req, res) {
    try {
        const usuarios = await getUsuarios();
        res.json(usuarios);
    } catch (err) {
        console.error("Error al obtener los usuarios:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
}

export async function getUsuariosPublicosController(req, res) {
    try {
        const usuarios = await getUsuariosPublicos();
        res.json(usuarios);
    } catch (err) {
        console.error("Error al obtener los usuarios públicos:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener los usuarios públicos" });
    }
}

export async function getUsuariosSinVerificarController(req, res) {
    try {
        const usuarios = await getUsuarioSinVerificar();
        res.json(usuarios);
    } catch (err) {
        console.error("Error al obtener los usuarios públicos:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener los usuarios públicos" });
    }
}

export async function getUsuariosJugadorersController(req, res) {
    try {
        const usuarios = await getUsuariosJugadorers();
        res.json(usuarios);
    } catch (err) {
        console.error("Error al obtener los usuarios públicos:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener los usuarios públicos" });
    }
}

export async function getUsuarioByIdController(req, res) {
    try {
        const { id } = req.params;
        const usuario = await getUsuarioById(id); // Asegúrate de que el nombre de la función coincida
        res.json(usuario);
    } catch (err) {
        console.error("Error al obtener el usuario:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
}

export async function getUsuarioByUsernameController(req, res) {
    try {
        const { username } = req.params;
        const usuario = await getUsuarioByUsername(username); // Asegúrate de que el nombre de la función coincida
        res.json(usuario);
    } catch (err) {
        console.error("Error al obtener el usuario:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
}

export async function getUsuarioByEmailController(req, res) {
    try {
        const { email } = req.params;
        const usuario = await getUsuarioByEmail(email); // Asegúrate de que el nombre de la función coincida
        res.json(usuario);
    } catch (err) {
        console.error("Error al obtener el usuario:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
}

export async function getAvatarByIdController(req, res) {
    try {
        const { id } = req.params;
        const avatar = await getAvatarById(id); // Esta función debe devolver un buffer o null

        if (!avatar) {
            return res.status(404).json({ error: "Avatar no encontrado" });
        }

        res.setHeader('Content-Type', 'image/jpeg'); // O el tipo que corresponda
        res.send(avatar); // Aquí envías el buffer directamente al cliente

    } catch (err) {
        console.error("Error al obtener el avatar:", err);
        res.status(500).json({ error: "Error al obtener el avatar" });
    }
}

// POST - crear nuevo usuario
export async function createUsuarioController(req, res) {
    try {
        const { nombre, apellido1, apellido2, email, username, password } = req.body;
        const avatar = req.file ? req.file.buffer : null;
        const passwordHashed = await argon2.hash(password);
        const verificationCode = Math.floor(100000 + Math.random() * 900000)
        try {
            await sendVerificationEmail(email, verificationCode);
        } catch (err) {
            console.error("Error al enviar el correo de verificación:", err); // Log the error for debugging
            return res.status(500).json({ error: "Error al enviar el correo de verificación" });
        }
        const usuario = await createUsuario({
            nombre,
            apellido1,
            apellido2: apellido2 || '', // Asegúrate de que apellido2 sea opcional
            email,
            username,
            avatar, // Asegúrate de que req.file esté definido
            password: passwordHashed,
            codigo: verificationCode || 654321,
        });
        res.status(201).json(usuario);
    } catch (err) {
        console.error("Error al crear el usuario:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al crear el usuario" });
    }
}

export async function loginUsuarioController(req, res) {
    try {
        const { username, password } = req.body;

        const usuario = await getUsuarioByUsername(username);
        if (!usuario) {
            return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }

        const passwordValida = await argon2.verify(usuario.password, password);
        // console.log(passwordValida)
        if (!passwordValida) {
            return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }

        const token = jwt.sign(
            { id: usuario._id, username: usuario.username },
            process.env.JWT_SECRET || 'tu_secreto_super_secreto',
            { expiresIn: '5h' } // opcional
        );

        return res.json({ usuario, token })

    } catch (err) {
        console.error("Error en el login:", err); // Log the error for debugging
        res.status(500).json({ error: "Error en el login" });
    }
}

// PATCH - actualizar usuario
export async function updateUsuarioController(req, res) {
    try {
        console.log(req.body)
        // const { nombre, apellido1, apellido2, email, username } = req.body;
        const { id } = req.params;
        const usuarioExistente = await getUsuarioById(id);
        if (!usuarioExistente) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        const usuarioActualizado = await updateUsuario(id, usuarioExistente.puntuacion_total, req.body);
        res.json(usuarioActualizado);
    } catch (err) {
        console.error("Error al editar el usuario:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
}

export async function deleteUsuarioController(req, res) {
    try {
        const { id } = req.params;
        const result = await deleteUsuarioById(id);
        res.json({ message: "Usuario eliminado", result });
    } catch (err) {
        console.error("Error al eliminar el usuario:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
}
