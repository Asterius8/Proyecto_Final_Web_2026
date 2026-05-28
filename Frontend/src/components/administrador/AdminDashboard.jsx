import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

// ── Importa tus componentes reales aquí cuando los tengas ──
import AgregarMedico from "./AgregarMedico";
// import AdministrarMedicos from "./AdministrarMedicos";
// import EliminarCitas from "./EliminarCitas";

function AdminDashboard() {
  const navigate = useNavigate();

  const [seccionActiva, setSeccionActiva] = useState(
    localStorage.getItem("adminSeccion") || "agregar-medico"
  );

  useEffect(() => {
    localStorage.setItem("adminSeccion", seccionActiva);
  }, [seccionActiva]);

  const renderContenido = () => {
    switch (seccionActiva) {
      case "agregar-medico":
        return <AgregarMedico />;
      case "administrar-medicos":
        // return <AdministrarMedicos />;
        return <p>Aquí va la tabla de Administrar Médicos</p>;
      case "eliminar-citas":
        // return <EliminarCitas />;
        return <p>Aquí va la tabla de Eliminar Citas</p>;
      default:
        return <p>Aquí va el formulario para Agregar Médico</p>;
    }
  };

  const titulos = {
    "agregar-medico": "Agregar Médico",
    "administrar-medicos": "Administrar Médicos",
    "eliminar-citas": "Eliminar Citas",
  };

  return (
    <div className="wrapper">

      <aside className="main-sidebar sidebar-dark-danger elevation-4">

        <a href="#" className="brand-link" onClick={(e) => e.preventDefault()}>
          <span className="brand-text font-weight-light">Bienestar</span>
        </a>

        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column">

              <li className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${seccionActiva === "agregar-medico" ? "active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setSeccionActiva("agregar-medico"); }}
                >
                  <p>Agregar Médico</p>
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${seccionActiva === "administrar-medicos" ? "active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setSeccionActiva("administrar-medicos"); }}
                >
                  <p>Administrar Médicos</p>
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${seccionActiva === "eliminar-citas" ? "active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setSeccionActiva("eliminar-citas"); }}
                >
                  <p>Eliminar Citas</p>
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("email");
                    localStorage.removeItem("adminSeccion");
                    navigate("/");
                  }}
                >
                  <i className="nav-icon fas fa-sign-out-alt"></i>
                  <p>Cerrar Sesión</p>
                </a>
              </li>

            </ul>
          </nav>
        </div>

      </aside>

      <div className="content-wrapper">

        <div className="content-header">
          <h1>{titulos[seccionActiva]}</h1>
        </div>

        <div className="dashboard-content">
          {renderContenido()}
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;