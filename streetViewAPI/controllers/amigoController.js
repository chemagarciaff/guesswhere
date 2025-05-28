import {
    getAmigos,
    getAmigosById,
    getAmigosConfirmadosById,
    getJugadoresNoAmigos,
    getPeticionesById,
    createAmigo,
    updateAmigo,
    deleteAmigo
} from "../database/models/amigoModel.js";

export async function getAmigosController(req, res) {
    try {
        const amigos = await getAmigos();
        res.json(amigos);
    } catch (err) {
        console.error("Error al obtener los amigos:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener los amigos" });
    }
}

export async function getAmigosByIdController(req, res) {
    try {
        const { id_jugador } = req.params;
        const amigos = await getAmigosById(id_jugador);
        res.json(amigos);
    } catch (err) {
        console.error("Error al obtener los amigos:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener los amigos" });
    }
}

export async function getAmigosConfirmadosByIdController(req, res) {
    try {
        const { id_jugador } = req.params;
        const amigos = await getAmigosConfirmadosById(id_jugador);
        res.json(amigos);
    } catch (err) {
        console.error("Error al obtener los amigos confirmados:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener los amigos confirmados" });
    }
}

export async function getPeticionesByIdController(req, res) {
    try {
        const { id_jugador } = req.params;
        const peticiones = await getPeticionesById(id_jugador);
        res.json(peticiones);
    } catch (err) {
        console.error("Error al obtener las peticiones de amistad:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener las peticiones de amistad" });
    }
}


export async function listarJugadoresNoAmigos(req, res) {
    const id_jugador = parseInt(req.params.id);

    try {
        const jugadores = await getJugadoresNoAmigos(id_jugador);
        res.json(jugadores);
    } catch (error) {
        console.error('Error al obtener jugadores no amigos:', error);
        res.status(500).json({ error: 'Error al obtener los jugadores no amigos' });
    }
}


// POST - Crear nuevo amigo
export async function createAmigoController(req, res) {
    try {
        const amigo = await createAmigo(req.body);
        res.status(201).json(amigo);
    } catch (err) {
        console.error("Error al crear el amigo:", err);
        res.status(500).json({ error: "Error al crear el amigo" });
    }
}

// PATCH - Actualizar amigo existente
export async function updateAmigoController(req, res) {
    try {
        const { id_jugador1, id_jugador2 } = req.params;
        const amigo = await updateAmigo(id_jugador1, id_jugador2);
        res.json(amigo);
    } catch (err) {
        console.error("Error al actualizar el amigo:", err);
        res.status(500).json({ error: "Error al actualizar el amigo" });
    }
}

// DELETE - Eliminar amigo
export async function deleteAmigoController(req, res) {
    try {
        const { id_jugador1, id_jugador2 } = req.params;
        const amigo = await deleteAmigo(id_jugador1, id_jugador2);
        res.json(amigo);
    } catch (err) {
        console.error("Error al eliminar el amigo:", err);
        res.status(500).json({ error: "Error al eliminar el amigo" });
    }
}