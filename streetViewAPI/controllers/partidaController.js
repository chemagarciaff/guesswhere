import {
    getTodasPartidas,
    getPartidaById,
    getPartidasByIdJugador,
    createPartida,
    deletePartidaById
} from "../database/models/partidaModel.js";

export async function getTodasPartidasController(req, res) {
    try {
        const partidas = await getTodasPartidas();
        res.json(partidas);
    } catch (err) {
        console.error("Error al obtener las partidas:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener las partidas" });
    }
}

export async function getPartidaByIdController(req, res) {
    try {
        const { id } = req.params;
        const partida = await getPartidaById(id);
        if (!partida) {
            return res.status(404).json({ error: "Partida no encontrada" });
        }
        res.json(partida);
    } catch (err) {
        console.error("Error al obtener la partida:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener la partida" });
    }
}

export async function getPartidasByIdJugadorController(req, res) {
    try {
        const { id_jugador } = req.params;
        const partidas = await getPartidasByIdJugador(id_jugador);
        res.json(partidas);
    } catch (err) {
        console.error("Error al obtener las partidas del jugador:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener las partidas del jugador" });
    }
}

export async function createPartidaController(req, res) {
    try {
        const partidaData = req.body;
        const nuevaPartida = await createPartida(partidaData);
        res.status(201).json(nuevaPartida);
    } catch (err) {
        console.error("Error al crear la partida:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al crear la partida" });
    }
}

export async function deletePartidaByIdController(req, res) {
    try {
        const { id } = req.params;
        const result = await deletePartidaById(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Partida no encontrada" });
        }
        res.status(204).send();
    } catch (err) {
        console.error("Error al eliminar la partida:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al eliminar la partida" });
    }
}
