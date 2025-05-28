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

  return (
    <div className='contenedor'>

      <div className="otros__contenedor">
        <div className='ranking'>
          <table className='tabla'>
            <thead>
              <tr>
                <th></th>
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='flecha__desplazamiento flecha__desplazamiento-izquierda' onClick={handleLeft}><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        <p>RANKING</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='flecha__desplazamiento flecha__desplazamiento-derecha' onClick={handleRight}><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
      </div>

    </div>
  )
}

export default PantallaRanking