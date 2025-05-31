import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

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
      className="absolute right-0 top-0 h-screen w-[102vw]"
    >
      {/* <div className="text-center absolute top-7 left-7 z-50">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32" className=' hover:scale-125 transition-all duration-300 cursor-pointer' onClick={() => (navigate("/perfil"))}><path fill='#FFBD54' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
      </div> */}
    </div>
  );
};

export default StreetViewFav;
