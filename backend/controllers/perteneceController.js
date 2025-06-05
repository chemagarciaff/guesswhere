import {
    getTodasRelaciones,
    getCategoriasPorUbicacion,
    getUbicacionesPorCategoria,
    getUbicacionAleatoriaPorCategoria,
    createRelacion,
    deleteRelacion,
    deleteRelacionesPorUbicacion,
    deleteRelacionesPorCategoria,
} from "../database/models/perteneceModel.js";

export async function getTodasRelacionesController(req, res) {
    try {
        const relaciones = await getTodasRelaciones();
        res.json(relaciones);
    } catch (err) {
        console.error("Error al obtener las relaciones:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener las relaciones" });
    }
}

export async function getCategoriasPorUbicacionController(req, res) {
    try {
        const { id } = req.params;
        const categorias = await getCategoriasPorUbicacion(id);
        res.json(categorias);
    } catch (err) {
        console.error("Error al obtener las categorías:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener las categorías" });
    }
}

export async function getUbicacionesPorCategoriaController(req, res) {
    try {
        const { id } = req.params;
        const ubicaciones = await getUbicacionesPorCategoria(id);
        res.json(ubicaciones);
    } catch (err) {
        console.error("Error al obtener las ubicaciones:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener las ubicaciones" });
    }
}

export async function getUbicacionAleatoriaPorCategoriaController(req, res) {
    try {
        const { id } = req.params;
        const ubicacion = await getUbicacionAleatoriaPorCategoria(id);
        res.json(ubicacion);
    } catch (err) {
        console.error("Error al obtener las ubicaciones:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener las ubicaciones" });
    }
}

// POST - Crear nueva relación
export async function createRelacionController(req, res) {
    try {
        const { id_ubicacion, id_categoria } = req.body;
        const relacion = await createRelacion(id_ubicacion, id_categoria);
        res.status(201).json(relacion);
    } catch (err) {
        console.error("Error al crear la relación:", err);
        res.status(500).json({ error: "Error al crear la relación" });
    }
}

// DELETE - Eliminar una relación específica
export async function deleteRelacionController(req, res) {
    try {
        const { id_ubicacion, id_categoria } = req.params;
        await deleteRelacion(id_ubicacion, id_categoria);
        res.status(204).send();
    } catch (err) {
        console.error("Error al eliminar la relación:", err);
        res.status(500).json({ error: "Error al eliminar la relación" });
    }
}

// DELETE - Eliminar todas las relaciones por ubicación
export async function deleteRelacionesPorUbicacionController(req, res) {
    try {
        const { id_ubicacion } = req.params;
        await deleteRelacionesPorUbicacion(id_ubicacion);
        res.status(204).send();
    } catch (err) {
        console.error("Error al eliminar las relaciones por ubicación:", err);
        res.status(500).json({ error: "Error al eliminar las relaciones por ubicación" });
    }
}

// DELETE - Eliminar todas las relaciones por categoría
export async function deleteRelacionesPorCategoriaController(req, res) {
    try {
        const { id_categoria } = req.params;
        await deleteRelacionesPorCategoria(id_categoria);
        res.status(204).send();
    } catch (err) {
        console.error("Error al eliminar las relaciones por categoría:", err);
        res.status(500).json({ error: "Error al eliminar las relaciones por categoría" });
    }
}
