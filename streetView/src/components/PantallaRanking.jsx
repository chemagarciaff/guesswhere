import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./../style/otrasPantallas.css"
import { MapaContext } from '../contextos/MapaContext'

const PantallaRanking = () => {

  const [usuariosPublicos, setUsuariosPublicos] = useState([])
  const {avatares} = useContext(MapaContext)
  const navigate = useNavigate()

  const getUsuariosPublicos = async () => {
    const response = await fetch('http://localhost:3000/guesswhere/usuario/publicos')
    const data = await response.json()
    console.log(data)
    setUsuariosPublicos(data)
  }

  useEffect(() => {
    getUsuariosPublicos()
  }
    , [])

  return (
  <div className="w-full min-h-screen relative top-0 left-0 fondo-mapa flex flex-col items-center justify-start pt-[110px] gap-8">

      <p className="text-5xl letras-arcoiris w-fit absolute top-7 left-1/2 -translate-x-1/2">Ranking</p>

      <div className="lg:h-[80vh] px-12 gap-10 flex flex-col min-h-0 overflow-hidden w-full p-6 bg-gray-100 bg-opacity-30 backdrop-blur-sm">

      <table className='w-full text-sm sm:text-base text-left table-auto '>
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
              className={`border-b border-white/20 ${index === 0 ? 'text-2xl font-bold text-yellow-300' : index === 1 ? 'text-xl text-gray-400' : index === 2 ? 'text-lg text-orange-300' : ''}`}
            >
              <td className='py-2 px-3 text-center'>{index + 1}</td>

              <td className='py-2 px-3 h-full align-middle'>
                <div className="flex items-center justify-center gap-2">
                  <img
                    src={avatares[usuario.id_jugador]}
                    alt={usuario.username}
                    className="w-8 h-8 text-center rounded-full object-cover border border-white/40"
                  />
                  <span className=''>{usuario.username}</span>
                </div>
              </td>

              <td className='py-2 px-3 text-center'>{usuario.puntuacion_total}</td>
              <td className='py-2 px-3 text-center'>{usuario.fecha_registro.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="text-center absolute top-7 left-7">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32" className=' hover:scale-125 transition-all duration-300 cursor-pointer' onClick={() => (navigate("/inicio"))}><path fill='#FFBD54' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
    </div>
  </div>

  )
}

export default PantallaRanking
