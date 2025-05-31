import React from 'react'
import { Link } from 'react-router-dom'
import "./../style/otrasPantallas.css"

const PantallaAjustes = () => {
     return (
    <div className="w-full min-h-screen relative top-0 left-0 fondo-mapa flex flex-col items-center justify-start pb-8 pt-[100px] gap-8">

      <p className="text-5xl letras-arcoiris w-fit">Ajustes</p>

      <div className="text-center absolute top-7 left-7">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32" className=' hover:scale-125 transition-all duration-300 cursor-pointer' onClick={() => (navigate("/inicio"))}><path fill='#FFBD54' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
      </div>
    </div>

  )
}

export default PantallaAjustes