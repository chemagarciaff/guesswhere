import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import './../style/timer.css'
import { MapaContext } from '../contextos/MapaContext';

const Timer = () => {
  const [segundos, setSegundos] = useState(40); // 2 minutos
  const { configuracionPartida, setConfiguracionPartida } = useContext(MapaContext);

  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate(); // Hook para cambiar de ruta

  useEffect(() => {
    let interval;

    if (isActive && configuracionPartida.tiempo > 0) {
      interval = setInterval(() => {
        setConfiguracionPartida((prev) => {
          return {
            ...prev,
            tiempo: prev.tiempo - 1, // Decrementa el tiempo restante
          };
        }); // Decrementa el contador
      }, 1000);
    } else if (configuracionPartida.tiempo === 0) {
      setIsActive(false); // Detén el temporizador cuando llegue a 0
      navigate('/resultado'); // Redirige a otro componente al finalizar
    }

    return () => clearInterval(interval); // Limpiar intervalo si el componente se desmonta
  }, [isActive, configuracionPartida.tiempo, navigate]);

  const formatTime = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
  };

  return (
    <div className='timer'>
      <h2>Temporizador: {formatTime(configuracionPartida.tiempo)}</h2>
      {!isActive && configuracionPartida.tiempo === 0 && <p>¡Tiempo terminado!</p>}
    </div>
  );
};

export default Timer;
