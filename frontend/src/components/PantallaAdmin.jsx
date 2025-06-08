import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapaContext } from '../contextos/MapaContext';
import FormUbicacion from './FormUbicacion';

const PantallaAdmin = () => {
    const { usuario } = useContext(MapaContext);
    const navigate = useNavigate();
    const [mostrar, setMostrar] = useState({
        gestionarJugadores: true,
        anadirUbicaciones: false,
    });
    const [jugadores, setJugadores] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [orden, setOrden] = useState({ campo: null, asc: true });


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/guesswhere/usuario/todos');
            if (!response.ok) throw new Error("Error al obtener usuarios");
            const data = await response.json();
            setJugadores(data);
        } catch (error) {
            console.error("Error al obtener jugadores:", error);
        }
    };


    const patchUsuario = async (id, body) => {
        try {
            const response = await fetch(`http://localhost:3000/guesswhere/usuario/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!response.ok) throw new Error("Error al actualizar usuario");
            await fetchData();
        } catch (error) {
            console.error("PATCH error:", error);
        }
    };

    const deleteUsuario = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/guesswhere/usuario/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Error al eliminar usuario");
            await fetchData();
        } catch (error) {
            console.error("DELETE error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const jugadoresFiltrados = jugadores.filter(j =>
        j.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );


    const jugadoresOrdenados = [...jugadoresFiltrados].sort((a, b) => {
        if (!orden.campo) return 0;

        const valA = a[orden.campo];
        const valB = b[orden.campo];

        // Normalizar para comparar (nombres, username)
        const normalize = val =>
            typeof val === "string" ? val.toLowerCase() : val ?? "";

        const aNorm = normalize(valA);
        const bNorm = normalize(valB);

        if (aNorm < bNorm) return orden.asc ? -1 : 1;
        if (aNorm > bNorm) return orden.asc ? 1 : -1;
        return 0;
    });
    return (
        <div className="w-full min-h-screen fondo-mapa flex flex-col items-center pt-[110px] gap-8">
            <p className="text-5xl letras-arcoiris absolute top-7 left-1/2 -translate-x-1/2">Administrador</p>

            <div className="w-full px-4 md:px-8 gap-10 flex flex-col items-center pb-4">
                {/* Pestañas */}
                <div className="flex gap-4 md:gap-8 justify-center">
                    <div className={`cursor-pointer px-6 py-3 fondo-arcoiris rounded-full transition-all ${mostrar.gestionarJugadores ? 'scale-110' : ''}`}
                        onClick={() => setMostrar({ gestionarJugadores: true, anadirUbicaciones: false })}>
                        Gestionar jugadores
                    </div>
                    <div className={`cursor-pointer px-6 py-3 fondo-arcoiris rounded-full transition-all ${mostrar.anadirUbicaciones ? 'scale-110' : ''}`}
                        onClick={() => setMostrar({ gestionarJugadores: false, anadirUbicaciones: true })}>
                        Añadir ubicaciones
                    </div>
                </div>

                {/* Contenido */}
                <div className="w-full bg-gray-100 bg-opacity-30 backdrop-blur-sm p-6 rounded-lg shadow-lg fadeUp borde-arcoiris">
                    {mostrar.gestionarJugadores && (
                        <>
                            <h2 className="text-2xl font-semibold pb-6">Lista de jugadores</h2>

                            {/* Buscador */}
                            <input
                                type="text"
                                placeholder="Buscar por nombre..."
                                className="w-full mb-4 p-2 border rounded"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />

                            {/* Tabla responsive */}
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto min-w-[500px]">
                                    <thead>
                                        <tr className="bg-[#3b3b3b] text-left text-white">
                                            <th
                                                className="p-2 py-4 cursor-pointer select-none"
                                                onClick={() =>
                                                    setOrden(prev => ({
                                                        campo: "nombre",
                                                        asc: prev.campo === "nombre" ? !prev.asc : true,
                                                    }))
                                                }
                                            >
                                                Nombre {orden.campo === "nombre" && (orden.asc ? "↑" : "↓")}
                                            </th>
                                            <th
                                                className="p-2 cursor-pointer select-none hidden lg:table-cell"
                                                onClick={() =>
                                                    setOrden(prev => ({
                                                        campo: "username",
                                                        asc: prev.campo === "username" ? !prev.asc : true,
                                                    }))
                                                }
                                            >
                                                Username {orden.campo === "username" && (orden.asc ? "↑" : "↓")}
                                            </th>
                                            <th className="p-2  hidden xl:table-cell">Email</th>
                                            <th
                                                className="p-2 cursor-pointer select-none"
                                                onClick={() =>
                                                    setOrden(prev => ({
                                                        campo: "verificado",
                                                        asc: prev.campo === "verificado" ? !prev.asc : true,
                                                    }))
                                                }
                                            >
                                                Verificado {orden.campo === "verificado" && (orden.asc ? "↑" : "↓")}
                                            </th>

                                            <th
                                                className="p-2 cursor-pointer select-none"
                                                onClick={() =>
                                                    setOrden(prev => ({
                                                        campo: "rol",
                                                        asc: prev.campo === "rol" ? !prev.asc : true,
                                                    }))
                                                }
                                            >
                                                Rol {orden.campo === "rol" && (orden.asc ? "↑" : "↓")}
                                            </th>
                                            <th className="p-2">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jugadoresOrdenados.map(jugador => (
                                            <tr key={jugador._id} className="border-t">
                                                <td className="p-2">{jugador.nombre}</td>
                                                <td className="p-2 hidden lg:table-cell">{jugador.username}</td>
                                                <td className="p-2 hidden xl:table-cell">{jugador.email}</td>
                                                <td className="p-2">{jugador.verificado ? "Sí" : "No"}</td>
                                                <td className="p-2">{jugador.rol === 1 ? "Admin" : "Jugador"}</td>
                                                <td className="p-2 flex flex-wrap gap-2">
                                                    <button
                                                        className="px-2 py-1 bg-[#FF466F] text-white rounded hover:bg-red-600"
                                                        onClick={() => {
                                                            if (window.confirm("¿Eliminar este jugador?")) {
                                                                deleteUsuario(jugador.id_jugador);
                                                            }
                                                        }}
                                                    >
                                                        Eliminar
                                                    </button>

                                                    {!jugador.verificado && (
                                                        <button
                                                            className="px-2 py-1 bg-[#FFBD54] text-white rounded hover:bg-yellow-600"
                                                            onClick={() => patchUsuario(jugador.id_jugador, { verificado: true })}
                                                        >
                                                            Verificar
                                                        </button>
                                                    )}

                                                    {jugador.rol !== 1 && (
                                                        <button
                                                            className="px-2 py-1 bg-[#7D81F4] text-white rounded hover:bg-blue-600"
                                                            onClick={() => patchUsuario(jugador.id_jugador, { rol: 1 })}
                                                        >
                                                            Hacer Admin
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {mostrar.anadirUbicaciones && (
                        <div className="h-full overflow-auto p-2">
                            {/* Aquí iría la lógica de añadir ubicaciones */}
                            <FormUbicacion />
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center absolute top-7 left-7">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32"
                    className='hover:scale-125 transition-all duration-300 cursor-pointer'
                    onClick={() => navigate("/inicio")}>
                    <path fill='#FFBD54' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
            </div>
        </div>
    );
};

export default PantallaAdmin;
