import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido1: '',
        apellido2: '',
        email: '',
        username: '',
        password: '',
        avatar: '',
        codigo: 0
    });
    const [campoError, setCampoError] = useState({});

    const validateField = async (name, value) => {

        let error = '';

        if (name != 'avatar') {


            if ((typeof value === 'string' && !value.trim()) && name !== 'apellido2') {
                return error = 'Este campo es obligatorio';
            }

            if (name === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const emailExists = await checkRepeatValue(name, value);
                console.log(emailExists)
                if (emailExists) {
                    error = 'El email ya está en uso';
                    return error;
                }
                if (!emailRegex.test(value)) {
                    error = 'Correo inválido';
                }
            }

            if (name === 'username') {
                const usernameExists = await checkRepeatValue(name, value);
                if (usernameExists) {
                    error = 'El nombre de usuario ya está en uso';
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
        }
    };


    const handleChange = (e) => {
        const { name, value, files, type } = e.target;

        if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value.trim() }));
        }
    };

    const validateData = async (e) => {
        const { name, value } = e.target;
        const error = await validateField(name, value);

        setCampoError({
            [name]: error
        });
    }

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

    const handleBlur = async (e) => {
        await validateData(e);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validateAllFields();
        if (!isValid) return;


        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        try {
            const response = await fetch('http://localhost:3000/guesswhere/usuario/', {
                method: 'POST',
                body: data // no pongas headers aquí, fetch los asigna automáticamente
            });

            const result = await response.json();
            if (!response.ok) {
                setCampoError({ general: result.error || "Error desconocido" });
            } else {
                alert("Registro exitoso");
                console.log(result);
            }
        } catch (err) {
            setCampoError({ general: "Error de conexión con el servidor" });
        }
    };


    return (
        <div className="w-full h-screen flex justify-center items-center fondo-mapa">
            <div className='flex flex-col justify-center items-center w-[600px] h-[650px] bg-gray-100 bg-opacity-30 backdrop-blur-sm p-4 rounded-lg shadow-lg fadeUp borde-arcoiris'>
                <h1 className='text-5xl mb-10 letras-arcoiris w-full text-center'>GuessWhere</h1>
                <div className=''>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 w-full max-w-md">
                        <label htmlFor="nombre" className="text-[#171717bd] font-semibold flex items-center">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="text-[#171717bd] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white bg-opacity-80"
                        />
                        {campoError.nombre && <p className="text-sm text-red-500 col-span-2 bg-[#303030]">{campoError.nombre}</p>}

                        <label htmlFor="apellido1" className="text-[#171717bd] font-semibold  flex items-center">Primer Apellido</label>
                        <input
                            type="text"
                            id="apellido1"
                            name="apellido1"
                            value={formData.apellido1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="text-[#171717bd] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white bg-opacity-80"
                        />
                        {campoError.apellido1 && <p className="text-sm text-red-500 col-span-2 bg-[#303030]">{campoError.apellido1}</p>}

                        <label htmlFor="apellido2" className="text-[#171717bd] font-semibold  flex items-center">Segundo Apellido</label>
                        <input
                            type="text"
                            id="apellido2"
                            name="apellido2"
                            value={formData.apellido2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="text-[#171717bd] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white bg-opacity-80"
                        />
                        {campoError.apellido2 && <p className="text-sm text-red-500 col-span-2 bg-[#303030]">{campoError.apellido2}</p>}

                        <label htmlFor="email" className="text-[#171717bd] font-semibold  flex items-center">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="text-[#171717bd] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white bg-opacity-80"
                        />
                        {campoError.email && <p className="text-sm text-red-500 col-span-2 bg-[#303030]">{campoError.email}</p>}

                        <label htmlFor="username" className="text-[#171717bd] font-semibold  flex items-center">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="text-[#171717bd] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white bg-opacity-80"
                        />
                        {campoError.username && <p className="text-sm text-red-500 col-span-2 bg-[#303030]">{campoError.username}</p>}

                        <label htmlFor="password" className="text-[#171717bd] font-semibold  flex items-center">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            minLength={8}
                            maxLength={20}
                            value={formData.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className="text-[#171717bd] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white bg-opacity-80"
                        />
                        {campoError.password && <p className="text-sm text-red-500 col-span-2 bg-[#303030]">{campoError.password}</p>}


                        <label htmlFor="avatar" className="text-[#171717bd] font-semibold  flex items-center">Avatar</label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept='image/*'
                            onChange={handleChange}
                            className="text-[#171717bd] text-[15px] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                        />

                        <div className='col-span-2 flex items-center justify-center mt-4 gap-4'>

                            <button
                                type="submit"
                                className="cursor-pointer px-[24px] py-[12px] fondo-arcoiris rounded-full transition-all border-none w-1/2 text-[#171717bd]"
                            >
                                Registrarse
                            </button>
                            <div
                                className='cursor-pointer px-[24px] py-[12px] fondo-arcoiris rounded-full transition-all border-none w-1/2 hover:scale-105'>
                                <Link
                                    to="/"
                                >
                                    <p className='w-full h-full text-[#171717bd]'>Volver</p>

                                </Link>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};


export default Register;
