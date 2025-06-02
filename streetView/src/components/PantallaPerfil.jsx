import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapaContext } from '../contextos/MapaContext';

const PantallaPerfil = () => {
  const { usuario, setUsuario, avatares } = useContext(MapaContext);
  const [avatar, setAvatar] = useState(null);
  const [partidasJugadas, setPartidasJugadas] = useState([]);
  const [ubicacionesFavoritas, setUbicacionesFavoritas] = useState([]);
  const [mostrar, setMostrar] = useState({
    datosPersonales: true,
    ubicacionesFavoritas: false,
    partidasJugadas: false,
  })
  const fileInputRef = useRef(null);

  const getPartidasJugadas = async () => {
    const response = await fetch(`http://localhost:3000/guesswhere/partida/jugador/${usuario.id_jugador}`);
    if (!response.ok) {
      console.error("Error fetching partidas jugadas:", response.statusText);
      return;
    }
    const data = await response.json()
    console.log(data)
    setPartidasJugadas(data)
  }

  const getUbicacionesFaavoritas = async () => {
    const response = await fetch(`http://localhost:3000/guesswhere/favorito/id/${usuario.id_jugador}`);
    if (!response.ok) {
      console.error("Error fetching partidas jugadas:", response.statusText);
      return;
    }
    const data = await response.json()
    console.log(data)
    setUbicacionesFavoritas(data)
  }

  useEffect(() => {
    getPartidasJugadas()
    getUbicacionesFaavoritas()
  }, [])

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const fetchAvatar = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/guesswhere/usuario/avatar/${id}`);
      if (!response.ok) throw new Error('Error al cargar avatar');

      // La respuesta es JSON, no imagen binaria directa
      const json = await response.json();

      // Extraemos el array de bytes (asegúrate que la estructura coincida)
      const byteArray = new Uint8Array(json.avatar.data);

      // Creamos el Blob
      const blob = new Blob([byteArray], { type: 'image/png' });

      // Generamos la URL para el blob
      const url = URL.createObjectURL(blob);

      return url
    } catch (error) {
      console.error('Error al cargar avatar:', error);
    }
  };


  let navigate = useNavigate()
  const handleRight = () => {
    navigate('/ajustes')
  }
  const handleLeft = () => {
    navigate('/amigos')
  }

  return (
    <div className=" w-full min-h-screen relative top-0 left-0 fondo-mapa flex flex-col items-center justify-start pt-[110px] gap-8">

      <p className="text-5xl letras-arcoiris w-fit absolute top-7 left-1/2 -translate-x-1/2">Perfil</p>

      <div className="lg:h-[80vh] px-12 gap-10 flex flex-col min-h-0 overflow-hidden w-full pb-4">

        {/* Opciones arriba */}
        <div className='flex gap-8 justify-center'>
          <div className={`text-[#171717bd] cursor-pointer px-[24px] py-[12px] fondo-arcoiris rounded-full transition-all ${mostrar.datosPersonales ? 'scale-110' : ''}`} onClick={() => setMostrar({ datosPersonales: true, ubicacionesFavoritas: false, partidasJugadas: false })}>
            Mis datos personales
          </div>
          <div className={`text-[#171717bd] cursor-pointer px-[24px] py-[12px] fondo-arcoiris rounded-full transition-all ${mostrar.ubicacionesFavoritas ? 'scale-110' : ''}`} onClick={() => setMostrar({ datosPersonales: false, ubicacionesFavoritas: true, partidasJugadas: false })}>
            Ubicaciones favoritas
          </div>
          <div className={`text-[#171717bd] cursor-pointer px-[24px] py-[12px] fondo-arcoiris rounded-full transition-all ${mostrar.partidasJugadas ? 'scale-110' : ''}`} onClick={() => setMostrar({ datosPersonales: false, ubicacionesFavoritas: false, partidasJugadas: true })}>
            Partidas jugadas
          </div>
        </div>

        {/* Contenido dinámico */}
        <div className="flex-1 overflow-hidden bg-gray-100 bg-opacity-30 backdrop-blur-sm p-6 rounded-lg shadow-lg fadeUp borde-arcoiris max-h-[630px]">

          {mostrar.datosPersonales && (
            <div className="h-full overflow-auto p-4">
              <form className="flex flex-wrap items-center gap-12 justify-center">
                {/* Avatar */}
                <div className="w-[300px] h-[300px] border rounded-md overflow-hidden shadow-md flex items-center justify-center">
                  <img
                    src={avatares[usuario.id_jugador] || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                    alt="avatar"
                    className="object-cover w-full h-full cursor-pointer"
                    onClick={handleAvatarClick}
                  />
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    className="hidden text-white"
                  />
                </div>

                {/* Formulario en dos columnas */}
                <div className="min-w-[500px] rounded-md p-4 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4 text-lg">
                    <label className="text-sm font-semibold flex flex-col">
                      Nombre
                      <input
                        readOnly
                        type="text"
                        value={usuario.nombre}
                        className="p-2 text-white"
                      />
                    </label>
                    <label className="text-sm font-semibold flex flex-col">
                      Primer Apellido
                      <input
                        type="text"
                        value={usuario.apellido1}
                        className="p-2 text-white"
                      />
                    </label>
                    <label className="text-sm font-semibold flex flex-col">
                      Segundo Apellido
                      <input
                        type="text"
                        value={usuario.apellido2}
                        className="p-2 text-white"
                      />
                    </label>
                    <label className="text-sm font-semibold flex flex-col">
                      Username
                      <input
                        type="text"
                        value={usuario.username}
                        className="p-2 text-white"
                      />
                    </label>
                    <label className="text-sm font-semibold flex flex-col col-span-2">
                      Email
                      <input
                        type="email"
                        value={usuario.email}
                        className="p-2 text-white"
                      />
                    </label>
                    <label className="text-sm font-semibold flex flex-col col-span-2">
                      Password
                      <input
                        type="password"
                        value={"holabebe"}
                        className="p-2 text-white"
                      />
                    </label>
                  </div>


                  {/* Botón */}
                  <button
                    type="submit"
                    className="mt-4 cursor-pointer border-none px-[24px] py-[12px] fondo-arcoiris rounded-full transition-all"
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>

          )}

          {mostrar.ubicacionesFavoritas && (
            <div className="h-full overflow-auto p-2 scroll-invisible">
              <table className='w-full text-sm'>
                <thead className='border-b'>
                  <tr className='text-lg text-[#171717bd]'>
                    <th className='text-lg pb-3'>País</th>
                    <th className='text-lg pb-3'>Contienente</th>
                    <th className='text-lg pb-3'>Coordenadas (latitud, longitud)</th>
                    <th className='text-lg pb-3'>Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {ubicacionesFavoritas.map((ubicacion, index) => {
                    return (
                      <tr key={index} className="border-b text-lg lg:text-lg">
                        <td className=' py-2'>{ubicacion.pais}</td>
                        <td className=' py-2'>{ubicacion.continente}</td>
                        <td className=' py-2'>{ubicacion.latitud} / {ubicacion.longitud}</td>
                        <td className=' py-2'>
                          <Link
                            to="/verFavorito"
                            state={{
                              latitud: ubicacion.latitud,
                              longitud: ubicacion.longitud
                            }}
                          >
                            <div className="underline hover:text-gray-400">Ver ubicación</div>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}

                </tbody>
              </table>
            </div>
          )}

          {mostrar.partidasJugadas && (
            <div className='h-full overflow-y-auto p-2 scroll-invisible'>
              <table className='w-full text-sm'>
                <thead className='border-b'>
                  <tr className='text-lg text-[#171717bd]'>
                    <th className='text-lg  py-2'>Puntuación</th>
                    <th className='text-lg  py-2'>Distancia (km)</th>
                    <th className='text-lg  py-2'>Tiempo (s)</th>
                    <th className='text-lg  py-2'>Categoría</th>
                    <th className='text-lg  py-2'>Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {partidasJugadas.map((partida, index) => {
                    const latObjetivo = Number(partida.latitud);
                    const lonObjetivo = Number(partida.longitud);

                    const [latMarcada, lonMarcada] = partida.ubicacion_marcada
                      .split(',')
                      .map(coord => Number(coord.trim()));

                    return (
                      <tr key={index} className="border-b text-lg lg:text-lg">
                        <td className=' py-2'>{partida.puntuacion}</td>
                        <td className=' py-2'>{partida.desplazamiento}</td>
                        <td className=' py-2'>{partida.tiempo}</td>
                        <td className=' py-2'>{partida.nombre}</td>
                        <td className=' py-2'>
                          <Link
                            to="/verResultado"
                            state={{
                              latObjetivo,
                              lonObjetivo,
                              latMarcada,
                              lonMarcada
                            }}
                          >
                            <div className="underline hover:text-gray-400">Ver resultado</div>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}

                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

      <div className="text-center absolute top-7 left-7">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32" className=' hover:scale-125 transition-all duration-300 cursor-pointer' onClick={() => (navigate("/inicio"))}><path fill='#FFBD54' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
      </div>
    </div >
  )
}

export default PantallaPerfil
