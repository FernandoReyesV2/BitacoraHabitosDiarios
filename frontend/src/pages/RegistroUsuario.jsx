import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar';


function RegistroUsuario() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); // 👈 para redirigir

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    if (form.username.trim() === '' || form.password.trim() === '') {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    try {
      await axios.post('http://localhost:3001/register', form);
      setMensaje('Usuario registrado con éxito');
      setTimeout(() => navigate('/login'), 1500); // 👈 redirige tras 1.5s
    } catch (err) {
      setMensaje(err.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">Registro</h2>

        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Usuario"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-200"
        >
          Registrar
        </button>

        {mensaje && (
          <p className="mt-3 text-sm text-center text-green-600">{mensaje}</p>
        )}

        <div className="text-center">
          <span className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              Iniciar sesión
            </a>
          </span>
        </div>
      </form>
    </div>
    </>
  );
}

export default RegistroUsuario;
