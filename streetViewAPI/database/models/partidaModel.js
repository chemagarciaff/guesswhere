// partidaModel.js
import { db } from '../db.js';

// Get all game records
export async function getTodasPartidas() {
    const [rows] = await db.execute("SELECT * FROM partida");
    return rows;
}

// Get game by ID
export async function getPartidaById(id) {
    const [rows] = await db.execute("SELECT * FROM partida WHERE id_partida = ?", [id]);
    return rows[0];
}

// Get Partidas by player ID
export async function getPartidasByIdJugador(playerId) {
    const [rows] = await db.execute("SELECT * FROM partida WHERE id_jugador = ?", [playerId]);
    return rows;
}

// Create a new Partida
export async function createPartida(partidaData) {
    const {
        id_ubicacion,
        ubicacion_marcada,
        id_jugador,
        id_categoria,
        tiempo,
        desplazamiento,
        puntuacion,
    } = partidaData;

    const [result] = await db.execute(
        `INSERT INTO partida 
        (id_ubicacion, ubicacion_marcada, id_jugador, id_categoria, tiempo, desplazamiento, puntuacion) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id_ubicacion, ubicacion_marcada, id_jugador, id_categoria, tiempo, desplazamiento, puntuacion]
    );

    return { id_partida: result.insertId, ...partidaData };
}

// Delete Partida by ID
export async function deletePartidaById(id) {
    const [result] = await db.execute("DELETE FROM partida WHERE id_partida = ?", [id]);
    return result;
}
