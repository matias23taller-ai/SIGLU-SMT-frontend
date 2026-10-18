import Badge from '../components/Etiquetas.jsx';

export default function Desagotes({ datos }) {
  const solicitudes = datos?.solicitudes || [];
  const camiones = datos?.camiones || [];
  
  const pedidosDesagote = solicitudes.filter((solicitud) => solicitud.tipo === 'Desagote');

  return (
    <div className="row g-4">
      <div className="col-12 col-xl-4">
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Programar turno</h5>
           
            <form onSubmit={(evento) => evento.preventDefault()}>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Pedido pendiente</label>
                <select className="form-select">
                  <option value="">Seleccionar pedido...</option>
                  {pedidosDesagote
                  .filter(pedido => pedido.estado === 'Pendiente')
                  .map(pedido => (
                    <option key={pedido.id} value={pedido.id}>{pedido.id} - {pedido.ubicacion}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Camión atmosférico</label>
                <select className="form-select">
                  <option value="">Seleccionar camión...</option>
                  {camiones.map(camion => (
                    <option key={camion.id} value={camion.id}>{camion.nombre}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Fecha</label>
                <input type="date" className="form-control" />
              </div>
              
              <div className="d-flex gap-2 mb-3">
                <div className="w-50">
                  <label className="form-label fw-bold">Inicio</label>
                  <input type="time" className="form-control" />
                </div>
                <div className="w-50">
                  <label className="form-label fw-bold">Fin</label>
                  <input type="time" className="form-control" />
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary w-100">
                Programar turno
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="col-12 col-xl-8">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">Lista de Desagotes</h5>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID y Solicitud</th>
                    <th>Ubicación</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosDesagote.map((pedido) => (
                    <tr key={pedido.id}>
                      <td className="fw-semibold">{pedido.id}</td>
                      <td>{pedido.ubicacion}</td>
                      <td>
                        <Badge texto={pedido.estado} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}