import { useState } from "react";
import "../../styles/dashboard.css";

function CrearCitas() {
  return <div><h2>Crear Citas</h2><p>Formulario de citas aquí...</p></div>;
}

function VerCitas() {
  return <div><h2>Ver Citas</h2><p>Lista de citas aquí...</p></div>;
}

function EditarPerfil() {
  return <div><h2>Editar Perfil</h2><p>Formulario de perfil aquí...</p></div>;
}

function Dashboard() {
  const [seccionActiva, setSeccionActiva] = useState("crear-citas");

  const renderContenido = () => {
    switch (seccionActiva) {
      case "crear-citas":   return <CrearCitas />;
      case "ver-citas":     return <VerCitas />;
      case "editar-perfil": return <EditarPerfil />;
      default:              return <CrearCitas />;
    }
  };

  return (
    <div className="wrapper">
      <aside className="main-sidebar sidebar-dark-danger elevation-4">
        <a href="/" className="brand-link">
          <span className="brand-text font-weight-light">Bienestar</span>
        </a>

        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column">

              <li className="nav-item">
                <a
                  href="#"
                  className={"nav-link " + (seccionActiva === "crear-citas" ? "active" : "")}
                  onClick={() => setSeccionActiva("crear-citas")}
                >
                  <i className="nav-icon fas fa-calendar-alt"></i>
                  <p>Crear Citas</p>
                </a>
              </li>

              <li className="nav-item">
                <a  
                  href="#"
                  className={"nav-link " + (seccionActiva === "ver-citas" ? "active" : "")}
                  onClick={() => setSeccionActiva("ver-citas")}
                >
                  <i className="nav-icon fas fa-search"></i>
                  <p>Ver citas</p>
                </a>
              </li>

              <li className="nav-item">
                <a  
                  href="#"
                  className={"nav-link " + (seccionActiva === "editar-perfil" ? "active" : "")}
                  onClick={() => setSeccionActiva("editar-perfil")}
                >
                  <i className="nav-icon fas fa-edit"></i>
                  <p>Editar Perfil</p>
                </a>
              </li>

            </ul>
          </nav>
        </div>
      </aside>

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">
              {seccionActiva === "crear-citas" && "Crear Citas"}
              {seccionActiva === "ver-citas" && "Ver Citas"}
              {seccionActiva === "editar-perfil" && "Editar Perfil"}
            </h1>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            {renderContenido()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;