import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../style/login.css';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido1: '',
        apellido2: '',
        email: '',
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const checkExists = async (field, value) => {
        try {
            const res = await fetch(`http://localhost:3000/guesswhere/usuario/${value}`);
            return res.ok; // Si existe, la API devuelve 200
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // const usernameExists = await checkExists('username', formData.username);
        // if (usernameExists) {
        //     setError('El nombre de usuario ya está en uso');
        //     return;
        // }

        // const emailExists = await checkExists('email', formData.email);
        // if (emailExists) {
        //     setError('El correo electrónico ya está en uso');
        //     return;
        // }

        try {
            const response = await fetch('http://localhost:3000/guesswhere/usuario/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData})
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.error || "Error desconocido");
            } else {
                alert("Registro exitoso");
                console.log(data);
                // Redirigir o guardar usuario globalmente
            }
        } catch (err) {
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <div className='login-container'>
            <div className='login-info'>
                <h1 className='titulo'>Registro<br></br>GuessWhere</h1>
                <div className='login-form'>
                    <form onSubmit={handleSubmit}  className='form'>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" required value={formData.nombre} onChange={handleChange} />

                        <label htmlFor="apellido1">Primer Apellido</label>
                        <input type="text" id="apellido1" name="apellido1" required value={formData.apellido1} onChange={handleChange} />

                        <label htmlFor="apellido2">Segundo Apellido</label>
                        <input type="text" id="apellido2" name="apellido2" value={formData.apellido2} onChange={handleChange} />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />

                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            minLength={8}
                            maxLength={20}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                            title="Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        {error && <p className="error">{error}</p>}
                        <button type="submit">Registrarse</button>
                        <button type="submit"><Link to={"/"}>Volver a Login</Link></button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
