import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import RegistroBitacora from './pages/RegistroBitacora';
import Login from './pages/Login';
import Registro from './pages/RegistroUsuario';
import PrivateRoute from './PrivateRoute'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/bitacoras"
          element={
            <PrivateRoute>
              <RegistroBitacora />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
