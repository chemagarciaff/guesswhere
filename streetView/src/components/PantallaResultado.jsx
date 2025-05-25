import { useEffect } from 'react';
import './../style/pantallaResultado.css';
import DetallesResultado from './DetallesResultado';
import MapaResultado from './MapaResulltado';
import { useContext } from 'react';
import { MapaContext } from '../contextos/MapaContext';

const PantallaResultado = () => {


  return (
    <div className='pantallaResultado'>
      <DetallesResultado />
      <MapaResultado />
    </div>
  )
};

export default PantallaResultado;
