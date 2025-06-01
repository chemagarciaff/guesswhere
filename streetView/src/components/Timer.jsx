import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import './../style/timer.css'
import { MapaContext } from '../contextos/MapaContext';

const Timer = () => {
  const { configuracionPartida, setConfiguracionPartida } = useContext(MapaContext);
  const [segundos, setSegundos] = useState(configuracionPartida.tiempo); // 2 minutos

  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate(); // Hook para cambiar de ruta

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSegundos((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          setIsActive(false); // Detén el temporizador cuando llegue a 0
          return 0;
        }); // Decrementa el contador
      }, 1000);
    } else {
      if(configuracionPartida.coordenadasSeleccionada.lat === 0 && configuracionPartida.coordenadasSeleccionada.lon === 0) {
        setIsActive(false); // Detén el temporizador cuando llegue a 0
        navigate('/selector'); // Redirige a otro componente al finalizar
      } else {
        setIsActive(false); // Detén el temporizador cuando llegue a 0
        navigate('/resultado'); // Redirige a otro componente al finalizar
      }
    }

    return () => clearInterval(interval); // Limpiar intervalo si el componente se desmonta
  }, [isActive, configuracionPartida.tiempo, navigate]);

  const formatTime = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
  };

  return (
    <div className='aboslute top-[50px] left-[45%] w-[180px] z-50 bg-[#00000099]'>
      <h2>Temporizador: {formatTime(segundos)}</h2>
      {!isActive && configuracionPartida.tiempo === 0 && <p>¡Tiempo terminado!</p>}
    </div>
  );
};

export default Timer;
