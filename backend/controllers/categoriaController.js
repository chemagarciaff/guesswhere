import {
    createCategoria,
    deleteCategoriaById,
    getCategoriaById,
    getCategoriaByNombre,
    getCategorias,
    updateCategoria,
} from "../database/models/categoriaModel.js";

export async function getCategoriasController(req, res) {
  try {
    const categorias = await getCategorias();
    res.json(categorias);
  } catch (err) {
    console.error("Error al obtener la ubicación:", err); // Log the error for debugging
    res.status(500).json({ error: "Error al obtener la ubicación" });
  }
}

export async function getCategoriaByIdController(req, res) {
  try {
    const { id } = req.params;
    const categoria = await getCategoriaById(id);
    res.json(categoria);
  } catch (err) {
    console.error("Error al obtener la ubicación:", err); // Log the error for debugging
    res.status(500).json({ error: "Error al obtener la ubicación" });
  }
}

export async function getCategoriaByNombreController(req, res) {
  try {
    const { nombre } = req.params;
    const categoria = await getCategoriaByNombre(nombre);
    res.json(categoria);
  } catch (err) {
    console.error("Error al obtener la ubicación:", err); // Log the error for debugging
    res.status(500).json({ error: "Error al obtener la ubicación" });
  }
}

// POST - Crear nueva ubicación
export async function createCategoriaController(req, res) {
  try {
      const categoria = await createCategoria(req.body);
      res.status(201).json(categoria);
  } catch (err) {
      console.error("Error al crear la ubicación:", err);
      res.status(500).json({ error: "Error al crear la ubicación" });
  }
}

// PATCH - Actualizar ubicación existente
export async function updateCategoriaController(req, res) {
  try {
      const { id } = req.params;

      // (opcional) validar si la ubicación existe antes de actualizar
      const categoriaExistente = await getCategoriaById?.(id);
      if (getCategoriaById && !categoriaExistente) {
          return res.status(404).json({ error: "Ubicación no encontrada" });
      }

      const categoriaActualizada = await updateCategoria(id, req.body);
      res.json(categoriaActualizada);
  } catch (err) {
      console.error("Error al actualizar la ubicación:", err);
      res.status(500).json({ error: "Error al actualizar la ubicación" });
  }
}

// DELETE - Eliminar ubicación
export async function deleteCategoriaController(req, res) {
  try {
      const { id } = req.params;
      const resultado = await deleteCategoriaById(id);
      res.json(resultado);
  } catch (err) {
      console.error("Error al eliminar la ubicación:", err);
      res.status(500).json({ error: "Error al eliminar la ubicación" });
  }
}
