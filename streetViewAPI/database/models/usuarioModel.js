import { db } from '../db.js';

export async function getUsuarios() {
    const [rows] = await db.execute("SELECT * FROM jugador");
    return rows;
}

export async function getUsuarioById(id) {
    const [rows] = await db.execute("SELECT * FROM jugador WHERE id_jugador = ?", [id]);
    return rows[0];
}


export async function getUsuarioByUsername(username) {
    const [rows] = await db.execute("SELECT * FROM jugador WHERE username = ?", [username]);
    return rows[0];
}

// Crear nuevo usuario
export async function createUsuario(usuarioData) {
    const { nombre, apellido1, apellido2, email, password, username } = usuarioData; // ajusta los campos según tu tabla
    const [result] = await db.execute(
        "INSERT INTO jugador (nombre, apellido1, apellido2, email, password, username) VALUES (?, ?, ?, ?, ?, ?)",
        [nombre, apellido1, apellido2, email, password, username]
    );
    return { id: result.insertId, ...usuarioData };
}

// Actualizar usuario
export async function updateUsuario(id, usuarioData) {
    // Filtrar solo campos permitidos para actualizar
    const camposPermitidos = ['nombre', 'apellido1', 'apellido2', 'email', 'username', 'puntuacion_media', 'rol'];
    const campos = [];
    const valores = [];

    for (const key of camposPermitidos) {
        if (usuarioData[key] !== undefined) {
            campos.push(`${key} = ?`);
            valores.push(usuarioData[key]);
        }
    }

    if (campos.length === 0) {
        throw new Error("No se proporcionaron campos válidos para actualizar.");
    }

    valores.push(id); // Para el WHERE

    const sql = `UPDATE jugador SET ${campos.join(', ')} WHERE id_jugador = ?`;

    await db.execute(sql, valores);

    return { id_jugador: id, ...usuarioData };
}


export async function deleteUsuarioById(id) {
    const object = await db.execute("delete FROM jugador WHERE id_jugador = ?", [id]);
    return object
}
