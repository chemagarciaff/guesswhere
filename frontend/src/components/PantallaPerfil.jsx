import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapaContext } from '../contextos/MapaContext';
import { useMemo } from 'react';


const PantallaPerfil = () => {
  const { usuario, setUsuario, avatares } = useContext(MapaContext);
  const [avatar, setAvatar] = useState(null);
  const [partidasJugadas, setPartidasJugadas] = useState([]);
  const [ubicacionesFavoritas, setUbicacionesFavoritas] = useState([]);
  const [mostrar, setMostrar] = useState({
    datosPersonales: true,
    ubicacionesFavoritas: false,
    partidasJugadas: false,
  })
  const fileInputRef = useRef(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedPartidas = [...partidasJugadas].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    // Convertir a número si es posible
    valA = isNaN(valA) ? valA : Number(valA);
    valB = isNaN(valB) ? valB : Number(valB);

    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const [formData, setFormData] = useState({
    nombre: usuario.nombre,
    apellido1: usuario.apellido1,
    apellido2: usuario.apellido2,
    username: usuario.username,
    email: usuario.email,
  });

  const cambiosPendientes = useMemo(() => {
    return (
      formData.nombre !== usuario.nombre ||
      formData.apellido1 !== usuario.apellido1 ||
      formData.apellido2 !== usuario.apellido2 ||
      formData.username !== usuario.username ||
      formData.email !== usuario.email
    );
  }, [formData, usuario]);


  const [campoError, setCampoError] = useState({});

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateData = async (e) => {
    const { name, value } = e.target;
    const error = await validateField(name, value);

    setCampoError({
      [name]: error
    });
  }

  const handleBlur = async (e) => {
    await validateData(e);
  };


  const validateField = async (name, value) => {

    let error = '';

    if (name != 'avatar') {


      if ((typeof value === 'string' && !value.trim()) && name !== 'apellido2') {
        return error = 'Este campo es obligatorio';
      }

      if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = 'Correo inválido';
        }
        if (formData.email !== usuario.email) {

          const emailExists = await checkRepeatValue(name, value);
          if (emailExists) {
            error = 'El email ya está en uso';
            return error;
          }
        }
      }

      if (name === 'username') {
        const usernameRegex = /^[a-zA-Z0-9._-]+$/;
        if (!usernameRegex.test(value)) {
          error = 'Solo letras, números, guiones y puntos';
        }
        if (formData.username !== usuario.username) {

          const usernameExists = await checkRepeatValue(name, value);
          if (usernameExists) {
            error = 'El nombre de usuario ya está en uso';
            return error;
          }
        }
      }

      if (name === 'password') {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(value)) {
          error = 'Mínimo 8 caracteres, una mayúscula, un número y un símbolo';
        }
      }

      return error;
    }
  };

  const checkRepeatValue = async (name, value) => {
    try {
      const res = await fetch(`http://localhost:3000/guesswhere/usuario/${name}/${value}`);
      const data = await res.json();
      return data
    } catch {
      return false;
    }
  };

  const validateAllFields = async () => {
    const newErrors = {};

    for (const [key, value] of Object.entries(formData)) {
      const error = await validateField(key, value);
      if (error) {
        setCampoError({ [key]: error });
        return false;
      }
    }

    setCampoError(newErrors);
    return Object.keys(newErrors).length === 0; // true si no hay errores
  };


  const getPartidasJugadas = async () => {
    const response = await fetch(`http://localhost:3000/guesswhere/partida/jugador/${usuario.id_jugador}`);
    if (!response.ok) {
      console.error("Error fetching partidas jugadas:", response.statusText);
      return;
    }
    const data = await response.json()
    setPartidasJugadas(data)
  }

  const getUbicacionesFaavoritas = async () => {
    const response = await fetch(`http://localhost:3000/guesswhere/favorito/id/${usuario.id_jugador}`);
    if (!response.ok) {
      console.error("Error fetching partidas jugadas:", response.statusText);
      return;
    }
    const data = await response.json()
    setUbicacionesFavoritas(data)
  }

  useEffect(() => {
    getPartidasJugadas()
    getUbicacionesFaavoritas()
  }, [])

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // para mostrar el blob
      setFormData(prev => ({ ...prev, avatar: file })); // para enviar al servidor
    }
  };

  const fetchAvatar = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/guesswhere/usuario/avatar/${id}`);
      if (!response.ok) throw new Error('Error al cargar avatar');

      // La respuesta es JSON, no imagen binaria directa
      const json = await response.json();

      // Extraemos el array de bytes (asegúrate que la estructura coincida)
      const byteArray = new Uint8Array(json.avatar.data);

      // Creamos el Blob
      const blob = new Blob([byteArray], { type: 'image/png' });

      // Generamos la URL para el blob
      const url = URL.createObjectURL(blob);

      return url
    } catch (error) {
      console.error('Error al cargar avatar:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateAllFields();
    if (!isValid) return;

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await fetch(`http://localhost:3000/guesswhere/usuario/${usuario.id_jugador}`, {
        method: 'PATCH',
        body: data // no pongas headers aquí, fetch los asigna automáticamente
      });

      const result = await response.json();
      if (!response.ok) {
        setCampoError({ general: result.error || "Error desconocido" });
      } else {
        alert("Cambios realizados");
        setUsuario(prev => ({ ...prev, ...result }))
      }
    } catch (err) {
      setCampoError({ general: "Error de conexión con el servidor" });
    }
  };


  let navigate = useNavigate()
  const handleRight = () => {
    navigate('/ajustes')
  }
  const handleLeft = () => {
    navigate('/amigos')
  }

  return (
    <div className=" w-full min-h-screen relative top-0 left-0 fondo-mapa flex flex-col items-center justify-start pt-[110px] gap-8">

      <p className="text-5xl letras-arcoiris w-fit absolute top-7 left-1/2 -translate-x-1/2">Perfil</p>

      <div className="px-4 md:px-8 xl:px-16 gap-10 flex flex-col min-h-0 overflow-hidden w-full pb-4">

        {/* Opciones arriba */}
        <div className='flex gap-8 justify-center'>
          <div className={`text-[#171717bd] cursor-pointer px-[24px] py-[12px] fondo-arcoiris rounded-full transition-all ${mostrar.datosPersonales ? 'scale-110' : ''}`} onClick={() => setMostrar({ datosPersonales: true, ubicacionesFavoritas: false, partidasJugadas: false })}>
            Mis datos personales
          </div>
          <div className={`text-[#171717bd] cursor-pointer px-[24px] py-[12px] fondo-arcoiris rounded-full transition-all ${mostrar.ubicacionesFavoritas ? 'scale-110' : ''}`} onClick={() => setMostrar({ datosPersonales: false, ubicacionesFavoritas: true, partidasJugadas: false })}>
            Ubicaciones favoritas
          </div>
          <div className={`text-[#171717bd] cursor-pointer px-[24px] py-[12px] fondo-arcoiris rounded-full transition-all ${mostrar.partidasJugadas ? 'scale-110' : ''}`} onClick={() => setMostrar({ datosPersonales: false, ubicacionesFavoritas: false, partidasJugadas: true })}>
            Partidas jugadas
          </div>
        </div>

        {/* Contenido dinámico */}
        <div className="flex-1 bg-gray-100 bg-opacity-30 backdrop-blur-sm p-6 rounded-lg shadow-lg fadeUp borde-arcoiris">

          {mostrar.datosPersonales && (
            <div className="h-full overflow-auto p-4">
              <form className="flex flex-wrap items-center gap-12 justify-center " onSubmit={handleSubmit}>
                {/* Avatar */}
                <div className="w-[300px] h-[300px] border rounded-md overflow-hidden shadow-md flex items-center justify-center">
                  <img
                    src={avatar || avatares[usuario.id_jugador] || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                    alt="avatar"
                    className="object-cover w-full h-full cursor-pointer"
                  // onClick={handleAvatarClick}
                  />
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    className="hidden text-white"
                  />
                </div>

                {/* Formulario en dos columnas */}
                <div className="min-w-[500px] rounded-md p-4 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4 text-lg">
                    <label className="text-sm font-semibold flex flex-col">
                      Nombre
                      <input
                        name='nombre'
                        type="text" value={formData.nombre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="p-2 text-white"
                      />
                    </label>
                    {campoError.nombre && <p className="text-sm text-red-500 col-span-2 bg-[#303030]">{campoError.nombre}</p>}

                    <label className="text-sm font-semibold flex flex-col">
                      Primer Apellido
                      <input
                        name='apellido1'
                        type="text" value={formData.apellido1}
                        onChange={handleChange}
                        onBlur={handleBlur}

                        className="p-2 text-white"
                      />
                    </label>
                    {campoError.apellido1 && <p className="text-sm text-red-500 col-span-2 bg-[#303030]">{campoError.apellido1}</p>}

                    <label className="text-sm font-semibold flex flex-col">
                      Segundo Apellido
                      <input
                        name='apellido2'
                        type="text" value={formData.apellido2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="p-2 text-white"
                      />
                    </label>
                    {campoError.apellido2 && <p className="text-sm text-red-500 col-span-2 bg-[#303030]">{campoError.apellido2}</p>}

                    <label className="text-sm font-semibold flex flex-col">
                      Username
                      <input
                        type="text"
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="p-2 text-white"
                      />
                    </label>
                    {campoError.username && <p className="text-sm text-red-500 col-span-2 bg-[#303030]">{campoError.username}</p>}

                    <label className="text-sm font-semibold flex flex-col col-span-2">
                      Email
                      <input
                        type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="p-2 text-white"
                      />
                    </label>
                    {campoError.email && <p className="text-sm text-red-500 col-span-2 bg-[#303030]">{campoError.email}</p>}

                  </div>

                  {/* Botón */}
                  <button
                    type="submit"
                    disabled={!cambiosPendientes}
                    className={`mt-4 cursor-pointer border-none px-[24px] py-[12px] fondo-arcoiris rounded-full transition-all ${!cambiosPendientes ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>

          )}

          {mostrar.ubicacionesFavoritas && (
            <div className="h-full overflow-auto p-2 scroll-invisible">
              <table className='w-full text-sm'>
                <thead className='border-b'>
                  <tr className='text-lg text-[#171717bd]'>
                    <th className='text-lg pb-3'>País</th>
                    <th className='text-lg pb-3'>Contienente</th>
                    <th className='text-lg pb-3'>Coordenadas (latitud, longitud)</th>
                    <th className='text-lg pb-3'>Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {ubicacionesFavoritas.map((ubicacion, index) => {
                    return (
                      <tr key={index} className="border-b text-md">
                        <td className=' py-2'>{ubicacion.pais}</td>
                        <td className=' py-2'>{ubicacion.continente}</td>
                        <td className=' py-2'>{ubicacion.latitud} / {ubicacion.longitud}</td>
                        <td className=' py-2'>
                          <Link
                            to="/verFavorito"
                            state={{
                              latitud: ubicacion.latitud,
                              longitud: ubicacion.longitud
                            }}
                          >
                            <div className="underline hover:text-gray-400">Ver ubicación</div>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}

                </tbody>
              </table>
            </div>
          )}

          {mostrar.partidasJugadas && (
            <div className=' p-2 '>
              <table className='w-full text-sm'>
                <thead className='border-b'>
                  <tr className='text-lg text-[#171717bd]'>
                    <th className='text-lg py-2 cursor-pointer' onClick={() => handleSort('puntuacion')}>
                      Puntuación
                    </th>
                    <th className='text-lg py-2 cursor-pointer' onClick={() => handleSort('desplazamiento')}>
                      Distancia (km)
                    </th>
                    <th className='text-lg py-2 cursor-pointer' onClick={() => handleSort('tiempo')}>
                      Tiempo (s)
                    </th>
                    <th className='text-lg py-2 cursor-pointer' onClick={() => handleSort('nombre')}>
                      Categoría
                    </th>
                    <th className='text-lg py-2'>Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPartidas.map((partida, index) => {
                    const latObjetivo = Number(partida.latitud);
                    const lonObjetivo = Number(partida.longitud);
                    const [latMarcada, lonMarcada] = partida.ubicacion_marcada
                      .split(',')
                      .map(coord => Number(coord.trim()));

                    return (
                      <tr key={index} className="border-b text-md">
                        <td className='py-2'>{partida.puntuacion}</td>
                        <td className='py-2'>{partida.desplazamiento}</td>
                        <td className='py-2'>{partida.tiempo}</td>
                        <td className='py-2'>{partida.nombre}</td>
                        <td className='py-2'>
                          <Link
                            to="/verResultado"
                            state={{ latObjetivo, lonObjetivo, latMarcada, lonMarcada }}
                          >
                            <div className="underline hover:text-gray-400">Ver resultado</div>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

      <div className="text-center absolute top-7 left-7">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32" className=' hover:scale-125 transition-all duration-300 cursor-pointer' onClick={() => (navigate("/inicio"))}><path fill='#FFBD54' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
      </div>
    </div >
  )
}

export default PantallaPerfil
