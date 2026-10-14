import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../../pages/Login.jsx';
import Inicio from '../../pages/Inicio.jsx';
import Solicitudes from '../../pages/Solicitudes.jsx';
import Inspecciones from '../../pages/Inspecciones.jsx';
import Imbornales from '../../pages/Imbornales.jsx';
import Desagotes from '../../pages/Desagotes.jsx';
import NoEncontrada from '../../pages/NoEncontrada.jsx';
import Mantenimiento from '../../pages/Mantenimiento.jsx';
import Registro from '../../pages/Registro.jsx';

export default function Rutas({ datos }) {
  const location = useLocation();
  if (location.pathname.endsWith('/') && location.pathname.length > 1) {
    return <NoEncontrada />;
  }
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/inicio" element={<Inicio datos={datos} />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/solicitudes" element={<Solicitudes datos={datos} />} />
      <Route path="/inspecciones" element={<Inspecciones datos={datos} />} />
      <Route path="/imbornales" element={<Imbornales datos={datos} />} />
      <Route path="/desagotes" element={<Desagotes datos={datos} />} />
      <Route path="*" element={<NoEncontrada />} />
      <Route path="/404" element={<NoEncontrada />} />
      <Route path="/mantenimiento" element={<Mantenimiento />} />
    </Routes>
  );
}