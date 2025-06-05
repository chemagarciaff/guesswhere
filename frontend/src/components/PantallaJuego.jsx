import React from 'react'
import StreetView from './MapaStreetView'
import SelectorUbicacion from './MapaSelectorUbicacion'
import "./../style/pantallaJuego.css"
import Timer from './Timer'

const PantallaJuego = () => {
  return (
    <div className='w-screen h-screen overflow-hidden absolute top-0 left-0'>
      <div className="w-full h-full relative">

        <StreetView />

        <SelectorUbicacion />

        <Timer />

      </div>
    </div>
  )
}

export default PantallaJuego