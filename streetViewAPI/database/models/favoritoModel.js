import { db } from '../db.js';

export async function getFavoritos() {
    const [rows] = await db.execute("SELECT * FROM favorito");
    return rows;
}

export async function getFavoritosByIdJugador(id_jugador) {
  const [rows] = await db.execute(
    `SELECT u.* 
     FROM favorito f
     JOIN ubicacion u ON f.id_ubicacion = u.id_ubicacion
     WHERE f.id_jugador = ?`,
    [id_jugador]
  );
  return rows;
}

export async function createFavorito(favoritoData) {
    const { id_jugador, id_ubicacion } = favoritoData;
    await db.execute(
        "INSERT INTO favorito (id_jugador, id_ubicacion) VALUES (?, ?)",
        [id_jugador, id_ubicacion]
    );
    return { id_jugador, id_ubicacion };
}

export async function deleteFavorito(id_jugador, id_ubicacion) {
    const [result] = await db.execute(
        "DELETE FROM favorito WHERE id_jugador = ? AND id_ubicacion = ?",
        [id_jugador, id_ubicacion]
    );
    if (result.affectedRows === 0) {
        throw new Error("No se encontró el favorito con los IDs proporcionados");
    }
    return { message: "Favorito eliminado correctamente" };
}
