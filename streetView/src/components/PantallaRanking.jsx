import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./../style/otrasPantallas.css"

const PantallaRanking = () => {

  const [usuariosPublicos, setUsuariosPublicos] = useState([])

  const getUsuariosPublicos = async () => {
    const response = await fetch('http://localhost:3000/guesswhere/usuario/publicos')
    const data = await response.json()
    console.log(data)
    setUsuariosPublicos(data)
  }

  let navigate = useNavigate()
  const handleRight = () => {
    navigate('/amigos')
  }
  const handleLeft = () => {
    navigate('/configuracion')
  }

  useEffect(() => {
    getUsuariosPublicos()
  }
    , [])

  return (<div className='w-full h-screen fondo-mapa flex flex-col py-8 justify-between items-center'>

    {/* Título centrado arriba */}
    <p className='text-5xl font-bold letras-arcoiris text-center'>Ranking</p>

    {/* Contenedor tabla */}
    <div className='flex flex-col justify-center items-center w-full max-w-[900px] max-h-[650px] bg-white/20 backdrop-blur-md px-10 py-12 rounded-xl shadow-2xl border border-white/30'>

      <table className='w-full text-sm sm:text-base text-left table-auto'>
        <thead className='text-white/80 border-b border-white/30'>
          <tr>
            <th className='py-2 px-3 text-center'>#</th>
            <th className='py-2 px-3 text-center'>Jugador</th>
            <th className='py-2 px-3 text-center'>Puntuación</th>
            <th className='py-2 px-3 text-center'>Registro</th>
          </tr>
        </thead>
        <tbody className='text-white'>
          {usuariosPublicos.map((usuario, index) => (
            <tr
              key={usuario.id_jugador}
              className={`border-b border-white/20 ${index === 0 ? 'text-2xl font-bold text-yellow-300' : index === 1 ? 'text-xl text-gray-200' : index === 2 ? 'text-lg text-orange-300' : ''}`}
            >
              <td className='py-2 px-3'>{index + 1}</td>

              <td className='py-2 px-3 h-full align-middle'>
                <div className="flex items-center gap-2">
                  <img
                    src="https://i.pravatar.cc/40"
                    alt={usuario.username}
                    className="w-8 h-8 rounded-full object-cover border border-white/40"
                  />
                  <span>{usuario.username}</span>
                </div>
              </td>

              <td className='py-2 px-3'>{usuario.puntuacion_total}</td>
              <td className='py-2 px-3'>{usuario.fecha_registro.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="text-center mt-4">
      <button className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800">
        <Link to="/inicio">Volver</Link>
      </button>
    </div>
  </div>

  )
}

export default PantallaRanking
