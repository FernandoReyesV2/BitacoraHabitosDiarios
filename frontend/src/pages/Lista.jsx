import { useEffect, useState } from 'react';
import axios from 'axios';

function Lista() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/registros')
      .then(res => setRegistros(res.data))
      .catch(() => alert('Error al obtener registros'));
  }, []);

  return (
    <div>
      <h2>Lista de hábitos registrados</h2>
      <ul>
        {registros.map((r, i) => (
          <li key={i}>
            <strong>{r.nombre}</strong> - {r.email} - {r.descripcion} - {r.fecha} - {r.categoria}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lista;
