import { Link } from "react-router-dom";
import "../../styles/error404.css";

function Error404() {
    return (
        <div className="error-page">
            <div className="error-container">
                <div className="error-icon">🔎</div>

                <div className="error-code">404</div>

                <h1 className="error-title">
                    Página no encontrada
                </h1>

                <p className="error-message">
                    Lo sentimos, la página que estás buscando no existe o fue movida.
                </p>

                <div className="action-buttons">
                    <Link to="/" className="btn btn-primary">
                        Página Principal
                    </Link>

                    <button
                        className="btn btn-secondary"
                        onClick={() => window.history.back()}
                    >
                        Regresar
                    </button>
                </div>

                <div className="contact-info">
                    <p>
                        Si crees que esto es un error, contacta al administrador del sistema.
                    </p>
                    <p>
                        📞 (123) 456-7890 | ✉️ soporte@clinicabienestar.com
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Error404;