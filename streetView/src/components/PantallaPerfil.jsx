import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapaContext } from '../contextos/MapaContext';

const PantallaPerfil = () => {
  const { usuario, setUsuario } = useContext(MapaContext);
  const [avatar, setAvatar] = useState(null);
  const [partidasJugadas, setPartidasJugadas] = useState([]);
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

  useEffect(() => {
    getPartidasJugadas()
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


  let navigate = useNavigate()
  const handleRight = () => {
    navigate('/ajustes')
  }
  const handleLeft = () => {
    navigate('/amigos')
  }

  return (
    <div className='w-full h-screen relative fondo-mapa flex flex-col items-center py-8 justify-between'>

      {/* Título */}
      <p className='text-5xl letras-arcoiris'>Perfil</p>

      {/* Contenedor central: opciones arriba + contenido que ocupa todo lo demás */}
      <div className="flex flex-col flex-grow w-full max-w-[1000px] px-6 py-4 gap-4">

        {/* Opciones arriba */}
        <div className='flex gap-4 justify-center'>
          <div className={`cursor-pointer p-2 ${mostrar.datosPersonales ? 'border-2' : ''}`} onClick={() => setMostrar({ datosPersonales: true, ubicacionesFavoritas: false, partidasJugadas: false })}>
            Mis datos personales
          </div>
          <div className={`cursor-pointer p-2 ${mostrar.ubicacionesFavoritas ? 'border-2' : ''}`} onClick={() => setMostrar({ datosPersonales: false, ubicacionesFavoritas: true, partidasJugadas: false })}>
            Ubicaciones favoritas
          </div>
          <div className={`cursor-pointer p-2 ${mostrar.partidasJugadas ? 'border-2' : ''}`} onClick={() => setMostrar({ datosPersonales: false, ubicacionesFavoritas: false, partidasJugadas: true })}>
            Partidas jugadas
          </div>
        </div>

        {/* Contenido dinámico */}
        <div className="flex-1 overflow-hidden bg-gray-100 bg-opacity-30 backdrop-blur-sm p-6 rounded-lg shadow-lg fadeUp borde-arcoiris max-h-[630px]">

          {mostrar.datosPersonales && (
            <div className='h-full overflow-auto'>
              <form className="flex flex-wrap gap-8">
                <div className="border w-[250px] h-[250px]">
                  <img
                    src="https://i.pravatar.cc/250"
                    alt="avatar"
                    className='object-cover w-full h-full'
                    onClick={handleAvatarClick}
                  />
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label>Nombre <input type="text" value={usuario.nombre} className="input" /></label>
                  <label>Primer Apellido <input type="text" value={usuario.apellido1} className="input" /></label>
                  <label>Segundo Apellido <input type="text" value={usuario.apellido2} className="input" /></label>
                  <label>Username <input type="text" value={usuario.username} className="input" /></label>
                  <label>Email <input type="email" value={usuario.email} className="input" /></label>
                  <div>
                    <input type="checkbox" id="privacidad" />
                    <label htmlFor="privacidad" className="ml-2">Acepto la política de privacidad</label>
                  </div>
                  <button type="submit" className="boton mt-4 self-start">Enviar</button>
                </div>
              </form>
            </div>
          )}

          {mostrar.ubicacionesFavoritas && (
            <div className="h-full overflow-auto p-2">
              <p>Ubicaciones favoritas</p>
            </div>
          )}

          {mostrar.partidasJugadas && (
            <div className='h-full overflow-y-auto scroll-invisible'>
              <table className='w-full text-sm'>
                <thead className='border-b'>
                  <tr className=''>
                    <th className='text-md pb-3'>Puntuación</th>
                    <th className='text-md pb-3'>Distancia (km)</th>
                    <th className='text-md pb-3'>Tiempo (s)</th>
                    <th className='text-md pb-3'>Categoría</th>
                    <th className='text-md pb-3'>Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {partidasJugadas.map((partida, index) => (
                    <tr key={index} className='border-b'>
                      <td>{partida.puntuacion}</td>
                      <td>{partida.desplazamiento}</td>
                      <td>{partida.tiempo}</td>
                      <td>{partida.nombre}</td>
                      <td><button className="text-blue-600 hover:underline">Ver resultado</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

      {/* Botón al fondo */}
      <div className=''>
        <button className='boton'>
          <Link to="/inicio">Volver</Link>
        </button>
      </div>
    </div>
  )
}

export default PantallaPerfil
{/* <div className="background background__perfil">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='flecha__desplazamiento flecha__desplazamiento-izquierda' onClick={handleLeft}><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
  <p>perfil</p>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='flecha__desplazamiento flecha__desplazamiento-derecha' ><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
</div> */}