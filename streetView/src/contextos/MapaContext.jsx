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
          puntuacion_total: 0,
        };
  });
  const [avatares, setAvatares] = useState(() => {
    const storedAvatares = sessionStorage.getItem("avatares");
    return storedAvatares ? JSON.parse(storedAvatares) : {};
  })
  

  const [ajustes, setAjustes] = useState({
    sonido: false,
    cancion: 0,
    tipografia: 'font-osaka',
    pos_marker1: {
      left: 270,
      top: 254
    },
    pos_marker2: {
      left: 470,
      top: 389
    },
    pos_marker3: {
      left: 713,
      top: 299
    },
    pos_marker4: {
      left: 936,
      top: 202
    },
    pos_marker5: {
      left: 1150,
      top: 321
    },
    width_marker: 60
  })


  // Guardar en sessionStorage cada vez que el usuario cambia
  useEffect(() => {
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
  }, [usuario]);

  return (
    <MapaContext.Provider value={{
      configuracionPartida,
      setConfiguracionPartida,
      usuario,
      setUsuario,
      avatares,
      setAvatares,
      ajustes,
      setAjustes
    }}>
      {children}
    </MapaContext.Provider>
  );
};
