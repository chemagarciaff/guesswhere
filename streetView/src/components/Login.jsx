import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapaContext } from '../contextos/MapaContext';

const Login = () => {
    const { setUsuario, avatares, setAvatares } = useContext(MapaContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const [campoError, setCampoError] = useState({});

    useEffect(() => {
        getAvatares();
    }, []);

    const getAvatares = async () => {
        try {
            const response = await fetch('http://localhost:3000/guesswhere/usuario/todos');
            if (!response.ok) throw new Error('Error al cargar usuarios');

            const data = await response.json();

            const avataresObj = {};

            for (const usuario of data) {
                try {
                    const avatarResponse = await fetch(`http://localhost:3000/guesswhere/usuario/avatar/${usuario.id_jugador}`);
                    if (!avatarResponse.ok) throw new Error('Error al cargar avatar');

                    const avatarJson = await avatarResponse.json();
                    const byteArray = new Uint8Array(avatarJson.avatar.data);
                    const blob = new Blob([byteArray], { type: 'image/png' });
                    const url = URL.createObjectURL(blob);

                    avataresObj[usuario.id_jugador] = url;
                } catch (error) {
                    console.error(`Error avatar usuario ${usuario.id_jugador}:`, error);
                    avataresObj[usuario.id_jugador] = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
                }
            }
            console.log(avataresObj)

            // Guardamos en el contexto
            setAvatares(avataresObj);
        } catch (error) {
            console.error('Error general al cargar avatares:', error);
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



    const checkRepeatValue = async (name, value) => {
        try {
            const res = await fetch(`http://localhost:3000/guesswhere/usuario/${name}/${value}`);
            const data = await res.json();
            return data
        } catch {
            return false;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value.trim() }));
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


    const validateField = async (name, value) => {

        let error = '';

        if ((!value.trim())) {
            return error = 'Este campo es obligatorio';
        }

        if (name === 'username') {
            const usernameExists = await checkRepeatValue(name, value);
            if (!usernameExists) {
                error = 'El usuario no existe';
                return error;
            }
            const usernameRegex = /^[a-zA-Z0-9._-]+$/;
            if (!usernameRegex.test(value)) {
                error = 'Solo letras, números, guiones y puntos';
            }
        }

        if (name === 'password') {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordRegex.test(value)) {
                error = 'Mínimo 8 caracteres, una mayúscula, un número y un símbolo';
            }
        }

        return error;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validateAllFields();

        if (!isValid) return;

        try {
            const { username, password } = formData;
            const response = await fetch('http://localhost:3000/guesswhere/usuario/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            console.log(data.token)

            if (!response.ok) {

                setError(data.error || "Error desconocido");

            } else {
                const { avatar: avatarData, ...usuarioSinAvatar } = data.usuario;

                const avatarUrl = await fetchAvatar(data.usuario.id_jugador);

                const usuarioCompleto = {
                    ...data.usuario,
                    avatar: avatarUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                };

                setUsuario(usuarioCompleto);
                sessionStorage.setItem('usuario', JSON.stringify(usuarioSinAvatar));
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('avatares', JSON.stringify(avatares));

                navigate('/inicio');
            }
        } catch (err) {

            setError("Error de conexión con el servidor");

        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center fondo-mapa">
            <div className='flex flex-col justify-center items-center w-[600px] h-[500px] bg-gray-100 bg-opacity-30 backdrop-blur-sm p-4 rounded-lg shadow-lg borde-arcoiris fadeUp'>
                <h1 className='text-5xl mb-10'>GuessWhere</h1>
                <div className=''>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 w-full max-w-md">

                        <label htmlFor="username" className="text-gray-800 font-semibold  flex items-center">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white bg-opacity-80"
                        />
                        {campoError.username && <p className="text-sm text-red-500 col-span-2 bg-[#303030]">{campoError.username}</p>}

                        <label htmlFor="password" className="text-gray-800 font-semibold  flex items-center">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white bg-opacity-80"
                        />
                        {campoError.password && <p className="text-sm text-red-500 col-span-2 bg-[#303030]">{campoError.password}</p>}

                        <div className='col-span-2 flex items-center justify-center mt-4 gap-4'>

                            <button
                                type="submit"
                                className="bg-gris hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                            >
                                Acceder
                            </button>
                            <div
                                className='bg-gris hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 w-1/2'>
                                <Link
                                    to="/register"
                                >
                                    <p className='w-full h-full'>Registro</p>

                                </Link>
                            </div>
                        </div>
                        {error && <p className="text-red-600 col-span-2 text-center mt-2">{error}</p>}

                    </form>

                </div>
            </div>
        </div>
    );

    // return (
    //     <div className='login-container'>
    //         <div className='login-info'>
    //             <h1 className='titulo'>GuessWhere</h1>
    //             <div className='login-form'>
    //                 <form onSubmit={handleSubmit}>
    //                     <label htmlFor="username">Usuario</label>
    //                     <input type="text" id="username" name="username" required value={formData.username} onChange={(e) => setFormData((prev) => {
    //                         return { ...prev, username: e.target.value }
    //                     })} />
    //                     <label htmlFor="password">Contraseña</label>
    //                     <input type="password" id="password" name="password" required value={formData.password} onChange={(e) => setFormData((prev) => {
    //                         return { ...prev, password: e.target.value }
    //                     })} />
    //                     {error && <p className="error">{error}</p>}
    //                     <button type="submit">Iniciar sesión</button>
    //                     <button type="submit"><Link to={"/register"}>Ir a Registro</Link></button>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default Login;
