import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../style/login.css';
import { MapaContext } from '../contextos/MapaContext';

const Login = () => {
    const { setUsuario } = useContext(MapaContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { username, password } = formData;
            const response = await fetch('http://localhost:3000/guesswhere/usuario/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {

                setError(data.error || "Error desconocido");

            } else {
                setUsuario(data.usuario);

                sessionStorage.setItem('usuario', JSON.stringify(data.usuario));

                navigate('/inicio');
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
                        <input type="text" id="username" name="username" required value={formData.username} onChange={(e) => setFormData((prev) => {
                            return { ...prev, username: e.target.value }
                        })} />
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" required value={formData.password} onChange={(e) => setFormData((prev) => {
                            return { ...prev, password: e.target.value }
                        })} />
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
