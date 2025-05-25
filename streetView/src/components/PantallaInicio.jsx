import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import marker_1 from "./../assets/images/marker_1.png";
import marker_2 from "./../assets/images/marker_2.png";
import marker_3 from "./../assets/images/marker_3.png";
import marker_4 from "./../assets/images/marker_4.png";
import marker_5 from "./../assets/images/marker_5.png";
import "./../style/pantallaInicio.css";
import Footer from './Footer';
import { MapaContext } from '../contextos/MapaContext';

const PantallaInicio = () => {
  const { configuracionPartida, setConfiguracionPartida, usuario } = useContext(MapaContext)
  const [titulo, setTitulo] = useState("GuessWhere");
  const [animate, setAnimate] = useState(false);

  const mostrarTitulo = (nuevoTitulo) => {
    setTitulo(nuevoTitulo);
    setAnimate(true);
  };

  // Reinicia animación para permitir re-ejecución
  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(false), 500);
    console.log(usuario)
    return () => clearTimeout(timeout);
  }, [titulo]);

  return (
    <div className='pantallaInicio'>
      <p className={`titulo ${animate ? 'fade-in' : ''}`}>{titulo}</p>

      <div className="usuario-info">
        <img
          src="https://i.pravatar.cc/40" // Usa una imagen por defecto o del backend si la tienes
          alt="Usuario"
          className="usuario-avatar"
        />
        <div className="usuario-data">
          <p className='nombre'>{usuario.nombre} {usuario.apellido1}</p>
          <p className=''>{usuario.puntuacion_total} puntos</p>
          <p className='resto'>Nivel {usuario.nivel}</p>
        </div>
      </div>

      <Link to={'/configuracion'}>
        <img
          src={marker_1}
          alt=""
          className='marker_1 jump-on-hover'
          onMouseOver={() => mostrarTitulo("JUGAR")}
        />
      </Link>

      <Link to={'/ranking'}>
        <img
          src={marker_2}
          alt=""
          className='marker_2 jump-on-hover'
          onMouseOver={() => mostrarTitulo("RANKING")}
        />
      </Link>

      <Link to={'/amigos'}>
        <img
          src={marker_3}
          alt=""
          className='marker_3 jump-on-hover'
          onMouseOver={() => mostrarTitulo("AMIGOS")}
        />
      </Link>

      <Link to={'/perfil'}>
        <img
          src={marker_4}
          alt=""
          className='marker_4 jump-on-hover'
          onMouseOver={() => mostrarTitulo("PERFIL")}
        />
      </Link>

      <Link to={'/ajustes'}>
        <img
          src={marker_5}
          alt=""
          className='marker_5 jump-on-hover'
          onMouseOver={() => mostrarTitulo("AJUSTES")}
        />
      </Link>

      <Footer />
    </div>
  );
};

export default PantallaInicio;
