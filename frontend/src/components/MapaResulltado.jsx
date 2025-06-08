import { useContext, useEffect, useRef, useState } from 'react';
import { MapaContext } from '../contextos/MapaContext';
import gif1 from './../assets/gifs/5.gif';
import './../style/pantallaResultado.css';

const MapaResultado = () => {
    const { configuracionPartida, setConfiguracionPartida } = useContext(MapaContext);
    const [map, setMap] = useState(null);
    const [showGif, setShowGif] = useState(true); 
    const mapRef = useRef(null);
    const polylineRef = useRef(null);
    const markerSeleccionRef = useRef(null);
    const markerObjetivoRef = useRef(null);


    // Función para calcular distancia HAVERSINE
    function getDistanceInKm(lat1, lng1, lat2, lng2) {
        const R = 6371;
        const toRad = (value) => (value * Math.PI) / 180;

        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    // Crear el mapa una sola vez
    useEffect(() => {
        if (mapRef.current && !map) {
            const initialCenter = { lat: 0, lng: 0 }; // puedes poner otro por defecto
            const newMap = new google.maps.Map(mapRef.current, {
                center: initialCenter,
                zoom: 2,
            });
            setMap(newMap);
        }
    }, [map]);

    // Dibujar línea y calcular distancia
    useEffect(() => {
        if (!map || !configuracionPartida.coordenadasSeleccionada || !configuracionPartida.coordenadasObjetivo) return;

        if (polylineRef.current) {
            polylineRef.current.setMap(null);
        }

        const path = [
            { lat: configuracionPartida.coordenadasSeleccionada.lat, lng: configuracionPartida.coordenadasSeleccionada.lon },
            { lat: configuracionPartida.coordenadasObjetivo.lat, lng: configuracionPartida.coordenadasObjetivo.lon },
        ];

        const polyline = new google.maps.Polyline({
            path,
            geodesic: true,
            strokeColor: '#2a9abf',
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });

        polyline.setMap(map);
        polylineRef.current = polyline;

        // Borrar marcadores anteriores si existen
        if (markerSeleccionRef.current) {
            markerSeleccionRef.current.setMap(null);
        }
        if (markerObjetivoRef.current) {
            markerObjetivoRef.current.setMap(null);
        }

        // Crear nuevos marcadores
        const markerSeleccion = new google.maps.Marker({
            position: path[0],
            map,
            title: 'Tu selección',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,            // Tamaño
                fillColor: '#2a9abf', // Verde
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: '#FFFFFF'
            }
        });

        const markerObjetivo = new google.maps.Marker({
            position: path[1],
            map,
            title: 'Ubicación objetivo',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,            // Tamaño
                fillColor: '#2a9abf', // Verde
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: '#FFFFFF'
            }
        });

        // Guardarlos en los refs para borrarlos después si cambia algo
        markerSeleccionRef.current = markerSeleccion;
        markerObjetivoRef.current = markerObjetivo;

        const dist = getDistanceInKm(
            configuracionPartida.coordenadasSeleccionada.lat,
            configuracionPartida.coordenadasSeleccionada.lon,
            configuracionPartida.coordenadasObjetivo.lat,
            configuracionPartida.coordenadasObjetivo.lon
        );

        setConfiguracionPartida(prev => ({
            ...prev,
            distancia: parseFloat(dist.toFixed(2))
        }));

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(path[0].lat, path[0].lng));
        bounds.extend(new google.maps.LatLng(path[1].lat, path[1].lng));
        map.fitBounds(bounds);

    }, [map, configuracionPartida.coordenadasSeleccionada, configuracionPartida.coordenadasObjetivo]);

    useEffect(() => {
        if(configuracionPartida.distancia && configuracionPartida.distancia < 300){
            const timer = setTimeout(() => {
              setShowGif(false);
            }, 5000);
        
            return () => clearTimeout(timer);
        }
    }, [configuracionPartida.distancia]);

    return (
        <>
            <div className='mapaResultado'>
                <div ref={mapRef} className='mapa' />
            </div>
            {showGif && (
            <div className="gifContainer">
              <img src={gif1} alt="Celebración" className="gif" />
            </div>
          )}
        </>
    );
};

export default MapaResultado;
