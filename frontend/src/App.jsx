import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import RegistroBitacora from './pages/RegistroBitacora'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/bitacoras" element={<RegistroBitacora />} />
      </Routes>
    </Router>
  );
}

export default App;
