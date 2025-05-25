import React, { createContext, useState, useEffect } from 'react';

export const MapaContext = createContext();

export const MapaProvider = ({ children }) => {
  const [configuracionPartida, setConfiguracionPartida] = useState({
    tiempo: 10,
    categoria: 9,
    puntos: 0,
    idUbicacion: '',
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

  const [usuario, setUsuario] = useState(() => {
    const storedUser = sessionStorage.getItem("usuario");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          id: 0,
          nombre: '',
          apellido1: '',
          apellido2: '',
          email: '',
          username: '',
          nivel: 0,
          puntuacion_total: 0,
          privacidad: 0
        };
  });

  // Guardar en sessionStorage cada vez que el usuario cambia
  useEffect(() => {
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
  }, [usuario]);

  return (
    <MapaContext.Provider value={{
      configuracionPartida,
      setConfiguracionPartida,
      usuario,
      setUsuario
    }}>
      {children}
    </MapaContext.Provider>
  );
};
