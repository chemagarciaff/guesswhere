import React from 'react'
import StreetView from './MapaStreetView'
import SelectorUbicacion from './MapaSelectorUbicacion'
import "./../style/pantallaJuego.css"
import Timer from './Timer'

const PantallaJuego = () => {
  return (
    <div className='pantallaJuego'>
      <div className="container">

        <StreetView />

        <SelectorUbicacion />

        <Timer />

      </div>
    </div>
  )
}

export default PantallaJuego