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
        `SELECT j.* 
         FROM amigo a
         JOIN jugador j ON ( (a.id_jugador1 = ? AND j.id_jugador = a.id_jugador2) OR (a.id_jugador2 = ? AND j.id_jugador = a.id_jugador1) )
         WHERE (a.id_jugador1 = ? OR a.id_jugador2 = ?) AND a.confirmacion = true`,
        [id_jugador, id_jugador, id_jugador, id_jugador]
    );
    return rows;
}

export async function getPeticionesById(id_jugador) {
    const [rows] = await db.execute(
        `SELECT j.*
         FROM amigo a
         JOIN jugador j ON a.id_jugador1 = j.id_jugador
         WHERE a.id_jugador2 = ? AND a.confirmacion = false`,
        [id_jugador]
    );
    return rows;
}

export async function getJugadoresNoAmigos(id_jugador) {
    const [rows] = await db.execute(
        `
        SELECT *
        FROM jugador
        WHERE id_jugador != ?
          AND id_jugador NOT IN (
              SELECT CASE
                       WHEN id_jugador1 = ? THEN id_jugador2
                       WHEN id_jugador2 = ? THEN id_jugador1
                     END
              FROM amigo
              WHERE (id_jugador1 = ? OR id_jugador2 = ?)
          )
        `,
        [id_jugador, id_jugador, id_jugador, id_jugador, id_jugador]
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

