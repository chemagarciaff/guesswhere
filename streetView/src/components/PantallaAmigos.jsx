import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapaContext } from '../contextos/MapaContext'

const PantallaAmigos = () => {

  const [amigos, setAmigos] = useState([])
  const [peticiones, setPeticiones] = useState([])
  const [noAmigos, setNoAmigos] = useState([])
  const { usuario } = useContext(MapaContext);
  const [togglePeticiones, setTogglePeticiones] = useState(true)
  let navigate = useNavigate()

  const handleRight = () => {
    navigate('/perfil')
  }
  const handleLeft = () => {
    navigate('/ranking')
  }



  const getAmigos = async () => {
    console.log(usuario.id)
    const response = await fetch('http://localhost:3000/guesswhere/amigo/confirmados/' + usuario.id_jugador)
    const data = await response.json()
    console.log(data)
    setAmigos(data)
  }
  const getNoAmigos = async () => {
    const response = await fetch('http://localhost:3000/guesswhere/amigo/jugadores-disponibles/' + usuario.id_jugador)
    const data = await response.json()
    console.log(data)
    setNoAmigos(data)
  }
  const getPeticiones = async () => {
    const response = await fetch('http://localhost:3000/guesswhere/amigo/peticiones/' + usuario.id_jugador)
    const data = await response.json()
    console.log(data)
    setPeticiones(data)
  }

  const handleEnviarSolicitud = async (id_jugador2) => {
    const response = await fetch(`http://localhost:3000/guesswhere/amigo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_jugador1: usuario.id_jugador,
        id_jugador2: id_jugador2,
        confirmacion: 0
      })
    })

    if (response.ok) {
      console.log('Solicitud enviada');
      await getNoAmigos(); // Refresca la lista para quitar al usuario añadido
      await getPeticiones(); // Opcional: muestra tu propia petición enviada
    } else {
      console.error('Error al enviar solicitud');
    }
  }

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

  const handleAmistad = async (id_jugador1, id_jugador2) => {
    const response = await fetch(`http://localhost:3000/guesswhere/amigo/${id_jugador1}/${id_jugador2}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      await getPeticiones();
      await getAmigos();
    } else {
      console.error('Error al confirmar la amistad');
    }
  }
  const handleNoAmistad = async (id_jugador1, id_jugador2) => {
    const response = await fetch(`http://localhost:3000/guesswhere/amigo/${id_jugador1}/${id_jugador2}`, {
      method: 'DELETE', // DELETE para eliminar la amistad
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      await getPeticiones();
      await getAmigos();
    } else {
      console.error('Error al eliminar la amistad');
    }
  }

  useEffect(() => {
    getAmigos()
    getPeticiones()
    getNoAmigos()
  }, [])

  return (
    <div className="w-full min-h-screen relative top-0 left-0 fondo-mapa flex flex-col items-center justify-start pt-[110px] gap-8">

      <p className="text-5xl letras-arcoiris w-fit absolute top-7 left-1/2 -translate-x-1/2">Amigos</p>

      <div className="h-[70vh] px-12 grid gap-10 grid-cols-1 lg:grid-cols-[2fr_3fr] lg:grid-rows-[auto] min-h-0 overflow-hidden w-full">

        {/* Peticiones de amistad */}
        {togglePeticiones && (

          <div className="p-4 rounded-lg shadow bg-gray-100 bg-opacity-30 backdrop-blur-sm borde-arcoiris">
            <div className='flex gap-5 w-full justify-between items-center px-3'>

              <h2 className="text-xl font-semibold mb-2 border-2 rounded-md cursor-pointer p-2">Peticiones recibidas</h2>
              <h2 className="text-xl font-semibold mb-2 cursor-pointer" onClick={() => setTogglePeticiones(prev => !prev)}>Enviar petición</h2>
            </div>
            {peticiones.length !== 0 ? (
              <div className="space-y-2">
                {peticiones.map((peticion) => (
                  <div key={peticion.id_jugador} className="flex items-center gap-4 p-2 bg-gray-100 rounded text-black">
                    <img src={fet} alt={peticion.username} className="avatar w-10 h-10 rounded-full" />
                    <span className="flex-1">{peticion.nombre} {peticion.apellido1}</span>
                    <svg onClick={() => handleAmistad(peticion.id_jugador, usuario.id_jugador)} className="w-6 h-6 text-green-600 cursor-pointer border-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="..." /></svg>
                    <svg onClick={() => handleNoAmistad(peticion.id_jugador, usuario.id_jugador)} className="w-6 h-6 text-red-600 cursor-pointer border-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="..." /></svg>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay peticiones</p>
            )}
          </div>
        )}

        {/* Enviar solicitud */}
        {!togglePeticiones && (

          <div className="p-4 rounded-lg shadow1 bg-gray-100 bg-opacity-30 backdrop-blur-sm">
            <div className='flex gap-5 w-full justify-between items-center px-3'>

              <h2 className="text-xl font-semibold mb-2 cursor-pointer" onClick={() => setTogglePeticiones(prev => !prev)}>Peticiones recibidas</h2>
              <h2 className="text-xl font-semibold mb-2 border-2 rounded-md p-2 cursor-pointer">Enviar petición</h2>
            </div>
            {noAmigos.length !== 0 ? (
              <div className="space-y-2">
                {noAmigos.map((peticion) => (
                  <div
                    key={peticion.id_jugador}
                    className="group flex items-center gap-4 p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200"
                  >
                    <img
                      src={fetchAvatar(peticion.id_jugador) || "https://i.pravatar.cc/40"}
                      alt={peticion.username}
                      className="avatar w-10 h-10 rounded-full"
                    />

                    <span className="flex-1 text-gray-700 group-hover:text-black transition-colors duration-200">
                      {peticion.nombre} {peticion.apellido1}
                    </span>

                    <button
                      onClick={() => handleEnviarSolicitud(peticion.id_jugador)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200"
                    >
                      Añadir
                    </button>
                  </div>

                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay jugadores disponibles</p>
            )}
          </div>
        )}

        {/* Mis amigos */}
        <div className="p-4 rounded-lg shadow overflow-auto bg-gray-100 bg-opacity-30 backdrop-blur-sm borde-arcoiris">
          <h2 className="text-xl font-semibold mb-2 ">Mis amigos</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Jugador</th>
                <th className="p-2">Puntuación</th>
                <th className="p-2">Fecha Registro</th>
              </tr>
            </thead>
            <tbody>
              {amigos.map((usuario) => (
                <tr key={usuario.id_jugador} className="group border-b hover:bg-gray-50">
                  <td className="flex items-center gap-2 p-2 text-white group-hover:text-black">
                    <img
                      src="https://i.pravatar.cc/40"
                      alt={usuario.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{usuario.username}</span>
                  </td>
                  <td className="p-2 text-white group-hover:text-black">{usuario.puntuacion_total}</td>
                  <td className="p-2 text-white group-hover:text-black">
                    {usuario.fecha_registro.split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center absolute top-7 left-7">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32" className=' hover:scale-125 transition-all duration-300 cursor-pointer' onClick={() => (navigate("/inicio"))}><path fill='#FFBD54' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
      </div>
    </div>

  )
}

export default PantallaAmigos
{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='flecha__desplazamiento flecha__desplazamiento-izquierda' onClick={handleLeft}><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
<p>AMIGOS</p>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='flecha__desplazamiento flecha__desplazamiento-derecha' onClick={handleRight} ><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg> */}