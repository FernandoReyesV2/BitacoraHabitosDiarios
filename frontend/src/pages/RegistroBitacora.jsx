import { useState } from 'react';
import axios from 'axios';

function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    descripcion: '',
    fecha: '',
    categoria: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (Object.values(form).some(v => v.trim() === '')) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/registros', form);
      alert('Registro guardado con éxito');
      setForm({ nombre: '', email: '', descripcion: '', fecha: '', categoria: '' });
    } catch (error) {
      alert('Error al guardar el registro');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar hábito</h2>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />
      <input name="fecha" type="date" value={form.fecha} onChange={handleChange} />
      <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoría" />
      <button type="submit">Guardar</button>
    </form>
  );
}

export default Registro;
