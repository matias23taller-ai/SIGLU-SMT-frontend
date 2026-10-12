import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const areas = ['Inspecciones', 'Desagotes', 'Imbornales y desagües', 'Taller y mantenimiento de vehículos', 'Administración', 'Otra área'];

const campos = [
  { name: 'nombre', label: 'Nombre', pattern: '.*\\S.*' },
  { name: 'apellido', label: 'Apellido', pattern: '.*\\S.*' },
  { name: 'cuil', label: 'CUIL', pattern: '[0-9]{11}|[0-9]{2}-[0-9]{8}-[0-9]', maxLength: 13, title: 'Ingresá 11 dígitos, con o sin guiones.' },
  { name: 'legajo', label: 'Número de legajo', pattern: '.*\\S.*' },
  { name: 'correo', label: 'Correo electrónico', type: 'email' },
  { name: 'password', label: 'Contraseña', type: 'password', minLength: 8, pattern: '.*\\S.*' },
  { name: 'confirmarPassword', label: 'Repetir contraseña', type: 'password', minLength: 8 },
];

export default function Registro() {
  const [mostrar, setMostrar] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    const coinciden = datos.get('password') === datos.get('confirmarPassword');
    Swal.fire({
      icon: coinciden ? 'info' : 'warning',
      title: coinciden ? 'Formulario completo' : 'Las contraseñas no coinciden',
      text: coinciden ? 'Por el momento, los datos no se envían ni se guardan.' : 'Revisá las contraseñas ingresadas.',
      confirmButtonColor: '#0d6efd',
    });
  };

  const dibujarCampo = ({ label, type = 'text', ...campo }) => (
    <div className={campo.name === 'correo' ? 'col-12' : 'col-12 col-md-6'} key={campo.name}>
      <label htmlFor={campo.name} className="form-label">{label}</label>
      <input {...campo} id={campo.name} type={type === 'password' && mostrar ? 'text' : type} className="form-control" required />
      {campo.name === 'password' && <div className="form-text">Como mínimo, 8 caracteres.</div>}
    </div>
  );

  return (
    <section className="min-vh-100 bg-light d-flex align-items-center py-4 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9 col-xl-8">
            <div className="card border-0 shadow rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <img src="/logo-smt.png" alt="Municipalidad de San Miguel de Tucumán" className="img-fluid mb-3" width="150" />
                  <p className="text-primary fw-bold mb-1">SIGLU · Limpieza Urbana</p>
                  <h1 className="h3 fw-bold">Registro de personal municipal</h1>
                </div>
                <form onSubmit={registrar}>
                  <h2 className="h6 fw-bold border-bottom pb-2 mt-4">Datos personales y laborales</h2>
                  <p className="small text-secondary">Todos los campos son obligatorios.</p>
                  <div className="row g-3">
                    {campos.slice(0, 4).map(dibujarCampo)}
                    <div className="col-12">
                      <label htmlFor="area" className="form-label">Área de trabajo</label>
                      <select id="area" name="area" className="form-select" defaultValue="" required>
                        <option value="" disabled>Seleccioná tu área</option>
                        {areas.map((area) => <option key={area}>{area}</option>)}
                      </select>
                    </div>
                  </div>
                  <h2 className="h6 fw-bold border-bottom pb-2 mt-4">Datos de la cuenta</h2>
                  <div className="row g-3">{campos.slice(4).map(dibujarCampo)}</div>
                  <div className="form-check my-3">
                    <input id="mostrar" type="checkbox" className="form-check-input" checked={mostrar} onChange={(e) => setMostrar(e.target.checked)} />
                    <label htmlFor="mostrar" className="form-check-label small">Mostrar contraseñas</label>
                  </div>
                  <button className="btn btn-primary w-100 py-2 fw-semibold" type="submit">Solicitar registro</button>
                </form>
                <div className="py-3 text-center">
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