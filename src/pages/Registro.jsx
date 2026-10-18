import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Registro() {
  const [mostrarClave, setMostrarClave] = useState(false);

  function registrar(evento) {
    evento.preventDefault();

    const formulario = evento.currentTarget;
    const clave = formulario.elements.namedItem('clave').value;
    const repetirClave = formulario.elements.namedItem('repetirClave').value;

    if (clave !== repetirClave) {
      Swal.fire('Error', 'Las contraseñas no coinciden.', 'warning');
      return;
    }

    Swal.fire(
      'Formulario completo',
      'Registro exitoso.',
    );
  }

  return (
    <section className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow rounded-4 p-4">

              <div className="text-center mb-4">
                <img src="/logo-smt.png" alt="Municipalidad" width="150" />
                <p className="text-primary fw-bold mt-3 mb-1">
                  SIGLU · Limpieza Urbana
                </p>
                <h1 className="h5 rounded-pill bg-primary text-white py-2 px-4 d-inline-block">
                  REGISTRO DE PERSONAL MUNICIPAL
                </h1>
              </div>

              <form onSubmit={registrar}>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input id="nombre" name="nombre" type="text" className="form-control" required />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input id="apellido" name="apellido" type="text" className="form-control" required />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cuil" className="form-label">CUIL</label>
                    <input id="cuil" name="cuil" type="text" inputMode="numeric"
                      className="form-control" pattern="[0-9]{11}" maxLength={11}
                      placeholder="11 números sin guiones" title="Ingresá 11 números sin guiones." required />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="legajo" className="form-label">Número de legajo</label>
                    <input id="legajo" name="legajo" type="text" className="form-control" required />
                  </div>

                  <div className="col-12">
                    <label htmlFor="area" className="form-label">Área de trabajo</label>
                    <select id="area" name="area" className="form-select" defaultValue="" required>
                      <option value="" disabled>Seleccioná tu área</option>
                      <option>Inspecciones</option>
                      <option>Desagotes</option>
                      <option>Imbornales y desagües</option>
                      <option>Taller y mantenimiento de vehículos</option>
                      <option>Administración</option>
                      <option>Otra área</option>
                    </select>
                  </div>
                </div>

                <h2 className="h6 border-bottom pb-2 mt-4">Datos de la cuenta</h2>

                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">Correo electrónico</label>
                  <input id="correo" name="correo" type="email" className="form-control" required />
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="clave" className="form-label">Contraseña</label>
                    <input id="clave" name="clave" type={mostrarClave ? 'text' : 'password'}
                      className="form-control" minLength={8} autoComplete="new-password" required />
                    <div className="form-text">Como mínimo, 8 caracteres.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="repetirClave" className="form-label">Repetir contraseña</label>
                    <input id="repetirClave" name="repetirClave" type={mostrarClave ? 'text' : 'password'}
                      className="form-control" minLength={8} autoComplete="new-password" required />
                  </div>
                </div>

                <div className="form-check my-3">
                  <input id="mostrarClave" type="checkbox" className="form-check-input"
                    checked={mostrarClave} onChange={(evento) => setMostrarClave(evento.target.checked)} />
                  <label htmlFor="mostrarClave" className="form-check-label">
                    Mostrar contraseñas
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Solicitar registro
                </button>
              </form>

              <div className="text-center mt-4">
                <Link to="/">Volver al inicio de sesión</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}