import { db } from '../db.js';

export async function getRandomUbicacion() {
  const [rows] = await db.execute("SELECT latitud, longitud, id_ubicacion FROM ubicacion ORDER BY RAND() LIMIT 1");
  return rows[0];
}

export async function getUbicacionById(id) {
  const [rows] = await db.execute("SELECT * FROM ubicacion WHERE id_ubicacion = ?", [id]);
  return rows[0];
}


// Crear nueva ubicación
export async function createUbicacion(ubicacionData) {
    const { pais, continente, latitud, longitud, observaciones } = ubicacionData;

    const [result] = await db.execute(
        `INSERT INTO ubicacion (pais, continente, latitud, longitud, observaciones)
         VALUES (?, ?, ?, ?, ?)`,
        [pais, continente, latitud, longitud, observaciones]
    );

    return { id_ubicacion: result.insertId, ...ubicacionData };
}

// Actualizar ubicación existente
export async function updateUbicacion(id, ubicacionData) {
    const camposPermitidos = ['pais', 'continente', 'latitud', 'longitud', 'observaciones'];
    const campos = [];
    const valores = [];

    for (const campo of camposPermitidos) {
        if (ubicacionData[campo] !== undefined) {
            campos.push(`${campo} = ?`);
            valores.push(ubicacionData[campo]);
        }
    }

    if (campos.length === 0) {
        throw new Error("No se proporcionaron campos válidos para actualizar.");
    }

    valores.push(id);

    const sql = `UPDATE ubicacion SET ${campos.join(', ')} WHERE id_ubicacion = ?`;

    await db.execute(sql, valores);

    return { id_ubicacion: id, ...ubicacionData };
}

// Eliminar ubicación por ID
export async function deleteUbicacionById(id) {
    await db.execute(`DELETE FROM ubicacion WHERE id_ubicacion = ?`, [id]);
    return { message: "Ubicación eliminada", id_ubicacion: id };
}
