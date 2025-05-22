import { db } from '../db.js';

export async function getAmigos() {
    const [rows] = await db.execute("SELECT * FROM amigo");
    return rows;
}

export async function getAmigosById(id_jugador) {
    const [rows] = await db.execute(
        "SELECT * FROM amigo WHERE id_jugador1 = ? OR id_jugador2 = ?",
        [id_jugador, id_jugador]
    );
    return rows;
}

export async function getAmigosConfirmadosById(id_jugador) {
    const [rows] = await db.execute(
        "SELECT * FROM amigo WHERE (id_jugador1 = ? OR id_jugador2 = ?) AND confirmacion = true",
        [id_jugador, id_jugador]
    );
    return rows;
}


// Crear nuevo Amigo
export async function createAmigo(amigoData) {
    const { id_jugador1, id_jugador2 } = amigoData; // ajusta los campos según tu tabla
    const [result] = await db.execute(
        "INSERT INTO amigo (id_jugador1, id_jugador2) VALUES (?, ?)",
        [id_jugador1, id_jugador2]
    );
    return { ...amigoData };
}

// Actualizar Amigo
export async function updateAmigo(id_jugador1, id_jugador2) {
    const sql = "UPDATE amigo SET confirmacion = true WHERE (id_jugador1 = ? AND id_jugador2 = ?) OR (id_jugador1 = ? AND id_jugador2 = ?)";
    const [result] = await db.execute(sql, [id_jugador1, id_jugador2, id_jugador2, id_jugador1]);
    if (result.affectedRows === 0) {
        throw new Error("No se encontró la amistad con los IDs proporcionados");
    }
    return { message: "Amistad confirmada correctamente" };
}


export async function deleteAmigo(id_jugador1, id_jugador2) {
    const sql = "DELETE FROM amigo WHERE (id_jugador1 = ? AND id_jugador2 = ?) OR (id_jugador1 = ? AND id_jugador2 = ?)";
    const [result] = await db.execute(sql, [id_jugador1, id_jugador2, id_jugador2, id_jugador1]);
    if (result.affectedRows === 0) {
        throw new Error("No se encontró la amistad con los IDs proporcionados");
    }
    return { message: "Amistad eliminada correctamente" };
}

