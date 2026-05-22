import { useEffect, useState } from "react";
import "../../styles/dashboard.css";

import CrearCita from "../paciente/CrearCitas";
import EditarPerfil2 from "../paciente/EditarPaciente";
import VerCitas2 from "../paciente/VerCitas";

import { useNavigate } from "react-router-dom";


function Dashboard() {

  const navigate = useNavigate();

  // Recuperar sección guardada
  const [seccionActiva, setSeccionActiva] = useState(
    localStorage.getItem("seccionActiva") || "crear-citas"
  );

  // Guardar cuando cambie
  useEffect(() => {

    localStorage.setItem(
      "seccionActiva",
      seccionActiva
    );

  }, [seccionActiva]);

  const renderContenido = () => {

    switch (seccionActiva) {

      case "crear-citas":
        return <CrearCita />;

      case "ver-citas":
        return <VerCitas2 />;

      case "editar-perfil":
        return <EditarPerfil2 />;

      default:
        return <CrearCita />;

    }

  };

  return (

    <div className="wrapper">

      <aside className="main-sidebar sidebar-dark-danger elevation-4">

        <a
          href="#"
          className="brand-link"
          onClick={(e) => e.preventDefault()}
        >
          <span className="brand-text font-weight-light">
            Bienestar
          </span>
        </a>

        <div className="sidebar">

          <nav className="mt-2">

            <ul className="nav nav-pills nav-sidebar flex-column">

              <li className="nav-item">

                <a
                  href="#"
                  className={`nav-link ${seccionActiva === "crear-citas"
                    ? "active"
                    : ""
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSeccionActiva("crear-citas");
                  }}
                >
                  <p>Crear Citas</p>
                </a>

              </li>

              <li className="nav-item">

                <a
                  href="#"
                  className={`nav-link ${seccionActiva === "ver-citas"
                    ? "active"
                    : ""
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSeccionActiva("ver-citas");
                  }}
                >
                  <p>Ver Citas</p>
                </a>

              </li>

              <li className="nav-item">

                <a
                  href="#"
                  className={`nav-link ${seccionActiva === "editar-perfil"
                    ? "active"
                    : ""
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSeccionActiva("editar-perfil");
                  }}
                >
                  <p>Editar Perfil</p>
                </a>

              </li>

              <li className="nav-item">

                <a
                  href="#"
                  className={`nav-link ${seccionActiva === "cerrar-sesion"
                    ? "active"
                    : ""
                    }`}
                  onClick={(e) => {

                    e.preventDefault();

                    // limpiar sesión
                    localStorage.removeItem("user");
                    localStorage.removeItem("email");
                    localStorage.removeItem("seccionActiva");

                    // redirigir
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

          <h1>

            {seccionActiva === "crear-citas" && "Crear Citas"}
            {seccionActiva === "ver-citas" && "Ver Citas"}
            {seccionActiva === "editar-perfil" && "Editar Perfil"}

          </h1>

        </div>

        <div className="dashboard-content">

          {renderContenido()}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;