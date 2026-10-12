import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const obtenerEstadoClima = (codigo) => {
  if (codigo === 0) return { texto: 'Despejado', emoji: '☀️' };
  if (codigo > 0 && codigo <= 3) return { texto: 'Nublado', emoji: '☁️' };
  if (codigo >= 45 && codigo <= 48) return { texto: 'Niebla', emoji: '🌫️' };
  if (codigo >= 51 && codigo <= 67) return { texto: 'Lluvia', emoji: '🌧️' };
  if (codigo >= 80 && codigo <= 82) return { texto: 'Chubascos', emoji: '🌦️' };
  if (codigo >= 95 && codigo <= 99) return { texto: 'Tormenta', emoji: '⛈️' };
  return { texto: 'Variable', emoji: '🌡️' };
};

export default function Clima() {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerClima = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const respuesta = await axios.get(API_URL);
        
        setClima(respuesta.data.current_weather);
      } catch (err) {
        console.error("Error en la petición:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudo cargar la información del clima.',
          confirmButtonColor: '#0d6efd'
        });
      } finally {
        setCargando(false);
      }
    };

    obtenerClima();
  }, []); 

  if (cargando) return <span className="badge bg-secondary">Cargando clima...</span>;
  if (!clima) return null; 

  const estado = obtenerEstadoClima(clima.weathercode);

  return (
    <div className="d-flex align-items-center gap-2 bg-white text-dark px-3 py-2 rounded ">
      <span className="fs-4">{estado.emoji}</span>
      <div className="d-flex flex-column lh-1">
        <span className="fw-bold">{clima.temperature}°C - {estado.texto}</span>
        <span className="text-muted" style={{ fontSize: '0.75rem' }}>San Miguel de Tucumán</span>
      </div>
    </div>
  );
}