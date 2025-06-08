import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import marker_1 from "./../assets/images/marker_1.png";
import marker_2 from "./../assets/images/marker_2.png";
import marker_3 from "./../assets/images/marker_3.png";
import marker_4 from "./../assets/images/marker_4.png";
import marker_5 from "./../assets/images/marker_5.png";
import { MapaContext } from '../contextos/MapaContext';
import Reproductor from './Reproductor';

const PantallaInicio = () => {
  const { usuario, avatares, ajustes, setAjustes } = useContext(MapaContext)
  const [titulo, setTitulo] = useState("GuessWhere");
  const [animate, setAnimate] = useState(false);
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const navigate = useNavigate()

  const mostrarTitulo = (nuevoTitulo) => {
    setTitulo(nuevoTitulo);
    setAnimate(true);
  };

  const handleChange = (e) => {
    setAjustes(prev => ({
      ...prev,
      width_marker: e.target.value
    }))
  }

  const cerrarSesion = () => {
    // Eliminar usuario y token del sessionStorage
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('avatares');
    navigate('/')
  }

  // Reinicia animación para permitir re-ejecución
  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timeout);
  }, [titulo]);

  return (
    <div className='w-full h-screen relative top-0 left-0 fondo-mapa-cover'>
      <p className={`relative top-[35px] text-5xl letras-arcoiris w-fit pb-2 left-1/2 -translate-x-1/2 ${animate ? '' : ''}`}>{titulo}</p>

      <div className="absolute hover:text-[#8CA9F0] hover:scale-110 transition top-[20px] right-[20px] hidden lg:flex items-center gap-1 px-[12px] py-[8px] border rounded-full cursor-pointer">
        <img
          src={avatares[usuario.id_jugador]} // Usa una imagen por defecto o del backend si la tienes
          alt="Usuario"
          className="w-[50px] h-[50px] rounded-full object-cover mr-[10px]"
        />
        <div className="flex flex-col items-start text-[12px]">
          <p className=''>{usuario.nombre} {usuario.apellido1}</p>
          <p className=''>{usuario.username}</p>
          <p className=''>{usuario.puntuacion_total} puntos</p>
        </div>
        {usuario.rol == 1 && (
          <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate("/admin")} viewBox="0 0 448 512" className='ml-4 cursor-pointer' width="25" height='25'><path fill="#FFBD54" d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z" /></svg>)}

        <svg xmlns="http://www.w3.org/2000/svg" onClick={cerrarSesion} viewBox="0 0 512 512" className='ml-4 cursor-pointer' width="25" height='25'><path fill="#FFBD54" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>
      </div>

      <Link to={'/configuracion'}>
        <img
          src={marker_1}
          alt=""
          className='marker_1 jump-on-hover absolute top-[30%] left-[18%] flex cursor-pointer'
          style={{ width: `${ajustes.width_marker}px` }}
          onMouseOver={() => mostrarTitulo("Jugar")}

        />
      </Link>

      <Link to={'/ranking'}>
        <img
          src={marker_2}
          alt=""
          className='marker_2 jump-on-hover absolute top-[50%] left-[30%] flex cursor-pointer'
          style={{ width: `${ajustes.width_marker}px` }}
          onMouseOver={() => mostrarTitulo("Ranking")}

        />
      </Link>

      <Link to={'/amigos'}>
        <img
          src={marker_3}
          alt=""
          className='marker_3 jump-on-hover absolute top-[38%] left-[44%] flex cursor-pointer'
          style={{ width: `${ajustes.width_marker}px` }}
          onMouseOver={() => mostrarTitulo("Amigos")}

        />
      </Link>

      <Link to={'/perfil'}>
        <img
          src={marker_4}
          alt=""
          className='marker_4 jump-on-hover absolute top-[27%] left-[60%] flex cursor-pointer'
          style={{ width: `${ajustes.width_marker}px` }}
          onMouseOver={() => mostrarTitulo("Perfil")}

        />
      </Link>

      <img
        src={marker_5}
        alt=""
        className="marker_5 jump-on-hover absolute top-[40%] left-[73%] flex cursor-pointer"
        style={{ width: `${ajustes.width_marker}px` }}
        onMouseOver={() => mostrarTitulo("Ajustes")}
        onClick={() => setMostrarAjustes(prev => !prev)}

      />

      {mostrarAjustes && (
        <div className="absolute bottom-7 left-7 grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-lg fondo-arcoiris fadeUp">
          <Reproductor />
          <label htmlFor="tipografia">Tipografia</label>
          <select name="tipografia" id="" value={ajustes.tipografia} onChange={(e) => {
            setAjustes(prev => ({
              ...prev,
              tipografia: e.target.value
            }))
          }}>
            <option value="font-osaka" className='font-sansserif'>Osaka</option>
            <option value="font-supersonic" className='font-supersonic'>Supersonic</option>
            <option value="font-contrax" className='font-contrax'>Contrax</option>
            <option value="font-neuro" className='font-neuro'>Neuro</option>
            <option value="font-dune" className='font-dune'>Dune</option>
            <option value="font-cool" className='font-cool'>Cool</option>
          </select>
          <label htmlFor="marker_width">Tamaño markers</label>
          <input type="range" name="marker_width" id="" min={20} max={120} value={ajustes.width_marker} onChange={handleChange} />
        </div>
      )}

      <div className='absolute bottom-2 left-1/2 -translate-x-1/2' >
        <p className=' text-[10px] letras-arcoiris'>GuessWhere © 2025 Chema García Fernández. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default PantallaInicio;
