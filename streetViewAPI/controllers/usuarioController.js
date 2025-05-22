import argon2 from 'argon2';


import {
    createUsuario,
    deleteUsuarioById,
    getUsuarioById,
    getUsuarioByUsername,
    getUsuarios,
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

// POST - crear nuevo usuario
export async function createUsuarioController(req, res) {
    try {
        const { password } = req.body;
        const passwordHashed = await argon2.hash(password);
        const usuario = await createUsuario({
            ...req.body,
            password: passwordHashed
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
        console.log(passwordValida)
        if (!passwordValida) {
            return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }

        // Opcional: generar token o sesión
        res.json({ message: "Login exitoso", usuario: { id: usuario.id_jugador, username: usuario.username } });
    } catch (err) {
        console.error("Error en el login:", err); // Log the error for debugging
        res.status(500).json({ error: "Error en el login" });
    }
}

// PATCH - actualizar usuario
export async function updateUsuarioController(req, res) {
    try {
        const { id } = req.params;
        const usuarioExistente = await getUsuarioById(id);
        if (!usuarioExistente) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        const usuarioActualizado = await updateUsuario(id, req.body);
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
