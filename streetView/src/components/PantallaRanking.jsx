import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./../style/otrasPantallas.css"
import { MapaContext } from '../contextos/MapaContext'

const PantallaRanking = () => {

  const [usuariosPublicos, setUsuariosPublicos] = useState([])
  const { avatares } = useContext(MapaContext)
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
    <div className="w-full min-h-screen relative top-0 left-0 fondo-mapa flex flex-col items-center justify-start pt-[110px] gap-8 ">

      <p className="text-5xl letras-arcoiris w-fit absolute top-7 left-1/2 -translate-x-1/2">Ranking</p>
      <div className='px-12 gap-10 flex flex-col min-h-0 overflow-hidden w-full pb-4 fadeUp'>

        <div className="flex-1 overflow-hidden bg-gray-100 bg-opacity-30 backdrop-blur-sm p-6 rounded-lg shadow-lg fadeUp borde-arcoiris max-h-[630px]">
          <div className="border overflow-y-auto">

           <table className="border w-full text-sm sm:text-base text-center table-fixed scroll-invisible">
  <thead className="border text-white/80 border-b border-white/30 bg-white/10">
    <tr>
      <th className="py-3 w-[10%]">Puesto</th>
      <th className="py-3 w-[10%]">Avatar</th>
      <th className="py-3 w-[30%]">Jugador</th>
      <th className="py-3 w-[25%]">Puntuación</th>
      <th className="py-3 w-[25%]">Registro</th>
    </tr>
  </thead>
  <tbody className="text-white divide-y divide-white/15">
    {usuariosPublicos.map((usuario, index) => {
      const baseRow = "py-3 px-4";
      const rankStyle = [
        index === 0 ? 'text-yellow-300 font-bold text-lg' :
        index === 1 ? 'text-gray-300 font-semibold' :
        index === 2 ? 'text-orange-300 font-medium' :
        'text-white'
      ];

      return (
        <tr key={usuario.id_jugador} className="hover:bg-white/10 transition">
          <td className={`${baseRow} ${rankStyle}`}>{index + 1}</td>
          <td className={baseRow}>
            <div className="flex justify-center">
              <img
                src={avatares[usuario.id_jugador]}
                alt={usuario.username}
                className="w-6 h-6 rounded-full object-cover border border-white/40"
              />
            </div>
          </td>
          <td className={baseRow}>{usuario.username}</td>
          <td className={baseRow}>{usuario.puntuacion_total}</td>
          <td className={baseRow}>{usuario.fecha_registro.split("T")[0]}</td>
        </tr>
      );
    })}
  </tbody>
</table>


          </div>
        </div>
      </div>
      <div className="border text-center absolute top-7 left-7">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32" className=' hover:scale-125 transition-all duration-300 cursor-pointer' onClick={() => (navigate("/inicio"))}><path fill='#FFBD54' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
      </div>
    </div>

  )
}

export default PantallaRanking
