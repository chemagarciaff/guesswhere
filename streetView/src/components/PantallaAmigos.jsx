import React from 'react'
import { Link } from 'react-router-dom'
import "./../style/otrasPantallas.css"

const PantallaAmigos = () => {
  return (
    <div className='contenedor'>
      <div className="otros__contenedor">
        <p>hola</p>
        <button className='boton'><Link to={'/inicio'}>Volver</Link></button>
      </div>
      <div className="background background__amigos">
        AMIGOS
      </div>

    </div>
  )
}

export default PantallaAmigos