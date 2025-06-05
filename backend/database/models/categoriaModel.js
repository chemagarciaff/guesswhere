import { db } from '../db.js';

export async function getCategorias() {
    const [rows] = await db.execute("SELECT * FROM categoria");
    return rows;
}

export async function getCategoriaById(id) {
    const [rows] = await db.execute("SELECT * FROM categoria WHERE id_categoria = ?", [id]);
    return rows[0];
}


export async function getCategoriaByNombre(nombre) {
    const [rows] = await db.execute("SELECT * FROM categoria WHERE nombre = ?", [nombre]);
    return rows[0];
}

// Crear nuevo Categoria
export async function createCategoria(categoriaData) {
    const { nombre } = categoriaData; // ajusta los campos según tu tabla
    const [result] = await db.execute(
        "INSERT INTO categoria (nombre) VALUES (?)",
        [nombre]
    );
    return { id_categoria: result.insertId, ...categoriaData };
}

// Actualizar Categoria
export async function updateCategoria(id, categoriaData) {
   
    const { nombre } = categoriaData; // ajusta los campos según tu tabla

    const sql = "UPDATE categoria SET nombre = ? WHERE id_categoria = ?";
    const valores = [nombre, id];
    const [result] = await db.execute(sql, valores);
    if (result.affectedRows === 0) {
        throw new Error("No se encontró la categoria con el id proporcionado");
    }
    return { id_categoria: id, ...categoriaData };
}


export async function deleteCategoriaById(id) {
    const [result] = await db.execute("delete FROM categoria WHERE id_categoria = ?", [id]);
    if (result.affectedRows === 0) {
        throw new Error("No se encontró la categoria con el id proporcionado");
    }
    return { message: "Categoria eliminada correctamente" };
}
