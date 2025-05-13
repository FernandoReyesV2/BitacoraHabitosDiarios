import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

function Registro() {
  const [form, setForm] = useState({
    titulo: '',
    email: '',
    descripcion: '',
    fecha: '',
    categoria: ''
  });

  const [errores, setErrores] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const categorias = ['Salud', 'Trabajo', 'Estudio', 'Ejercicio', 'Personal']; // Editable

  // Fecha por defecto al montar el componente
  useEffect(() => {
    const hoy = new Date().toISOString().split('T')[0];
    setForm(f => ({ ...f, fecha: hoy }));
  }, []);

  const validar = (nombre, valor) => {
    let error = '';

    switch (nombre) {
      case 'titulo':
        if (!/^[A-ZÁÉÍÓÚÑa-záéíóúñ\s]{3,40}$/.test(valor.trim())) {
          error = 'El título debe tener entre 3 y 40 letras, sin números.';
        }
        break;
      case 'email':
        if (!/^\S+@\S+\.\S+$/.test(valor.trim())) {
          error = 'Email no válido.';
        }
        break;
      case 'descripcion':
        if (!/^[\w\sáéíóúÁÉÍÓÚñÑ.,;:()!?¿¡-]{3,400}$/.test(valor.trim())) {
          error = 'La descripción debe tener entre 3 y 400 caracteres.';
        }
        break;
      case 'fecha':
        const hoy = new Date().toISOString().split('T')[0];
        if (valor > hoy) {
          error = 'No puedes seleccionar una fecha futura.';
        }
        break;
      default:
        break;
    }

    setErrores(prev => ({ ...prev, [nombre]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validar(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todo antes de enviar
    Object.keys(form).forEach((key) => validar(key, form[key]));

    // Verificar si hay errores activos
    const tieneErrores = Object.values(errores).some(e => e);
    const camposVacios = Object.values(form).some(v => v.trim() === '');
    if (tieneErrores || camposVacios) {
      return;
    }

    try {
    const formParaEnviar = {
      ...form,
      titulo: form.titulo.toUpperCase().trim()
    };

    await axios.post('http://localhost:3001/registros', formParaEnviar);
    setModalVisible(true);
    setForm({
      titulo: '',
      email: '',
      descripcion: '',
      fecha: new Date().toISOString().split('T')[0],
      categoria: ''
    });
  } catch (error) {
    alert('Error al guardar el registro');
  }
};

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Registrar hábito</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Título */}
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
              <input
                id="titulo"
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Título del hábito"
              />
              {errores.titulo && <p className="text-red-500 text-sm">{errores.titulo}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="tu@correo.com"
              />
              {errores.email && <p className="text-red-500 text-sm">{errores.email}</p>}
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Describe el hábito"
              />
              {errores.descripcion && <p className="text-red-500 text-sm">{errores.descripcion}</p>}
            </div>

            {/* Fecha */}
            <div>
              <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
              <input
                id="fecha"
                name="fecha"
                type="date"
                value={form.fecha}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errores.fecha && <p className="text-red-500 text-sm">{errores.fecha}</p>}
            </div>

            {/* Categoría */}
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoría</label>
              <select
                id="categoria"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Botón */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Registro guardado</h3>
            <p className="text-gray-600 mb-4">El hábito se ha registrado exitosamente.</p>
            <button
              onClick={() => setModalVisible(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Registro;
