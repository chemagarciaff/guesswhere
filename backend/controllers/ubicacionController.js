import {
  createUbicacion,
  deleteUbicacionById,
  getRandomUbicacion,
  getUbicacionById,
  updateUbicacion,
} from "../database/models/ubicacionModel.js";

export async function getRandomUbicacionController(req, res) {
  try {
    const ubicacion = await getRandomUbicacion();
    res.json(ubicacion);
  } catch (err) {
    console.error("Error al obtener la ubicación:", err); // Log the error for debugging
    res.status(500).json({ error: "Error al obtener la ubicación" });
  }
}

export async function getUbicacionByIdController(req, res) {
  try {
    const { id } = req.params;
    const ubicacion = await getUbicacionById(id);
    res.json(ubicacion);
  } catch (err) {
    console.error("Error al obtener la ubicación:", err); // Log the error for debugging
    res.status(500).json({ error: "Error al obtener la ubicación" });
  }
}

// POST - Crear nueva ubicación
export async function createUbicacionController(req, res) {
  try {
      const ubicacion = await createUbicacion(req.body);
      res.status(201).json(ubicacion);
  } catch (err) {
      console.error("Error al crear la ubicación:", err);
      res.status(500).json({ error: "Error al crear la ubicación" });
  }
}

// PATCH - Actualizar ubicación existente
export async function updateUbicacionController(req, res) {
  try {
      const { id } = req.params;

      // (opcional) validar si la ubicación existe antes de actualizar
      const ubicacionExistente = await getUbicacionById?.(id);
      if (getUbicacionById && !ubicacionExistente) {
          return res.status(404).json({ error: "Ubicación no encontrada" });
      }

      const ubicacionActualizada = await updateUbicacion(id, req.body);
      res.json(ubicacionActualizada);
  } catch (err) {
      console.error("Error al actualizar la ubicación:", err);
      res.status(500).json({ error: "Error al actualizar la ubicación" });
  }
}

// DELETE - Eliminar ubicación
export async function deleteUbicacionController(req, res) {
  try {
      const { id } = req.params;
      const resultado = await deleteUbicacionById(id);
      res.json(resultado);
  } catch (err) {
      console.error("Error al eliminar la ubicación:", err);
      res.status(500).json({ error: "Error al eliminar la ubicación" });
  }
}
