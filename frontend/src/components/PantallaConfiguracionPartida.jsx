import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./../style/otrasPantallas.css"
import { MapaContext } from '../contextos/MapaContext';

const PantallaConfiguracionPartida = () => {
    const { configuracionPartida, setConfiguracionPartida, usuario } = useContext(MapaContext);
    const navigate = useNavigate()

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

            <div className='flex flex-col text-[#171717bd] justify-center items-center w-fit max-w-[600px] max-h-[650px] bg-gray-100 bg-opacity-30 backdrop-blur-sm px-10 py-12 rounded-lg shadow-lg fadeUp borde-arcoiris'>
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
                            className='p-2 pl-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md'
                        />

                        <label className=''>Categoría:</label>
                        <select
                            name="categoria"
                            value={configuracionPartida.categoria}
                            onChange={handleChange}
                            className='p-2 pl-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md cursor-pointer'
                        >
                            <option value={9}>Libre</option>
                            <option value={1}>Capitales del Mundo</option>
                            <option value={2}>Ciudades Históricas</option>
                            <option
                                value={3}
                                disabled={usuario?.puntuacion_total < 3000}
                                title="Necesitas 3000 puntos"
                            >
                                Maravillas Naturales
                            </option>
                            <option
                                value={4}
                                disabled={usuario?.puntuacion_total < 6000}
                                title="Necesitas 6000 puntos"
                            >
                                Playas y Costas
                            </option>
                            <option
                                value={5}
                                disabled={usuario?.puntuacion_total < 8000}
                                title="Necesitas 8000 puntos"
                            >
                                Patrimonio de la Unesco
                            </option>
                            <option
                                value={6}
                                disabled={usuario?.puntuacion_total < 10000}
                                title="Necesitas 10000 puntos"
                            >
                                Montañas y Cumbres
                            </option>
                            <option
                                value={7}
                                disabled={usuario?.puntuacion_total < 12000}
                                title="Necesitas 12000 puntos"
                            >
                                Islas del Mundo
                            </option>
                            <option
                                value={8}
                                disabled={usuario?.puntuacion_total < 24000}
                                title="Necesitas 24000 puntos"
                            >
                                Parques Nacionales
                            </option>

                        </select>
                        <Link to={'/partida'}><button className='cursor-pointer px-[24px] py-[12px] w-full fondo-arcoiris rounded-full transition-all hover:scale-105 border-none text-[#171717bd] mt-8'>
                            Jugar
                        </button></Link>
                        <Link to={'/inicio'}><button className='cursor-pointer px-[24px] py-[12px] w-full fondo-arcoiris rounded-full transition-all hover:scale-105 border-none text-[#171717bd] mt-8'>
                            Atras
                        </button></Link>
                    </div>
                </div>

            </div>
            <div className="text-center absolute top-7 left-7">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32" className=' hover:scale-125 transition-all duration-300 cursor-pointer' onClick={() => (navigate("/inicio"))}><path fill='#FFBD54' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
            </div>
        </div>
    );
};

export default PantallaConfiguracionPartida;
