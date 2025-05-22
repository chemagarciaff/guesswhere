// perteneceModel.js
import { db } from '../db.js';

// Obtener todas las relaciones
export async function getTodasRelaciones() {
    const [rows] = await db.execute("SELECT * FROM pertenece");
    return rows;
}

// Obtener todas las categorías de una ubicación
export async function getCategoriasPorUbicacion(id_ubicacion) {
    const [rows] = await db.execute(
        "SELECT id_categoria FROM pertenece WHERE id_ubicacion = ?",
        [id_ubicacion]
    );
    return rows;
}

// Obtener todas las ubicaciones que pertenecen a una categoría
export async function getUbicacionesPorCategoria(id_categoria) {
    const [rows] = await db.execute(
        "SELECT id_ubicacion FROM pertenece WHERE id_categoria = ?",
        [id_categoria]
    );
    return rows;
}

export async function getUbicacionAleatoriaPorCategoria(id_categoria) {
    const [rows] = await db.execute(
        `SELECT u.latitud, u.longitud
         FROM pertenece p
         JOIN ubicacion u ON p.id_ubicacion = u.id_ubicacion
         WHERE p.id_categoria = ?
         ORDER BY RAND()
         LIMIT 1`,
        [id_categoria]
    );

    return rows[0]; // Devuelve { latitud, longitud }
}


// Crear una nueva relación
export async function createRelacion(id_ubicacion, id_categoria) {
    const [result] = await db.execute(
        "INSERT INTO pertenece (id_ubicacion, id_categoria) VALUES (?, ?)",
        [id_ubicacion, id_categoria]
    );
    return { id_ubicacion, id_categoria };
}

// Eliminar una relación específica
export async function deleteRelacion(id_ubicacion, id_categoria) {
    const [result] = await db.execute(
        "DELETE FROM pertenece WHERE id_ubicacion = ? AND id_categoria = ?",
        [id_ubicacion, id_categoria]
    );
    return result;
}

// delete todas las relaciones por ubicación
export async function deleteRelacionesPorUbicacion(id_ubicacion) {
    const [result] = await db.execute(
        "DELETE FROM pertenece WHERE id_ubicacion = ?",
        [id_ubicacion]
    );
    return result;
}

// delete todas las relaciones por categoría
export async function deleteRelacionesPorCategoria(id_categoria) {
    const [result] = await db.execute(
        "DELETE FROM pertenece WHERE id_categoria = ?",
        [id_categoria]
    );
    return result;
}
