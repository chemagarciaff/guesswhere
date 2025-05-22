import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapaContext } from '../contextos/MapaContext';
import './../style/pantallaResultado.css';

const DetallesResultado = () => {
    const { configuracionPartida, setConfiguracionPartida } = useContext(MapaContext);

    const calcularPuntos = () => {
        const maxPuntos = 5000;
        const dFactor = 2000;
        return Math.round(maxPuntos * Math.exp(-configuracionPartida.distancia / dFactor));
    };

    useEffect(() => {
        const puntos = calcularPuntos();

        setConfiguracionPartida(prev => ({
            ...prev,
            puntos
        }));
    }, [configuracionPartida.distancia]);

    return (
        <div className='detallesResultado'>
            <Link to={"/inicio"}>
                <button>Volver al inicio</button>
            </Link>

            <p>{configuracionPartida.distancia} Km</p>
            <p>{configuracionPartida.puntos} puntos</p>
        </div>
    );
};

export default DetallesResultado;
