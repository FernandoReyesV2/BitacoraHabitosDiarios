import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import Habitos from '../components/Habitos';

function Registro() {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    categoria: ''
  });

  const [errores, setErrores] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const categorias = ['Salud', 'Trabajo', 'Estudio', 'Ejercicio', 'Personal'];
  const userId = localStorage.getItem('userId');

  const token = localStorage.getItem('token');

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

    Object.keys(form).forEach((key) => validar(key, form[key]));

    const tieneErrores = Object.values(errores).some(e => e);
    const camposVacios = Object.values(form).some(v => v.trim() === '');
    if (tieneErrores || camposVacios) {
      return;
    }

    try {
      const formParaEnviar = {
        ...form,
        titulo: form.titulo.toUpperCase().trim(),
        userId: userId
      };

      const token = localStorage.getItem('token');

 
      await axios.post('http://localhost:3001/registros', formParaEnviar, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setModalVisible(true);
      setForm({
        titulo: '',
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
      <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Registrar hábito</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

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

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                style={{ resize: 'none' }}
                rows="4"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Describe el hábito"
              />
              {errores.descripcion && <p className="text-red-500 text-sm">{errores.descripcion}</p>}
            </div>

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
      <Habitos />
    </>
  );
}

export default Registro;
