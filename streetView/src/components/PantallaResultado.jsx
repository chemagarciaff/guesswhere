import { useEffect } from 'react';
import './../style/pantallaResultado.css';
import DetallesResultado from './DetallesResultado';
import MapaResultado from './MapaResulltado';
import { useContext } from 'react';
import { MapaContext } from '../contextos/MapaContext';

const PantallaResultado = () => {


  return (
    <div className='w-screen h-screen absolute top-0 left-0 overflow-hidden grid grid-cols-[2fr_7fr]'>
      <DetallesResultado />
      <MapaResultado />
    </div>
  )
};

export default PantallaResultado;
