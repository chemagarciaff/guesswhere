import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapaContext } from '../contextos/MapaContext';
import './../style/pantallaResultado.css';

const DetallesResultado = () => {
    const navigate = useNavigate();
    const { configuracionPartida, setConfiguracionPartida, usuario, setUsuario } = useContext(MapaContext);

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
        console.log(configuracionPartida)
        console.log(usuario)
        try {
            // 1. Registrar la partida
            const responsePartida = await fetch('http://localhost:3000/guesswhere/partida', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_ubicacion: configuracionPartida.idUbicacion,
                    ubicacion_marcada: `${configuracionPartida.coordenadasSeleccionada.lat}, ${configuracionPartida.coordenadasSeleccionada.lon}`,
                    id_jugador: usuario.id,
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
            const responseUsuario = await fetch(`http://localhost:3000/guesswhere/usuario/${usuario.id}`, {
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
        <div className='detallesResultado'>
            <button onClick={handleVolverInicio}>Volver al inicio</button>

            <p>{configuracionPartida.distancia} Km</p>
            <p>{configuracionPartida.puntos} puntos</p>
        </div>
    );
};

export default DetallesResultado;
