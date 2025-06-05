import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapaContext } from '../contextos/MapaContext';

const Verification = () => {
    const { usuario } = useContext(MapaContext);
    const navigate = useNavigate();
    const [codigo, setcodigo] = useState(0);
    const [error, setError] = useState("");


  
    const handleChange = (e) => {
        setcodigo(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(e.target.codigo.value);
        console.log(usuario.codigo);

        setError("");

        if(e.target.codigo.value === "") {
            setError("El código no puede estar vacío");
            return;
        }else if(e.target.codigo.value.length < 6) {
            setError("El código debe tener al menos 6 cifras");
            return;
        }else if(e.target.codigo.value.length > 6) {
            setError("El código no puede tener más de 6 cifras");
            return;
        }else if(parseInt(e.target.codigo.value) === usuario.codigo) {
            setError(false);

            const response = await fetch(`http://localhost:3000/guesswhere/usuario/${usuario.id_jugador}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ verificado: true })
                });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Error al verificar el usuario");
                return;
            }else {
                navigate("/inicio");
            }
        }else {
            setError("El código es incorrecto");
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center fondo-mapa relative">
            <div className='flex flex-col justify-center items-center w-[600px] h-[500px] bg-gray-100 bg-opacity-20 backdrop-blur-sm p-4 rounded-lg shadow-lg borde-arcoiris fadeUp'>
                <h1 className='text-5xl mb-20 w-full text-center letras-arcoiris'>GuessWhere</h1>
                <div className=''>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 w-full max-w-md">

                        <label htmlFor="codigo" className="text-[#171717bd] font-semibold  flex items-center">Código de verificación</label>
                        <input
                            type="text"
                            id="codigo"
                            name="codigo"
                            value={codigo}
                            onChange={handleChange}
                            className="text-[#171717bd] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white bg-opacity-80"
                        />

                        <div className='col-span-2 flex items-center justify-center mt-10 gap-4'>

                            <button
                                type="submit"
                                className="text-[#171717bd] cursor-pointer px-[24px] py-[12px] fondo-arcoiris rounded-full transition-all border-none"
                            >
                                Comprobar
                            </button>
                            <div
                                className='cursor-pointer px-[24px] py-[12px] fondo-arcoiris rounded-full transition-all border-none hover:scale-105'>
                                <Link
                                    to="/"
                                >
                                    <p className='w-full h-full text-[#171717bd]'>volver</p>

                                </Link>
                            </div>
                        </div>
                        {error && <p className="text-red-600 col-span-2 text-center mt-2">{error}</p>}

                    </form>

                </div>
            </div>
        </div>
    );

};

export default Verification;
