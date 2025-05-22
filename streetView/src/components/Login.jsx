import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../style/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            console.log(username, password);
            const response = await fetch('http://localhost:3000/guesswhere/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Error desconocido");
            } else {
                alert("Login exitoso");
                console.log(data);
                // Aquí puedes redirigir o guardar el usuario en estado global
            }
        } catch (err) {
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <div className='login-container'>
            <div className='login-info'>
                <h1 className='titulo'>GuessWhere</h1>
                <div className='login-form'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Usuario</label>
                        <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        {error && <p className="error">{error}</p>}
                        <button type="submit">Iniciar sesión</button>
                        <button type="submit"><Link to={"/register"}>Ir a Registro</Link></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
