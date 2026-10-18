export const MODO_MANTENIMIENTO = false;

export const datosFalsos = {
  solicitudes: [
    { 
      id: 'SOL-001', 
      tipo: 'Limpieza', 
      ubicacion: 'Av. Mate de Luna y Pellegrini', 
      prioridad: 'Media', 
      estado: 'Finalizado',
      descripcion: 'Retiro de ramas caídas y barrido de cordón cuneta tras tormenta.'
    },
    { 
      id: 'SOL-002', 
      tipo: 'Imbornal/desagüe', 
      ubicacion: '24 de Septiembre y Muñecas (Barrio Sur)', 
      prioridad: 'Alta', 
      estado: 'Pendiente',
      imbornalId: 'IMB-001',
      descripcion: 'Boca de tormenta tapada con bolsas y hojas secas; provoca anegamiento en la esquina.'
    },
    { 
      id: 'SOL-003', 
      tipo: 'Desagote', 
      ubicacion: 'Pje. Sargento Gómez 1450 (B° Ciudadela)', 
      prioridad: 'Media', 
      estado: 'Pendiente',
      descripcion: 'Solicitud vecinal de camión atmosférico para desagote de pozo ciego.'
    },
  ],

  actas: [
    {
      id: 'REG-001', 
      solicitudId: 'SOL-001', 
      numero: 'ACTA-2026-084', 
      inspector: 'Carlos Décima (Leg. 4102)', 
      norma: 'Ord. Municipal N° 3622', 
      articulo: 'Art. 14 inc. B', 
      observaciones: 'Se constata acumulación de restos de poda y escombros obstruyendo la acera.', 
      documento: 'Folio N° 18 - Talonario Zona Centro', 
      estado: 'Pendiente de derivación' 
    }, 
  ],

  imbornales: [
    { id: 'IMB-001', ubicacion: '24 de Septiembre y Muñecas', tipo: 'Imbornal', limpieza: 'Obstruido', estructura: 'Dañado' },
    { id: 'IMB-002', ubicacion: 'Av. Sarmiento y Laprida (Plaza Urquiza)', tipo: 'Imbornal', limpieza: 'Limpio', estructura: 'Reja faltante' },
  ],
  camiones: [
    { id: 'CAM-001', nombre: 'Interno 14 - Iveco Tector (Dominio AE 452 KL)' },
    { id: 'CAM-002', nombre: 'Interno 21 - Mercedes-Benz Atego (Dominio AD 890 XZ)' },
  ],
};

export const PAGINAS = [
  { ruta: '/inicio', nombre: 'Inicio', titulo: 'Gestión de Limpieza Urbana', descripcion: 'Resumen de solicitudes, inspecciones, imbornales y desagotes.' },
  { ruta: '/solicitudes', nombre: 'Solicitudes', titulo: 'Solicitudes de limpieza urbana', descripcion: 'Registrá pedidos de limpieza, inspección, mantenimiento de imbornales y desagote, y consultá su seguimiento operativo.' },
  { ruta: '/inspecciones', nombre: 'Inspecciones', titulo: 'Inspecciones y registro de actas', descripcion: 'Relacioná las referencias de actas con cada solicitud y seguí su estado administrativo.' },
  { ruta: '/imbornales', nombre: 'Imbornales', titulo: 'Mantenimiento de imbornales y desagües', descripcion: 'Registrá instalaciones y controlá por separado su limpieza y su estado físico para organizar el mantenimiento.' },
  { ruta: '/desagotes', nombre: 'Desagotes', titulo: 'Turnos y camiones de desagote', descripcion: 'Programá pedidos de desagote con camiones disponibles y revisá horarios para evitar superposiciones de turnos.' },
];

export const PAGINA_NO_ENCONTRADA = { 
  nombre: 'Error 404', 
  titulo: 'Error 404: página no encontrada', 
  descripcion: 'La dirección solicitada no corresponde.' };
export const PAGINA_MANTENIMIENTO = { 
  nombre: 'Sistema en mantenimiento', 
  titulo: 'Sistema en mantenimiento', 
  descripcion: 'SIGLU se encuentra en mantenimiento.' };