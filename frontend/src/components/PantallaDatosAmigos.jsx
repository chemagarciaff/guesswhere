import { useParams, useNavigate, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MapaContext } from '../contextos/MapaContext';

const PantallaDatosAmigos = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuarioConsultar, setUsuarioConsultar] = useState(null);
    const { usuario, avatares, ajustes, setAjustes } = useContext(MapaContext)

    const [favoritos, setFavoritos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const [usuarioRes, favoritosRes] = await Promise.all([
                    fetch(`http://localhost:3000/guesswhere/usuario/id/${id}`),
                    fetch(`http://localhost:3000/guesswhere/favorito/id/${id}`)
                ]);

                const usuarioData = await usuarioRes.json();
                const favoritosData = await favoritosRes.json();

                setUsuarioConsultar(usuarioData);
                setFavoritos(favoritosData);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            } finally {
                setCargando(false);
            }
        };

        obtenerDatos();
    }, [id]);

    useEffect(() => {
        console.log(favoritos)
    }, [favoritos])

    if (cargando) return <p className="p-4">Cargando datos...</p>;
    if (!usuarioConsultar) return <p className="p-4 text-red-600">Error cargando los datos del usuario.</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-6">
            <button
                onClick={() => navigate('/amigos')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                ← Volver a Amigos
            </button>

            <div className="flex flex-col items-center gap-4">
                <img
                    src={avatares[usuarioConsultar?.id_jugador] || 'https://via.placeholder.com/150'}
                    alt={usuarioConsultar?.username}
                    className="w-[200px] rounded-full border-4 border-indigo-300"
                />
                <h2 className="text-2xl font-bold">{usuarioConsultar?.username}</h2>
                <p className="text-gray-700">
                    Puntuación Total:{' '}
                    <span className="font-semibold">{usuarioConsultar?.puntuacion_total}</span>
                </p>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-2 border-b pb-1">Ubicaciones Favoritas</h3>
                {favoritos.length > 0 ? (
                    <ul className="space-y-2">
                        {favoritos.map((ubicacion, index) => (
                            <li key={index} className="bg-gray-100 p-3 rounded-lg shadow">
                                <p className="text-black font-medium">{ubicacion.pais}</p>
                                <p className="text-black font-medium">{ubicacion.continente}</p>
                                <Link
                                    to="/verFavorito"
                                    state={{
                                        latitud: ubicacion.latitud,
                                        longitud: ubicacion.longitud
                                    }}
                                >
                                    <div className="underline text-black hover:text-gray-400">Ver ubicación</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No tiene ubicaciones favoritas registradas.</p>
                )}
            </div>
        </div>
    );
};

export default PantallaDatosAmigos;
