import './../style/pantallaResultado.css';
import DetallesResultado from './DetallesResultado';
import MapaResultado from './MapaResulltado';

const PantallaResultado = () => {

  return (
    <div className='pantallaResultado'>
      <DetallesResultado />
      <MapaResultado />
    </div>
  )
};

export default PantallaResultado;
