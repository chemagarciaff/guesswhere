import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./../style/otrasPantallas.css"
import { MapaContext } from '../contextos/MapaContext';

const PantallaConfiguracionPartida = () => {
    const { configuracionPartida, setConfiguracionPartida } = useContext(MapaContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfiguracionPartida({
            ...configuracionPartida,
            [name]: name === "tiempo" ? parseInt(value) : value
        });
    };

    useEffect(() => {
        setConfiguracionPartida((prev) => ({
            ...prev,
            tiempo: 10,
            categoria: 'libre',
            puntos: 0,
            coordenadasSeleccionada: {
                lat: 0,
                lon: 0,
            },
            coordenadasObjetivo: {
                lat: 39.922753548606686,
                lon: 32.86049640434456
            },
            distancia: 0
        }));
    }, []);

        return (
            <div className='contenedor'>
                <div className="otros__contenedor">
                    <label>Tiempo (segundos):</label>
                    <input
                        type="number"
                        name="tiempo"
                        max={180}
                        min={1}
                        value={configuracionPartida.tiempo}
                        onChange={handleChange}
                    />

                    <label>Categoría:</label>
                    <select
                        name="categoria"
                        value={configuracionPartida.categoria}
                        onChange={handleChange}
                    >
                        <option value="libre">Libre</option>
                        <option value="1">Capitales del Mundo</option>
                        <option value="2">Ciudades Historicas</option>
                        <option value="3">Maravillas Naturales</option>
                        <option value="4">Playas y Costas</option>
                        <option value="5">Patrimonio de la Unesco</option>
                        <option value="6">Montañas y Cumbres</option>
                        <option value="7">Islas del Mundo</option>
                        <option value="8">Parques Nacionales</option>
                        {/* Agrega más opciones si las tienes */}
                    </select>

                    <button className='boton'>
                        <Link to={'/partida'}>Jugar</Link>
                    </button>
                    <button className='boton'>
                        <Link to={'/inicio'}>Atras</Link>
                    </button>
                </div>
                <div className="background background__amigos">
                    Configura tu partida
                </div>
            </div>
        );
    };

    export default PantallaConfiguracionPartida;
