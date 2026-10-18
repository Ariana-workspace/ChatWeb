
import { useEffect, useState } from 'react';
import { usuarioPorId } from '../../../services/usuarioService';
import '../styles/Perfil.css';

const Perfil = () => {
  const [user, setUser] = useState({});
  const [cargando, setCargando] = useState(true);

  const id_usuario = localStorage.getItem('id_usuario');

  useEffect(() => {
    const cargarUsuarioUwu = async () => {
      try {
        const data = await usuarioPorId(id_usuario);
        setUser(data || {});
        console.log(data);
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
      } finally {
        setCargando(false);
      }
    };

    if (id_usuario) {
      cargarUsuarioUwu();
    } else {
      setCargando(false);
    }
  }, [id_usuario]);

  if (cargando) {
    return (
      <div className="perfil">
        <div className="perfil-card perfil-estado">
          <div className="perfil-spinner"></div>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil">
      <section className="perfil-card">
        <div className="perfil-portada">
          <div className="perfil-portada-circulo circulo-uno"></div>
          <div className="perfil-portada-circulo circulo-dos"></div>

          <span className="perfil-etiqueta">
            <span className="perfil-punto"></span>
            Activo
          </span>
        </div>

        <div className="perfil-contenido">
          <div className="perfil-avatar-contenedor">
            {user.foto ? (
              <img
                className="photo-user"
                src={user.foto}
                alt={`Foto de perfil de ${user.nombre || 'usuario'}`}
              />
            ) : (
              <div className="photo-user perfil-avatar-vacio">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="perfil-identidad">
            <h2 className="usuarioNombre">
              {user.nombre || 'Usuario'}
            </h2>

            <p className="perfil-subtitulo">
              Información personal
            </p>

            {user.descripcion && (
              <p className="usuarioDescripcion">
                {user.descripcion}
              </p>
            )}
          </div>

          <div className="perfil-separador"></div>

          <div className="perfil-datos">
            <div className="perfil-dato">
              <div className="perfil-icono">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M16 3V7M8 3V7M3 10H21"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="perfil-dato-texto">
                <span className="perfil-dato-label">
                  Miembro desde
                </span>
                <span className="perfil-dato-valor">
                  {user.fecha_union || 'No disponible'}
                </span>
              </div>
            </div>

            <div className="perfil-dato">
              <div className="perfil-icono">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M5 21V19C5 15.6863 7.68629 13 11 13H13C16.3137 13 19 15.6863 19 19V21"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="perfil-dato-texto">
                <span className="perfil-dato-label">
                  Género
                </span>
                <span className="perfil-dato-valor">
                  {user.genero || 'No especificado'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Perfil;
