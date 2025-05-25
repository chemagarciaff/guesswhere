import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./../style/otrasPantallas.css"
import { MapaContext } from '../contextos/MapaContext'

const PantallaAmigos = () => {

  const [amigos, setAmigos] = useState([])
  const [peticiones, setPeticiones] = useState([])
  const { usuario } = useContext(MapaContext);


  const getAmigos = async () => {
    const response = await fetch('http://localhost:3000/guesswhere/amigo/confirmados/' + usuario.id)
    const data = await response.json()
    console.log(data)
    setAmigos(data)
  }
  const getPeticiones = async () => {
    const response = await fetch('http://localhost:3000/guesswhere/amigo/peticiones/' + usuario.id)
    const data = await response.json()
    console.log(data)
    setPeticiones(data)
  }

  const handleAmistad = async (id_jugador1, id_jugador2) => {
    const response = await fetch(`http://localhost:3000/guesswhere/amigo/${id_jugador1}/${id_jugador2}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      await getPeticiones();
      await getAmigos();
    } else {
      console.error('Error al confirmar la amistad');
    }
  }
  const handleNoAmistad = async (id_jugador1, id_jugador2) => {
    const response = await fetch(`http://localhost:3000/guesswhere/amigo/${id_jugador1}/${id_jugador2}`, {
      method: 'DELETE', // DELETE para eliminar la amistad
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      await getPeticiones();
      await getAmigos();
    } else {
      console.error('Error al eliminar la amistad');
    }
  }

  useEffect(() => {
    getAmigos()
    getPeticiones()
  }, [])

  return (
    <div className='contenedor'>
      <div className="otros__contenedor otros__contenedor__amigos">
        <div className='peticiones__amigos'>
          <h2>Peticiones de amistad</h2>
          {peticiones.length !== 0 && (
            <div className='peticiones'>
              {peticiones.map((peticion) => (
                <div key={peticion.id_jugador} className='peticion'>
                  <img src="https://i.pravatar.cc/40" alt={peticion.username} className="avatar" />
                  <span>{peticion.nombre} {peticion.apellido1}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='check' onClick={() => handleAmistad(peticion.id_jugador, usuario.id)}><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='noCheck' onClick={() => handleNoAmistad(peticion.id_jugador, usuario.id)}><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg>
                </div>
              ))}
            </div>)}
          {peticiones.length === 0 && (
            <p>No hay peticiones</p>
          )}
        </div>
        <div className='amigos'>
          <h2>Mis amigos</h2>
          <table className='tabla'>
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Puntuación</th>
                <th>Fecha Registro</th>
              </tr>
            </thead>
            <tbody>
              {amigos.map((usuario, index) => (
                <tr key={usuario.id_jugador}>
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
      <div className="background background__amigos">
        AMIGOS
      </div>

    </div>
  )
}

export default PantallaAmigos