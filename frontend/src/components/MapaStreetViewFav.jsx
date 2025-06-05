import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const StreetViewFav = () => {
  const streetViewRef = useRef(null);
  const panoramaRef = useRef(null); // Referencia persistente a la instancia
  const { state } = useLocation();
  const { latitud, longitud } = state || {};


  useEffect(() => {
    if (window.google && window.google.maps && streetViewRef.current) {
      if (!panoramaRef.current) {
        // Inicializar solo una vez
        panoramaRef.current = new window.google.maps.StreetViewPanorama(streetViewRef.current, {
          position: { lat: latitud, lng: longitud },
          pov: {
            heading: 1,
            pitch: 0
          },
          addressControl: true,
          linksControl: true,
          panControl: true,
          enableCloseButton: true,
          showRoadLabels: true,
          zoomControl: true,
          fullscreenControl: true
        });
      } else {
        // Si ya existe, solo actualiza la posición
        panoramaRef.current.setPosition({ lat: latitud, lng: longitud });
      }
    }
  }, [latitud, longitud]);

  return (
    <div
      ref={streetViewRef}
      className="relative right-0 top-0 h-screen w-screen overflow-hidden"
    >
      <Link to="/perfil">
        <div className='absolute z-10 top-7 text-white left-1/2 -translate-x-1/2 px-24 py-6 fondo-arcoiris hover:scale-110 transition duration-[0.5s] rounded-full cursor-pointer hover:shadow-[0_0_10px_3px_#000000]'>Volver</div>
      </Link>
    </div>
  );
};

export default StreetViewFav;
