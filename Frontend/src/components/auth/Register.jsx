import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/crear_cuenta.css";

import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let listaErrores = [];

    // validación frontend
    if (!email.includes("@") || !email.includes(".")) {
      listaErrores.push("Formato de correo inválido");
    }

    if (password.length < 6) {
      listaErrores.push("La contraseña debe tener al menos 6 caracteres");
    }

    if (listaErrores.length > 0) {
      setErrores(listaErrores);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.ok) {
        localStorage.setItem("user", JSON.stringify(data));

        setErrores([]);

        Swal.fire({
          title: "Cuenta creada",
          text: "Ahora completa tus datos",
          icon: "success",
        }).then(() => {
          navigate("/paciente"); // 🔥 AQUÍ REDIRIGES
        });

        setEmail("");
        setPassword("");
      } else {
        setErrores(data.errores || ["Error desconocido"]);
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo conectar al servidor", "error");
    }
  };

  return (
    <div className="register-page">
      <div className="container">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Crear Cuenta</h2>
          <p className="subtitle">Regístrate para acceder</p>

          {/* ERRORES */}
          {errores.length > 0 && (
            <div className="error-message">
              {errores.map((err, i) => (
                <div key={i} className="error-item">
                  {err}
                </div>
              ))}
            </div>
          )}

          <label>Correo</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@mail.com"
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="mínimo 6 caracteres"
          />

          <button type="submit" className="btn-primary-registre">
            Crear Cuenta
          </button>

          <p className="extra-info">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
