# SIGLU — Sistema de Gestión de Limpieza Urbana 

Proyecto de la materia Programación IV, hecho entre dos. Es el frontend de un sistema para ordenar el trabajo de limpieza urbana de la municipalidad: los pedidos de los vecinos, las inspecciones, el mantenimiento de imbornales y los desagotes de pozos.

**Integrantes:** Matías Montti y Lisandro Rayano

## Por qué lo hicimos

Pensamos en lo que pasa hoy en muchas áreas municipales: los pedidos llegan por teléfono, por mail o por papel, y después nadie sabe bien cuál está pendiente, cuál ya se atendió y qué camión va a cada lado. Quisimos juntar todo en un solo lugar donde se pueda ver de un vistazo qué falta hacer.

## 🧹Qué tiene la aplicación 

- **Login y registro:** pantalla de ingreso con legajo y contraseña, y una pantalla para crear una cuenta.
- **Inicio:** resumen con contadores y accesos directos a cada sección. También muestra el clima del momento.
- **Solicitudes:** listado de los pedidos de los vecinos con su estado, y un formulario para cargar uno nuevo.
- **Inspecciones:** actas de inspección y su seguimiento.
- **Imbornales:** listado de imbornales y desagües, con el estado de limpieza y de conservación que se puede cambiar desde la pantalla.
- **Taller:** la flota de la municipalidad (camiones atmosféricos, recolectores, barredora y camioneta) con su estado, kilometraje y el service que les toca. Se pueden filtrar las unidades por estado, ver el detalle de cada una con su historial, y cargar órdenes de trabajo nuevas (preventivas o correctivas).
- **Desagotes:** pedidos de desagote de pozos, con camión, fecha y horario.
- **404:** aparece si se entra a una dirección que no existe.
- **Mantenimiento:** un aviso que reemplaza a toda la aplicación cuando se activa el modo mantenimiento.

## Cómo está armado

Usamos React con Vite. Para los estilos, Bootstrap, y para los íconos, Font Awesome. La navegación entre pantallas la hace React Router, los pedidos a internet los hace Axios y los carteles de aviso son de SweetAlert2.

El código está dividido así:

```
src/
  App.jsx            decide qué se muestra y reparte los datos
  main.jsx           punto de entrada
  components/        piezas que se repiten (menú, encabezado, clima, etiquetas...)
    routes/          las rutas: qué pantalla va con cada dirección
  pages/             una pantalla por archivo
  data/              Usuarios.json (usuarios de prueba)
```

Los datos de solicitudes, inspecciones, imbornales, desagotes y de las unidades y órdenes del taller están escritos a mano en `src/components/Data.jsx`. Ahí mismo está el interruptor `MODO_MANTENIMIENTO`: si lo ponemos en `true`, se muestra la pantalla de mantenimiento en lugar de la aplicación.

## 🛠️Cómo probarlo

Hace falta tener Node.js instalado.

```bash
npm install
npm run dev
```

Después se abre la dirección que muestra la terminal (normalmente `http://localhost:5173`).

**El clima necesita un archivo `.env`.** Lo dejamos fuera de Git a propósito, así que hay que crearlo en la raíz del proyecto con una línea así:

```
VITE_API_URL=la-direccion-de-la-api-de-clima
```

La dirección tiene que devolver el clima en el formato de Open-Meteo (la pantalla lee `current_weather`). Sin ese archivo la aplicación funciona igual, pero el cuadro del clima muestra un cartel de error.

Para entrar hay usuarios de prueba en `src/data/Usuarios.json`.

## 🚧Qué todavía no hace

Es un prototipo, y preferimos decirlo claro:

- No hay servidor. El login compara contra un archivo `.json` que se lee desde el navegador, así que no es seguro y las contraseñas están a la vista. Alcanza para mostrar cómo sería el flujo, nada más.
- Los formularios todavía no guardan nada de forma permanente. En general se pueden completar y enviar, pero los datos no se almacenan. La excepción es el Taller: las órdenes nuevas aparecen en pantalla, pero se pierden al recargar la página.
- El buscador y los filtros de Solicitudes están dibujados pero todavía no filtran.
- Cualquiera que escriba `/inicio` en la barra de direcciones entra sin loguearse.
- Algunas fechas y contadores están escritos fijos para la demostración.

## Qué nos gustaría hacer después

1. Conectar todo a un backend real con una base de datos.
2. Que el login funcione de verdad: sesión, rutas protegidas y permisos distintos para administrador e inspector.
3. Hacer que los formularios guarden, y que los filtros y el buscador funcionen.
4. Evitar que se superpongan dos desagotes del mismo camión en el mismo horario.
5. En el Taller: poder cambiar el estado de una orden (pendiente, en trabajo, finalizada) y que la unidad pase sola a "En mantenimiento".
6. Que Desagotes no ofrezca camiones que están en reparación, y avisar en Inicio cuando a una unidad le toca el service.

