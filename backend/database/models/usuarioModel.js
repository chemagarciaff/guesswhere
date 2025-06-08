import { db } from '../db.js';

export async function getUsuarios() {
    const [rows] = await db.execute("SELECT * FROM jugador");
    return rows;
}
export async function getUsuariosPublicos() {
    const [rows] = await db.execute("SELECT * FROM jugador ORDER BY puntuacion_total DESC");
    return rows;
}

export async function getUsuarioById(id) {
    const [rows] = await db.execute("SELECT * FROM jugador WHERE id_jugador = ?", [id]);
    return rows[0];
}

export async function getUsuarioSinVerificar() {
    const [rows] = await db.execute("SELECT * FROM jugador WHERE verificado = false");
    return rows;
}

export async function getUsuariosJugadorers() {
    const [rows] = await db.execute("SELECT * FROM jugador WHERE rol = 0");
    return rows;
}


export async function getUsuarioByUsername(username) {
    const [rows] = await db.execute("SELECT * FROM jugador WHERE username = ?", [username]);
    return rows[0];
}

export async function getUsuarioByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM jugador WHERE email = ?", [email]);
    return rows[0];
}

export async function getAvatarById(id) {
    const [rows] = await db.execute("SELECT avatar FROM jugador WHERE id_jugador = ?", [id]);
    return rows[0];
}

// Crear nuevo usuario
export async function createUsuario(usuarioData) {
    const { nombre, apellido1, apellido2, email, password, username, avatar, codigo } = usuarioData; // ajusta los campos según tu tabla
    const [result] = await db.execute(
        "INSERT INTO jugador (nombre, apellido1, apellido2, email, password, username, avatar, codigo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [nombre, apellido1, apellido2, email, password, username, avatar, codigo]
    );
    return { id: result.insertId, ...usuarioData };
}

export async function updateUsuario(id, puntuacionActual, usuarioData) {
    const camposPermitidos = ['nombre', 'apellido1', 'apellido2', 'password', 'email', 'username', 'puntuacion_total', 'rol', 'avatar', 'verificado'];
    const campos = [];
    const valores = [];

    for (const key of camposPermitidos) {
        if (usuarioData[key] !== undefined) {
            if (key === 'puntuacion_total') {
                // Sumar la nueva puntuación a la actual
                campos.push(`${key} = ?`);
                valores.push(puntuacionActual + usuarioData[key]);
            } else {
                campos.push(`${key} = ?`);
                valores.push(usuarioData[key]);
            }
        }
    }

    if (campos.length === 0) {
        throw new Error("No se proporcionaron campos válidos para actualizar.");
    }

    valores.push(id); // Para el WHERE

    const sql = `UPDATE jugador SET ${campos.join(', ')} WHERE id_jugador = ?`;

    await db.execute(sql, valores);

    // Devolver la puntuación total actualizada también
    return { id_jugador: id, ...usuarioData, puntuacion_total: puntuacionActual + (usuarioData.puntuacion_total || 0) };
}



export async function deleteUsuarioById(id) {
    const object = await db.execute("delete FROM jugador WHERE id_jugador = ?", [id]);
    return object
}
