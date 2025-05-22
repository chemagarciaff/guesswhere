import { useContext, useEffect, useRef, useState } from "react";
import './../style/selectorUbicacion.css';
import { MapaContext } from "../contextos/MapaContext";

function SelectorUbicacion() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const markerRef = useRef(null);
  const { configuracionPartida, setConfiguracionPartida } = useContext(MapaContext);
  

  const handleMapClick = (e, newMap) => {
    const latLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    
    // Actualizar el state
    setConfiguracionPartida((prev) => ({
      ...prev,
      coordenadasSeleccionada: {
        ...prev.coordenadasSeleccionada,
        lat: latLng.lat,
        lon: latLng.lng,
      }
    }));

    if (markerRef.current) {
      markerRef.current.setPosition(latLng);
    } else {
      markerRef.current = new window.google.maps.Marker({
        position: latLng,
        map: newMap,
      });
    }
  };

  useEffect(() => {
    if (!map && window.google && mapRef.current) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });

      newMap.addListener("click", (e) => handleMapClick(e, newMap));
      setMap(newMap);
    }
  }, [map]);

  useEffect(() => {
    console.log('Coordenadas actualizadas:', configuracionPartida.coordenadasSeleccionada);
  }, [configuracionPartida.coordenadasSeleccionada]);

  return (
    <div>
      <div
        id="guess-map"
        ref={mapRef}
        className="selectorUbicacion"
      />
    </div>
  );
}

export default SelectorUbicacion;
