import { useEffect, useState } from 'react';
import axios from 'axios';

const colorPorCategoria = {
  salud: 'bg-green-200',
  trabajo: 'bg-yellow-200',
  estudio: 'bg-blue-200',
  ejercicio: 'bg-purple-200',
  personal: 'bg-gray-200'
};

function Habitos() {
  const [registros, setRegistros] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  useEffect(() => {
    const obtenerRegistros = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No se ha encontrado un token de autenticación.");

        const res = await axios.get('http://localhost:3001/registros', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setRegistros(res.data);
      } catch (err) {
        console.error('Error al obtener los registros:', err);
      }
    };

    obtenerRegistros();
  }, []);

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;
  };

  const registrosFiltrados = registros.filter((registro) => {
    const coincideTitulo = registro.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === '' || registro.categoria?.toLowerCase() === categoriaSeleccionada;
    return coincideTitulo && coincideCategoria;
  });

  return (
    <div className='bg-gray-50 flex justify-center items-center'>
      <div className="p-8 bg-white pb-20 max-w-screen-2xl shadow-lg rounded-lg w-full">

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2"
          />

          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2"
          >
            <option value="">Todas las categorías</option>
            {Object.keys(colorPorCategoria).map((cat) => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-center max-w-screen-xl mx-auto">
          {registrosFiltrados.map((registro, index) => (
            <div
              key={index}
              className={`relative h-64 rounded-lg shadow-md transition-all duration-300 overflow-hidden p-4 flex flex-col justify-center
                ${colorPorCategoria[registro.categoria?.toLowerCase()] || 'bg-white'}`}
            >
              <div className="absolute top-2 right-4 text-sm text-gray-600 font-medium">
                {formatearFecha(registro.fecha)}
              </div>
              <h2 className="text-2xl font-semibold text-center">{registro.titulo}</h2>
              <p className="mt-4 text-gray-700 text-center text-xl">{registro.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Habitos;
