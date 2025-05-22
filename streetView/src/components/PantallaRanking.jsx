import React from 'react'
import { Link } from 'react-router-dom'
import "./../style/otrasPantallas.css"

const PantallaRanking = () => {
  return (
    <div className='contenedor'>
      
      <div className="otros__contenedor">
        <button className='boton'><Link to={'/inicio'}>Volver</Link></button>
      </div>

      <div className="background background__ranking">
        RANKING
      </div>

    </div>
  )
}

export default PantallaRanking