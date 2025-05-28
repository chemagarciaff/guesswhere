import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./../style/otrasPantallas.css"
import { MapaContext } from '../contextos/MapaContext';

const PantallaPerfil = () => {
  const { usuario, setUsuario } = useContext(MapaContext);
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };


  const [mostrarDatos, setMostrarDatos] = useState(true)
  let navigate = useNavigate()
  const handleRight = () => {
    navigate('/ajustes')
  }
  const handleLeft = () => {
    navigate('/amigos')
  }

  return (
    <div className='contenedor'>
      <div className="otros__contenedor perfil">
        <div className='perfil__botones'>
          <div className='perfil__boton boton' onClick={() => setMostrarDatos(true)}>Mis datos personales</div>
          <div className='perfil__boton boton' onClick={() => setMostrarDatos(false)}>Ubicaciones favoritas</div>
        </div>

        {mostrarDatos && (
          <div className='perfil__outlet'>
            <form className="perfil__form">
              <div className="avatar__container">
                <div className="avatar__preview" onClick={handleAvatarClick}>
                  <img
                    src="https://i.pravatar.cc/40" // Usa tu avatar por defecto aquí
                    alt="avatar"
                    className="avatar__img"
                  />
                </div>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
              </div>
              <div className='perfil__form-container'>
                <div className='perfil__form-data'>
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" name="nombre" value={usuario.nombre } />
                </div>

                <div className='perfil__form-data'>
                  <label htmlFor="apellido1">Primer Apellido</label>
                  <input type="text" id="apellido1" name="apellido1" value={usuario.apellido1 } />
                </div>

                <div className='perfil__form-data'>
                  <label htmlFor="apellido2">Segundo Apellido</label>
                  <input type="text" id="apellido2" name="apellido2" value={usuario.apellido2 } />
                </div>

                <div className='perfil__form-data'>
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" name="usernmae" value={ usuario.username} />
                </div>

                <div className='perfil__form-data'>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={ usuario.email} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <input type="checkbox" id="privacidad" name="privacidad" />
                  <label htmlFor="privacidad">Acepto la política de privacidad</label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="boton" type="submit">Enviar</button>
              </div>
            </form>

          </div>
        )}
        {!mostrarDatos && (
          <div className='perfil__outlet'>
            ubicacionesFavoritas
          </div>
        )}

        <button className='boton'><Link to={'/inicio'}>Volver</Link></button>
      </div>
      <div className="background background__perfil">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='flecha__desplazamiento flecha__desplazamiento-izquierda' onClick={handleLeft}><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        <p>perfil</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='flecha__desplazamiento flecha__desplazamiento-derecha' ><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
      </div>

    </div>
  )
}

export default PantallaPerfil