import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const camposIniciales = {
  nombre: '', apellido: '', cuil: '', legajo: '',
  correo: '', area: '', password: '', confirmarPassword: '',
};

const areas = [
  'Inspecciones',
  'Desagotes',
  'Imbornales y desagües',
  'Taller y mantenimiento de vehículos',
  'Administración',
  'Otra área',
];

export default function Registro() {
  const [datos, setDatos] = useState(camposIniciales);
  const [mostrarClave, setMostrarClave] = useState(false);
  const [validando, setValidando] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatos((actuales) => ({ ...actuales, [name]: value }));
  };

  const manejarRegistro = async (evento) => {
    evento.preventDefault();
    if (validando) return;

    if (datos.password !== datos.confirmarPassword) {
      await Swal.fire({
        icon: 'warning',
        title: 'Las contraseñas no coinciden',
        text: 'Revisá ambos campos e ingresá la misma contraseña.',
        confirmButtonText: 'Revisar',
        confirmButtonColor: '#0d6efd',
      });
      document.getElementById('confirmarPassword')?.focus();
      return;
    }

    // Próxima etapa: enviar los datos al backend.
    // El backend verificará CUIL/legajo, evitará duplicados y asignará
    // el estado pendiente. El área solicitada NO otorga permisos.
    // No guardar contraseñas en localStorage ni en archivos JSON.
    setValidando(true);
    try {
      await Swal.fire({
        icon: 'info',
        title: 'Formulario validado',
        text: 'Los campos están completos. El registro todavía no se guarda porque falta conectar el backend. No se creó una cuenta ni se envió una solicitud.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#0d6efd',
      });
      setDatos((actuales) => ({ ...actuales, password: '', confirmarPassword: '' }));
      setMostrarClave(false);
    } finally {
      setValidando(false);
    }
  };
  return (
    <section className="min-vh-100 bg-light d-flex align-items-center py-4 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9 col-xl-8">
            <div className="card border-0 shadow rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <img
                    src="/logo-smt.png"
                    alt="Municipalidad de San Miguel de Tucumán"
                    className="img-fluid mb-3"
                    width="150"
                  />
                  <p className="text-primary fw-bold mb-1">SIGLU · Limpieza Urbana</p>
                  <h1 className="h3 fw-bold">Registro de personal municipal</h1>
                  <p className="text-secondary mb-0">
                    Completá tus datos para solicitar acceso al sistema.
                  </p>
                </div>

                <div className="alert alert-primary small" role="note">
                  El acceso estará sujeto a la verificación del legajo y a la aprobación
                  de un administrador. El área declarada no asigna permisos automáticamente.
                </div>

                <form onSubmit={manejarRegistro}>
                  <fieldset disabled={validando}>
                    <legend className="h6 fw-bold border-bottom pb-2 mt-4">Datos personales y laborales</legend>
                    <p className="small text-secondary">Todos los campos son obligatorios.</p>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input id="nombre" name="nombre" type="text" className="form-control"
                          autoComplete="given-name" maxLength={80} pattern=".*\S.*"
                          title="Ingresá tu nombre; no puede contener solamente espacios."
                          value={datos.nombre} onChange={manejarCambio} required />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input id="apellido" name="apellido" type="text" className="form-control"
                          autoComplete="family-name" maxLength={80} pattern=".*\S.*"
                          title="Ingresá tu apellido; no puede contener solamente espacios."
                          value={datos.apellido} onChange={manejarCambio} required />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="cuil" className="form-label">CUIL</label>
                        <input id="cuil" name="cuil" type="text" className="form-control"
                          inputMode="numeric" maxLength={13} pattern="[0-9]{11}|[0-9]{2}-[0-9]{8}-[0-9]"
                          title="Ingresá los 11 dígitos, con o sin guiones."
                          aria-describedby="ayudaCuil" placeholder="Sin puntos, con o sin guiones"
                          value={datos.cuil} onChange={manejarCambio} required />
                        <div id="ayudaCuil" className="form-text">Debe contener 11 dígitos.</div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="legajo" className="form-label">Número de legajo</label>
                        <input id="legajo" name="legajo" type="text" className="form-control"
                          maxLength={30} pattern=".*\S.*" title="Ingresá tu número de legajo."
                          placeholder="Ingresá tu legajo"
                          value={datos.legajo} onChange={manejarCambio} required />
                      </div>
                      <div className="col-12">
                        <label htmlFor="area" className="form-label">Área de trabajo</label>
                        <select id="area" name="area" className="form-select"
                          value={datos.area} onChange={manejarCambio} required>
                          <option value="" disabled>Seleccioná tu área</option>
                          {areas.map((area) => <option key={area} value={area}>{area}</option>)}
                        </select>
                        <div className="form-text">El administrador verificará tu área y asignará el acceso correspondiente.</div>
                      </div>
                    </div>

                    <h2 className="h6 fw-bold border-bottom pb-2 mt-4">Datos de la cuenta</h2>
                    <div className="row g-3">
                      <div className="col-12">
                        <label htmlFor="correo" className="form-label">Correo electrónico</label>
                        <input id="correo" name="correo" type="email" className="form-control"
                          autoComplete="email" maxLength={254} aria-describedby="ayudaCorreo"
                          value={datos.correo} onChange={manejarCambio} required />
                        <div id="ayudaCorreo" className="form-text">Usá un correo al que tengas acceso para futuras notificaciones y recuperación de contraseña.</div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input id="password" name="password" type={mostrarClave ? 'text' : 'password'}
                          className="form-control" autoComplete="new-password" minLength={8} maxLength={128}
                          pattern=".*\S.*" title="Usá al menos 8 caracteres, no solamente espacios."
                          aria-describedby="ayudaClave" value={datos.password} onChange={manejarCambio} required />
                        <div id="ayudaClave" className="form-text">Como mínimo, 8 caracteres.</div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="confirmarPassword" className="form-label">Repetir contraseña</label>
                        <input id="confirmarPassword" name="confirmarPassword" type={mostrarClave ? 'text' : 'password'}
                          className="form-control" autoComplete="new-password" minLength={8} maxLength={128}
                          value={datos.confirmarPassword} onChange={manejarCambio} required />
                      </div>
                    </div>
                    <div className="form-check my-3">
                      <input id="mostrarClave" type="checkbox" className="form-check-input"
                        checked={mostrarClave} onChange={(e) => setMostrarClave(e.target.checked)} />
                      <label htmlFor="mostrarClave" className="form-check-label small">Mostrar contraseñas</label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
                      {validando ? 'Validando...' : 'Solicitar registro'}
                    </button>
                  </fieldset>
                </form>

                <p className="text-center small text-secondary mt-4 mb-1">¿Ya tenés una cuenta?</p>
                <div className="text-center">
                  <Link to="/" className="text-decoration-none fw-semibold">Volver al inicio de sesión</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
