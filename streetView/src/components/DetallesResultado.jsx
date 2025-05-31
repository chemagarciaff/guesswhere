import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapaContext } from '../contextos/MapaContext';
import './../style/pantallaResultado.css';
import { useState } from 'react';

const DetallesResultado = () => {
    const navigate = useNavigate();
    const { configuracionPartida, setConfiguracionPartida, usuario, setUsuario } = useContext(MapaContext);
    const [ubicacionesFavoritas, setUbicacionesFavoritas] = useState([]);
    const [ubicacionFavorita, setUbicacionFavorita] = useState(false);

    const getUbicacionesFavoritas = async () => {
        const response = await fetch(`http://localhost:3000/guesswhere/favorito/id/${usuario.id_jugador}`);
        if (!response.ok) {
            console.error("Error fetching partidas jugadas:", response.statusText);
            return;
        }
        const data = await response.json()
        console.log(data)
        setUbicacionesFavoritas(data)
    }

    const handlePostFav = async () => {
        try {
            const response = await fetch('http://localhost:3000/guesswhere/favorito', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_jugador: usuario.id_jugador,
                    id_ubicacion: configuracionPartida.idUbicacion
                })
            });
            if (!response.ok) {
                console.error("Error fetching partidas jugadas:", response.statusText);
                return;
            }
            const data = await response.json();
            console.log("Ubicación añadida a favoritos:", data);
            setUbicacionFavorita(true);
        } catch (error) {
            console.error("Error al añadir ubicación a favoritos:", error);
            alert("No se pudo añadir la ubicación a favoritos");
        }
    };
    const handleDeleteFav = async () => {
        try {
            const response = await fetch(`http://localhost:3000/guesswhere/favorito/${usuario.id_jugador}/${configuracionPartida.idUbicacion}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                console.error("Error al eliminar favorito:", response.statusText);
                return;
            }
            const data = await response.json();
            console.log("Ubicación eliminada de favoritos:", data);
            setUbicacionFavorita(false);
        } catch (error) {
            console.error("Error al eliminar favorito:", error);
            alert("No se pudo eliminar la ubicación de favoritos");
        }
    };

    useEffect(() => {
        if (!configuracionPartida.idUbicacion || ubicacionesFavoritas.length === 0) return;

        const esFavorito = ubicacionesFavoritas.some(
            ubicacion => ubicacion.id_ubicacion === configuracionPartida.idUbicacion
        );
        setUbicacionFavorita(esFavorito);
    }, [ubicacionesFavoritas, configuracionPartida.idUbicacion]);

    useEffect(() => {
        getUbicacionesFavoritas()
    }, [])

    const calcularPuntos = () => {
        const maxPuntos = 5000;
        const dFactor = 2000;
        return Math.round(maxPuntos * Math.exp(-configuracionPartida.distancia / dFactor));
    };

    useEffect(() => {
        const puntos = calcularPuntos();
        setConfiguracionPartida(prev => ({
            ...prev,
            puntos: puntos
        }));
    }, [configuracionPartida.distancia]);

    const handleVolverInicio = async () => {
        try {
            // 1. Registrar la partida
            const responsePartida = await fetch('http://localhost:3000/guesswhere/partida', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_ubicacion: configuracionPartida.idUbicacion,
                    ubicacion_marcada: `${configuracionPartida.coordenadasSeleccionada.lat}, ${configuracionPartida.coordenadasSeleccionada.lon}`,
                    id_jugador: usuario.id_jugador,
                    id_categoria: configuracionPartida.categoria,
                    tiempo: configuracionPartida.tiempo,
                    desplazamiento: configuracionPartida.distancia,
                    puntuacion: configuracionPartida.puntos
                })
            });

            const dataPartida = await responsePartida.json();

            if (!responsePartida.ok) {
                console.error(dataPartida);
                alert("Error al registrar la partida");
                return;
            }

            console.log("Partida registrada:", dataPartida);

            // 2. Actualizar puntuación total del usuario
            const responseUsuario = await fetch(`http://localhost:3000/guesswhere/usuario/${usuario.id_jugador}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ puntuacion_total: configuracionPartida.puntos })
            });

            const dataUsuario = await responseUsuario.json();

            if (!responseUsuario.ok) {
                console.error(dataUsuario);
                alert("Error al actualizar la puntuación del usuario");
                return;
            }

            console.log("Usuario actualizado:", dataUsuario);

            const nuevoUsuario = {
                ...usuario,
                puntuacion_total: dataUsuario.puntuacion_total // o configuracionPartida.puntos si la API no devuelve el nuevo valor
            };

            sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

            setUsuario(nuevoUsuario);

            // 3. Redirigir
            navigate("/inicio");

        } catch (err) {
            console.error("Error de red:", err);
            alert("No se pudo completar la acción");
        }
    };


    return (
        <div className='fondo-arcoiris flex flex-col justify-center'>
            <div className='flex flex-col gap-2 items-start'>
                <h2 className='text-lg border-b mx-2 w-full text-center'>Detalles del resultado</h2>

                <p className='px-3 mt-4'>Distancia: {configuracionPartida.distancia} Km</p>
                <p className='px-3 '>Puntos: {configuracionPartida.puntos}</p>
                <p className='px-3 '>Categoria: {configuracionPartida.categoria}</p>
                <p className='px-3 '>Tiempo seleccionado: {configuracionPartida.tiempo} s</p>
            </div>
            {!ubicacionFavorita && (<div className='mt-8 transition-all border hover:text-lg mx-4 cursor-pointer' onClick={handlePostFav}>Añadir a favoritos</div>)}
            {ubicacionFavorita && (<div className='mt-8 transition-all border hover:text-lg mx-4 cursor-pointer' onClick={handleDeleteFav}>Añadida a favoritos</div>)}
            <div className='mt-8 transition-all border hover:text-lg mx-4 cursor-pointer' onClick={handleVolverInicio}>Volver al inicio</div>
        </div>
    );
};

export default DetallesResultado;
