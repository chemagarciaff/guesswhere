import React, { createContext, useState } from 'react';

// Crear el contexto
export const MapaContext = createContext();

// Crear el provider
export const MapaProvider = ({ children }) => {

  const [configuracionPartida, setConfiguracionPartida] = useState({
    tiempo: 10,
    categoria: 'libre',
    puntos: 0,
    coordenadasSeleccionada: {
      lat: 0,
      lon: 0,
    },
    coordenadasObjetivo: {
      lat: 39.922753548606686,
      lon: 32.86049640434456
    },
    distancia: 0
  });



  return (
    <MapaContext.Provider value={{
      configuracionPartida,
      setConfiguracionPartida
    }}>
      {children}
    </MapaContext.Provider>
  );
};
