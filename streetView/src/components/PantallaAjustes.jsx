import React from 'react'
import { Link } from 'react-router-dom'
import "./../style/otrasPantallas.css"

const PantallaAjustes = () => {
    return (
        <div className='contenedor'>
            <div className="otros__contenedor">
                <button className='boton'><Link to={'/inicio'}>Volver</Link></button>
            </div>
            <div className="background background__ajustes">
                AJUSTES
            </div>


        </div>
    )
}

export default PantallaAjustes