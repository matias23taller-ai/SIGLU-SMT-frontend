import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import usuariosURL from '../data/Usuarios.json?url&no-inline';

export default function Login() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const respuesta = await axios.get(usuariosURL);
        setUsuarios(respuesta.data);
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudieron cargar los usuarios.', 'error');
      }
    }

    cargarUsuarios();
  }, []);

  const manejarIngreso = (e) => {
    e.preventDefault();

    if (usuarios.length === 0) {
      Swal.fire('Aviso', 'Los usuarios todavía no están disponibles.', 'info');
      return;
    }

    const formulario = e.currentTarget;
    const legajo = formulario.querySelector('input[type="text"]').value.trim();
    const password = formulario.querySelector('input[type="password"]').value;

    const usuario = usuarios.find((usuario) =>
      usuario.legajo === legajo && usuario.password === password
    );

    if (usuario) {
      navigate('/inicio');
    } else {
      Swal.fire('Datos incorrectos', 'Revisá tu legajo y contraseña.', 'error');
    }
  };
  function soloNumeros(evento) {
    let numeros = '';

    for (const caracter of evento.target.value) {
      if (caracter >= '0' && caracter <= '9') {
        numeros += caracter;
      }
    }

    evento.target.value = numeros;
  }

  return (

    <div id="login-bg-institucional" className="d-flex justify-content-center align-items-center vh-100">
      <div className="card border-0 p-4 w-100" style={{ maxWidth: '350px' }}>
        <div className="text-center mb-4">
          <img src="/logo-smt.png" alt="Ciudad San Miguel de Tucumán" style={{ maxWidth: '150px' }} />
        </div>

        <form onSubmit={manejarIngreso}>
          <div className="mb-4">
            <label className="form-label fw-bold">Nº Legajo</label>
            <input
              type="text"
              inputMode="numeric"
              className="form-control border-0 border-bottom rounded-0 px-0"
              onInput={soloNumeros}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Contraseña</label>
            <input type="password" className="form-control border-0 border-bottom rounded-0 px-0" required />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold mb-3" style={{ borderRadius: '6px' }}>
            INGRESAR
          </button>
        </form>

        <div className="text-center" style={{ fontSize: '0.85rem' }}>
          <Link to="/registro" className="text-decoration-none d-block mb-3">REGISTRARSE</Link>
          <a href="#" className="text-decoration-none text-muted d-block mb-3">¿Olvidó su clave? Haga click <span className="text-primary fw-bold">aquí</span></a>

          <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.75rem' }}>
            <a href="https://smt.gob.ar/" className="text-decoration-none">Volver a la pagina principal</a>
          </div>
        </div>

      </div>
    </div>
  );
}
