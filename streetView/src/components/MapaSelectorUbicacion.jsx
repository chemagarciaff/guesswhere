import { useContext, useEffect, useRef, useState } from "react";
import './../style/selectorUbicacion.css';
import { MapaContext } from "../contextos/MapaContext";
import { useNavigate } from "react-router-dom";

function SelectorUbicacion() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const markerRef = useRef(null);
  const navigate = useNavigate()
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

  const handleClick = () => {
    setConfiguracionPartida(prev => ({
      ...prev,
      tiempo: 0
    }))
    navigate("/resultado")
  }

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
    <div className="w-fit h-fit z-10 absolute bottom-10 right-20 m-4 p-2 bg-white rounded shadow-lg ">
      <div
        id="guess-map"
        ref={mapRef}
        className="w-[250px] h-[100px] hover:w-[500px] hover:h-[300px] transition-all duration-300 ease-in-out"
      />
      <div className="text-black cursor-pointer hover:w-[500px]" onClick={handleClick}> Comprobar</div>
    </div>
  );
}

export default SelectorUbicacion;
