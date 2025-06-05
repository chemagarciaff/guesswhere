

import {
    createFavorito,
    deleteFavorito,
    getFavoritos,
    getFavoritosByIdJugador
} from "../database/models/favoritoModel.js";


export async function getFavoritosController(req, res) {
    try {
        const favoritos = await getFavoritos();
        res.json(favoritos);
    } catch (err) {
        console.error("Error al obtener los Favoritos:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener los Favoritos" });
    }
}


export async function getFavoritosByIdJugadorController(req, res) {
    try {
        const { id_jugador } = req.params;
        const favoritos = await getFavoritosByIdJugador(id_jugador); // Asegúrate de que el nombre de la función coincida
        res.json(favoritos);
    } catch (err) {
        console.error("Error al obtener el favorito:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al obtener el favorito" });
    }
}


// POST - crear nuevo favorito
export async function createFavoritoController(req, res) {
    try {
        const { id_jugador, id_ubicacion } = req.body;
        const favorito = await createFavorito({
            id_jugador: id_jugador,
            id_ubicacion: id_ubicacion
        });
        res.status(201).json(favorito);
    } catch (err) {
        console.error("Error al crear el favorito:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al crear el favorito" });
    }
}

export async function deleteFavoritoController(req, res) {
    try {
        const { id_jugador, id_ubicacion } = req.params;
        const result = await deleteFavorito(id_jugador, id_ubicacion);
        res.json({ message: "favorito eliminado", result });
    } catch (err) {
        console.error("Error al eliminar el favorito:", err); // Log the error for debugging
        res.status(500).json({ error: "Error al eliminar el favorito" });
    }
}
