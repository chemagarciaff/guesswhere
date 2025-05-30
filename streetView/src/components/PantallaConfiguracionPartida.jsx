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

    const reiniciarDatosPartida = () => {
        setConfiguracionPartida((prev) => ({
            ...prev,
            tiempo: 10,
            categoria: 9,
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
    }

    useEffect(() => {
        reiniciarDatosPartida()
    }, []);

    return (
        <div className='w-full h-screen relative top-0 left-0 fondo-mapa flex justify-center items-center'>

            <p className='absolute top-[35px] text-5xl letras-arcoiris w-fit left-1/2 -translate-x-1/2 '>Configura tu partida</p>

            <div className='flex flex-col justify-center items-center w-fit max-w-[600px] max-h-[650px] bg-gray-100 bg-opacity-30 backdrop-blur-sm px-10 py-12 rounded-lg shadow-lg fadeUp borde-arcoiris'>
                <div className=''>
                    <p className='text-2xl mb-12'>Selecciona las opciones <br></br>de juego</p>
                    <div className='grid grid-cols-2 gap-4 w-full max-w-md'>

                        <label>Tiempo (s):</label>
                        <input
                            type="number"
                            name="tiempo"
                            max={180}
                            min={1}
                            value={configuracionPartida.tiempo}
                            onChange={handleChange}
                            className='p-2 pl-4'
                        />

                        <label>Categoría:</label>
                        <select
                            name="categoria"
                            value={configuracionPartida.categoria}
                            onChange={handleChange}
                            className='p-2 pl-4'
                        >
                            <option value={1}>Capitales del Mundo</option>
                            <option value={2}>Ciudades Historicas</option>
                            <option value={3}>Maravillas Naturales</option>
                            <option value={4}>Playas y Costas</option>
                            <option value={5}>Patrimonio de la Unesco</option>
                            <option value={6}>Montañas y Cumbres</option>
                            <option value={7}>Islas del Mundo</option>
                            <option value={8}>Parques Nacionales</option>
                            <option value={9}>Libre</option>
                            {/* Agrega más opciones si las tienes */}
                        </select>
                <button className='boton'>
                    <Link to={'/partida'}>Jugar</Link>
                </button>
                <button className='boton'>
                    <Link to={'/inicio'}>Atras</Link>
                </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PantallaConfiguracionPartida;
