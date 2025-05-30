import React, { useContext, useEffect, useRef } from "react";
import { MapaContext } from "../contextos/MapaContext";
import './../style/streetview.css';

const StreetView = () => {
  const streetViewRef = useRef(null);
  const panoramaRef = useRef(null); // Referencia persistente a la instancia
  const { configuracionPartida, setConfiguracionPartida } = useContext(MapaContext);

  const getCoordenadas = async () => {
    let response = null;
    let data = null;
    if (configuracionPartida.categoria === 9) {
      response = await fetch("http://localhost:3000/guesswhere/ubicacion/random");
      data = await response.json();
    } else {
      response = await fetch("http://localhost:3000/guesswhere/pertenece/categoria/" + configuracionPartida.categoria);
      data = await response.json();
      console.log(data)
    }

    setConfiguracionPartida((prev) => ({
      ...prev,
      idUbicacion: data.id_ubicacion,
      coordenadasObjetivo: {
        ...prev.coordenadasObjetivo,
        lat: data.latitud,
        lon: data.longitud,
      },
    }));
  };

  useEffect(() => {
    getCoordenadas();
  }, []);

  useEffect(() => {
    if (window.google && window.google.maps && streetViewRef.current) {
      if (!panoramaRef.current) {
        // Inicializar solo una vez
        panoramaRef.current = new window.google.maps.StreetViewPanorama(streetViewRef.current, {
          position: { lat: configuracionPartida.coordenadasObjetivo.lat, lng: configuracionPartida.coordenadasObjetivo.lon },
          pov: {
            heading: 1,
            pitch: 0
          },
          addressControl: false,
          linksControl: true,
          panControl: true,
          enableCloseButton: false,
          showRoadLabels: false,
          zoomControl: true,
          fullscreenControl: false
        });
      } else {
        // Si ya existe, solo actualiza la posición
        panoramaRef.current.setPosition({ lat: configuracionPartida.coordenadasObjetivo.lat, lng: configuracionPartida.coordenadasObjetivo.lon });
      }
    }
  }, [configuracionPartida.coordenadasObjetivo]);

  return (
    <div
      ref={streetViewRef}
      className="streetview"
    />
  );
};

export default StreetView;
