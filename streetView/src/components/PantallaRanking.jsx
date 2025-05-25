import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./../style/otrasPantallas.css"

const PantallaRanking = () => {

  const [usuariosPublicos, setUsuariosPublicos] = useState([])

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
    <div className='contenedor'>


      <div className="otros__contenedor">
        <div className='ranking'>
          <table className='tabla'>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Jugador</th>
                <th>Puntuación</th>
                <th>Fecha Registro</th>
              </tr>
            </thead>
            <tbody>
              {usuariosPublicos.map((usuario, index) => (
                <tr key={usuario.id_jugador}>
                  <td>{index + 1}</td>
                  <td className="jugador-info">
                    <img src="https://i.pravatar.cc/40" alt={usuario.username} className="avatar" />
                    <span>{usuario.username}</span>
                  </td>

                  <td>{usuario.puntuacion_total}</td>
                  <td>{(usuario.fecha_registro).split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className='boton'><Link to={'/inicio'}>Volver</Link></button>
      </div>

      <div className="background background__ranking">
        RANKING
      </div>

    </div>
  )
}

export default PantallaRanking