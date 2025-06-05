import { useContext, useEffect, useRef, useState } from 'react';
import { MapaContext } from '../contextos/MapaContext';
import './../style/pantallaResultado.css';
import { Link, useLocation } from 'react-router-dom';

const VerResultado = () => {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const polylineRef = useRef(null);
    const markerSeleccionRef = useRef(null);
    const markerObjetivoRef = useRef(null);

    const { state } = useLocation();
    const { latObjetivo, lonObjetivo, latMarcada, lonMarcada } = state || {};



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
    useEffect(() => {
        // Prevenir errores si el mapa o coordenadas no están listos aún
        if (
            !map ||
            latMarcada == null || lonMarcada == null ||
            latObjetivo == null || lonObjetivo == null
        ) return;

        // Limpia línea anterior si existe
        if (polylineRef.current) {
            polylineRef.current.setMap(null);
        }

        const path = [
            { lat: latMarcada, lng: lonMarcada },
            { lat: latObjetivo, lng: lonObjetivo },
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
        if (markerSeleccionRef.current) markerSeleccionRef.current.setMap(null);
        if (markerObjetivoRef.current) markerObjetivoRef.current.setMap(null);

        // Crear marcadores
        const markerSeleccion = new google.maps.Marker({
            position: path[0],
            map,
            title: 'Tu selección',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#2a9abf',
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: '#FFFFFF',
            },
        });

        const markerObjetivo = new google.maps.Marker({
            position: path[1],
            map,
            title: 'Ubicación objetivo',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#2a9abf',
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: '#FFFFFF',
            },
        });

        markerSeleccionRef.current = markerSeleccion;
        markerObjetivoRef.current = markerObjetivo;

        // Ajustar el mapa a los puntos
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(path[0].lat, path[0].lng));
        bounds.extend(new google.maps.LatLng(path[1].lat, path[1].lng));
        map.fitBounds(bounds);

    }, [map, latMarcada, lonMarcada, latObjetivo, lonObjetivo]);


    return (
        <>
            <div className='w-screen h-screen relative top-0 left-0'>
                <div ref={mapRef} className='w-full h-full' />
                <Link to="/perfil">
                <div className='absolute top-7 text-white left-1/2 -translate-x-1/2 px-24 py-6 fondo-arcoiris hover:scale-110 transition duration-[0.5s] rounded-full cursor-pointer hover:shadow-[0_0_10px_3px_#000000]'>Volver</div>
                </Link>
            </div>

        </>
    );
};

export default VerResultado;
