// Herramienta para guardar datos que cambian en pantalla (como lo que escribe el usuario)
import { useState } from "react";
// Herramienta para crear enlaces que cambian de página sin recargar el sitio
import { Link } from "react-router-dom";
// Librería para mostrar alertas bonitas (los popups de éxito/error)
import Swal from "sweetalert2";
// Los estilos visuales (colores, tamaños, formas) de esta página
import "../../styles/crear_cuenta.css";
// Herramienta para mandar al usuario a otra página desde el código
import { useNavigate } from "react-router-dom";

function Ingresar() {
  // Guarda lo que el usuario escribe en el campo de correo
  const [email, setEmail] = useState("");
  // Guarda lo que el usuario escribe en el campo de contraseña
  const [password, setPassword] = useState("");
  // Guarda la lista de errores que se muestran si algo está mal
  const [errores, setErrores] = useState([]);
  // Prepara la función para redirigir al usuario a otra página
  const navigate = useNavigate();

  // Esta función se ejecuta cuando el usuario hace clic en "Crear Cuenta"
  const handleSubmit = async (e) => {
    // Evita que la página se recargue sola al enviar el formulario
    e.preventDefault();

    // Crea una lista vacía donde se guardarán los errores encontrados
    let listaErrores = [];

    // Revisa si el correo tiene "@" y "." — si no los tiene, no es un correo válido
    if (!email.includes("@") || !email.includes(".")) {
      listaErrores.push("Formato de correo inválido");
    }

    // Revisa si la contraseña tiene al menos 6 caracteres
    if (password.length < 6) {
      listaErrores.push("La contraseña debe tener al menos 6 caracteres");
    }

    // Si se encontró algún error, los muestra en pantalla y detiene el proceso
    if (listaErrores.length > 0) {
      setErrores(listaErrores);
      return;
    }

    try {
      // Envía el correo y la contraseña al servidor para ingresar a la cuenta
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST", // Le dice al servidor que quiere enviar datos nuevos
        headers: {
          "Content-Type": "application/json", // Le avisa al servidor que los datos vienen en formato JSON
        },
        body: JSON.stringify({ email, password }), // Convierte el correo y contraseña a texto para enviarlos
      });

      // Convierte la respuesta del servidor a un objeto que podemos usar
      const data = await res.json();

      // Si el servidor dice que todo salió bien...
      if (data.ok) {
        // Guarda el correo en el navegador para recordarlo después
        localStorage.setItem("email", email);
        // Borra cualquier error que hubiera en pantalla
        setErrores([]);

        // Muestra un popup de éxito y cuando el usuario lo cierra, lo manda a otra página
        if (data.mensaje === "Login exitoso") {
          Swal.fire({
            title: "Sesión iniciada",
            text: "Bienvenido",
            icon: "success",
          }).then(() => {
            navigate(data.redirigir);
          });

          // Si le falta completar sus datos personales
        } else if (data.mensaje === "Incompleto") {
          Swal.fire({
            title: "Cuenta incompleta",
            text: "Por favor, completa tus datos personales",
            icon: "warning",
          }).then(() => {
            navigate(data.redirigir);
          });
        } else {
          navigate(data.redirigir);
        }

        // Limpia los campos de correo y contraseña
        setEmail("");
        setPassword("");
      } else {
        // Si el servidor encontró un error, lo muestra en pantalla
        setErrores(data.errores || ["Error desconocido"]);
      }
    } catch (error) {
      // Si no se pudo conectar al servidor, muestra un popup de error
      Swal.fire("Error", "No se pudo conectar al servidor", "error");
    }
  };

  //======================================================================== COMPONENTES DE LA PÁGINA DE INGRESO ========================================================================
  return (
    // Capa exterior que ocupa toda la pantalla con el fondo de la página
    <div className="register-page1">
      {/* Caja centrada que contiene el formulario */}
      <div className="container1">
        {/* El formulario — cuando se envía, llama a la función handleSubmit */}
        <form className="form-card1" onSubmit={handleSubmit}>
          {/* Título principal del formulario */}
          <h2>Iniciar Sesión</h2>
          {/* Texto pequeño debajo del título */}
          <p className="subtitle">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>

          {/* Solo muestra esta sección si hay errores que mostrar */}
          {errores.length > 0 && (
            <div className="error-message">
              {/* Recorre la lista de errores y muestra cada uno en su propio renglón */}
              {errores.map((err, i) => (
                <div key={i} className="error-item">
                  {err}
                </div>
              ))}
            </div>
          )}

          {/* Etiqueta visible del campo de correo */}
          <label>Correo electrónico</label>
          {/* Campo donde el usuario escribe su correo — cada letra que escribe se guarda en "email" */}
          <input
            className="inputs"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
          />

          {/* Etiqueta visible del campo de contraseña */}
          <label>Contraseña</label>
          {/* Campo donde el usuario escribe su contraseña — se oculta con puntos por seguridad */}
          <input
            className="inputs"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />

          {/* Botón que al presionarse envía el formulario */}
          <button type="submit" className="btn-primary-registre">
            Iniciar Sesión
          </button>

          {/* Texto con enlace para ir a la página de inicio de sesión */}
          <p className="extra-info">
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Hace que este componente esté disponible para usarse en otras partes de la app
export default Ingresar;
