import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuUsuario() {
    const [abierto, setAbierto] = useState(false);
    const navigate = useNavigate();

    function cerrarSesion() {
        setAbierto(false);
        navigate('/', { replace: true });
    }

    return (
        <div className="dropdown ms-auto">
            <button
                type="button"
                className="btn border-0 d-flex align-items-center"
                onClick={() => setAbierto(!abierto)}
                aria-label="Opciones de usuario"
                aria-expanded={abierto}
            >
                <i class="fa-solid fa-user-tie fs-2"></i>
            </button>

            {abierto && (
                <div className="dropdown-menu show end-0">
                    <button type="button" className="dropdown-item"
                        onClick={cerrarSesion}>
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}