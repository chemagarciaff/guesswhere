import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import marker_1 from "./../assets/images/marker_1.png";
import marker_2 from "./../assets/images/marker_2.png";
import marker_3 from "./../assets/images/marker_3.png";
import marker_4 from "./../assets/images/marker_4.png";
import marker_5 from "./../assets/images/marker_5.png";
import Footer from './Footer';
import { MapaContext } from '../contextos/MapaContext';
import fondo from "./../assets/images/mapa_sin_markers.webp"

const PantallaInicio = () => {
  const { configuracionPartida, setConfiguracionPartida, usuario } = useContext(MapaContext)
  const [titulo, setTitulo] = useState("GuessWhere");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate()

  const mostrarTitulo = (nuevoTitulo) => {
    setTitulo(nuevoTitulo);
    setAnimate(true);
  };

  const cerrarSesion = () => {
     // Eliminar usuario y token del sessionStorage
  sessionStorage.removeItem('usuario');
  sessionStorage.removeItem('token');

  navigate('/')
  }

  // Reinicia animación para permitir re-ejecución
  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(false), 500);
    console.log(usuario)
    return () => clearTimeout(timeout);
  }, [titulo]);

  return (
    <div className='w-full h-screen relative top-0 left-0 fondo-mapa'>
      <p className={`relative top-[35px] text-5xl letras-arcoiris w-fit left-1/2 -translate-x-1/2 ${animate ? '' : ''}`}>{titulo}</p>

      <div className="absolute top-[20px] right-[20px] flex items-center gap-1 px-[12px] py-[8px]">
        <img
          src="https://i.pravatar.cc/40" // Usa una imagen por defecto o del backend si la tienes
          alt="Usuario"
          className="w-[50px] h-[50px] rounded-full object-cover mr-[10px]"
        />
        <div className="flex flex-col text-[12px]">
          <p className='nombre'>{usuario.nombre} {usuario.apellido1}</p>
          <p className=''>{usuario.puntuacion_total} puntos</p>
          <p className='resto'>Nivel {usuario.nivel}</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={cerrarSesion} viewBox="0 0 512 512" className='ml-2 cursor-pointer' width="30" height='30'><path fill="#ffffff" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
      </div>

      <Link to={'/configuracion'}>
        <img
          src={marker_1}
          alt=""
          className='marker_1 jump-on-hover absolute top-[30%] left-[18%] w-[60px] flex cursor-pointer'
          onMouseOver={() => mostrarTitulo("JUGAR")}
          onClick={(event) => {console.log(event)}}
          
          />
      </Link>

      <Link to={'/ranking'}>
        <img
          src={marker_2}
          alt=""
          className='marker_2 jump-on-hover absolute top-[50%] left-[30%] w-[60px] flex cursor-pointer'
          onMouseOver={() => mostrarTitulo("RANKING")}
          onClick={(event) => {console.log(event)}}
          
          />
      </Link>

      <Link to={'/amigos'}>
        <img
          src={marker_3}
          alt=""
          className='marker_3 jump-on-hover absolute top-[38%] left-[44%] w-[60px] flex cursor-pointer'
          onMouseOver={() => mostrarTitulo("AMIGOS")}
          onClick={(event) => {console.log(event)}}
          
          />
      </Link>

      <Link to={'/perfil'}>
        <img
          src={marker_4}
          alt=""
          className='marker_4 jump-on-hover absolute top-[27%] left-[60%] w-[60px] flex cursor-pointer'
          onMouseOver={() => mostrarTitulo("PERFIL")}
          onClick={(event) => {console.log(event)}}
          
          />
      </Link>

      <Link to={'/ajustes'}>
        <img
          src={marker_5}
          alt=""
          className='marker_5 jump-on-hover absolute top-[40%] left-[73%] w-[60px] flex cursor-pointer'
          onMouseOver={() => mostrarTitulo("AJUSTES")}
          onClick={(event) => {console.log(event)}}
          
        />
      </Link>

      <Footer />
    </div>
  );
};

export default PantallaInicio;
