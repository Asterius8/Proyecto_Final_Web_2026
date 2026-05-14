import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <h2>Clínica del Bienestar</h2>
          </div>

          <ul className="nav-links">
            <li>
              <a href="#inicio">Inicio</a>
            </li>
            <li>
              <a href="#servicios">Servicios</a>
            </li>
            <li>
              <a href="#nosotros">Nosotros</a>
            </li>
            <li>
              <a href="#testimonios">Testimonios</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>

            <li>
              <Link to="/login" className="btn-primary_landing">
                Iniciar Sesión
              </Link>
            </li>

            <li>
              <Link to="/register" className="btn-primary_landing">
                Registrarse
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
