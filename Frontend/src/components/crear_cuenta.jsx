// Importamos useState para manejar el estado del formulario
import { useState } from "react";

// ── Estilos originales del PHP/CSS migrados a React ───────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:wght@400;500&display=swap');

  :root {
    --gold-color: #d4af37;
    --gold-dark: #b8941f;
    --gold-light: #e6c86a;
    --guinda-1: rgba(92, 0, 17, 1);
    --guinda-2: rgba(139, 0, 53, 1);
    --light-color: #faf8f8;
    --dark-color: #333;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Montserrat', sans-serif; }

  /* Fondo con gradiente guinda sobre imagen médica, igual que el CSS original */
  .cc-body {
    background-image: linear-gradient(135deg, rgba(92, 0, 17, 0.85), rgba(139, 0, 53, 0.85)),
      url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=80');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Contenedor centrado con ancho máximo */
  .cc-container { width: 100%; max-width: 420px; padding: 20px; }

  /* Tarjeta blanca del formulario */
  .cc-form-card {
    background: white;
    padding: 40px 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    text-align: center;
  }

  /* Título con fuente serif dorada */
  .cc-form-card h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    color: var(--gold-dark);
    margin-bottom: 10px;
  }

  /* Subtítulo */
  .cc-subtitle { color: #666; font-size: 0.95rem; margin-bottom: 25px; }

  /* Etiquetas alineadas a la izquierda */
  .cc-form-card label { display: block; text-align: left; font-weight: 500; color: var(--dark-color); margin-bottom: 6px; }

  /* Inputs con borde dorado */
  .cc-form-card input {
    width: 100%;
    padding: 12px;
    border: 2px solid var(--gold-color);
    border-radius: 8px;
    margin-bottom: 5px;
    font-size: 1rem;
    transition: all .3s;
  }

  /* Focus del input */
  .cc-form-card input:focus {
    outline: none;
    border-color: var(--gold-dark);
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
  }

  /* Input con error */
  .cc-form-card input.input-error { border-color: #e53935; margin-bottom: 0; }

  /* Mensaje de error con animación fadeIn (equivale a LiveValidation del PHP) */
  .cc-error-msg {
    color: #ff0000;
    font-weight: 900;
    font-size: 13px;
    padding: 5px;
    text-align: left;
    border-radius: 5px;
    margin-bottom: 10px;
    display: block;
    opacity: 0;
    animation: fadeIn 0.4s ease-in forwards;
  }

  /* Animación de entrada del error */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Espaciado cuando no hay error */
  .cc-field-ok { margin-bottom: 15px; }

  /* Botón dorado principal */
  .cc-btn-primary {
    width: 100%;
    padding: 12px;
    background-color: var(--gold-color);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 600;
    transition: .3s;
    margin-top: 10px;
  }

  /* Hover del botón */
  .cc-btn-primary:hover:not(:disabled) {
    background-color: var(--gold-dark);
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(212,175,55,0.4);
  }

  /* Botón deshabilitado */
  .cc-btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

  /* Link al login */
  .cc-extra-info { margin-top: 15px; font-size: 0.9rem; color: #555; }
  .cc-extra-info a { color: var(--gold-dark); font-weight: 600; text-decoration: none; }
  .cc-extra-info a:hover { text-decoration: underline; }

  /* ── Modal (reemplaza SweetAlert del PHP) ── */
  .cc-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999;
  }

  .cc-modal-box {
    background: white; border-radius: 16px;
    padding: 40px 32px; max-width: 400px; width: 90%;
    text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }

  .cc-modal-icon { font-size: 3rem; margin-bottom: 12px; }

  .cc-modal-title {
    font-family: 'Playfair Display', serif;
    color: #333; margin-bottom: 12px; font-size: 1.5rem;
  }

  .cc-modal-msg { color: #555; font-size: 0.95rem; margin-bottom: 16px; }

  .cc-modal-list {
    text-align: left; color: #c62828;
    padding-left: 20px; margin-bottom: 16px;
  }

  .cc-modal-list li { margin-bottom: 4px; }

  /* Botón de confirmación en color guinda (igual que confirmButtonColor del Swal original) */
  .cc-modal-btn {
    padding: 10px 32px; background: #8B0035;
    color: white; border: none; border-radius: 8px;
    font-weight: 600; cursor: pointer; font-size: 0.95rem;
    transition: background 0.3s;
  }

  .cc-modal-btn:hover { background: #6a0026; }
`;

// ── Componente Modal: reemplaza el Swal.fire() del PHP ────────
// El PHP usaba SweetAlert desde CDN; aquí lo replicamos en React puro
function Modal({ tipo, titulo, mensaje, lista, onClose }) {
  // Si no hay tipo, no mostramos nada
  if (!tipo) return null;

  // Iconos y colores según el tipo de alerta
  const iconos = { success: "✅", error: "❌", warning: "⚠️" };

  return (
    // Overlay oscuro (equivale al backdrop de SweetAlert)
    <div className="cc-modal-overlay">
      <div className="cc-modal-box">
        {/* Ícono del tipo de alerta */}
        <div className="cc-modal-icon">{iconos[tipo]}</div>

        {/* Título del modal (equivale al title: del Swal.fire) */}
        <h3 className="cc-modal-title">{titulo}</h3>

        {/* Mensaje simple (equivale al text: del Swal.fire) */}
        {mensaje && <p className="cc-modal-msg">{mensaje}</p>}

        {/* Lista de errores (equivale al html: con <ul> del Swal.fire) */}
        {lista && (
          <ul className="cc-modal-list">
            {lista.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        )}

        {/* Botón OK (equivale al confirmButtonColor: '#8B0035' del Swal.fire) */}
        <button className="cc-modal-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

// ── Componente principal: CrearCuenta ─────────────────────────
function CrearCuenta() {
  // Estado del formulario: email y contraseña
  // Equivale al value del input PHP con $_SESSION['email']
  const [form, setForm] = useState({ email: "", password: "" });

  // Errores de validación por campo
  // Equivale a la validación de LiveValidation del PHP
  const [errores, setErrores] = useState({});

  // Estado del modal que reemplaza al Swal.fire() del PHP
  // { tipo, titulo, mensaje, lista, onConfirm }
  const [modal, setModal] = useState(null);

  // Estado de carga mientras se procesa el envío
  const [cargando, setCargando] = useState(false);

  // ── Actualiza campos al escribir ─────────────────────────
  // Limpia el error del campo (equivale al comportamiento en tiempo real de LiveValidation)
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));  // Actualiza el campo
    setErrores(prev => ({ ...prev, [name]: "" }));  // Limpia su error
  }

  // ── Validación (equivale a LiveValidation del PHP) ───────
  function validar() {
    const nuevosErrores = {};

    // Email: requerido + formato con regex
    if (!form.email.trim()) {
      nuevosErrores.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nuevosErrores.email = "Formato de correo inválido";
    }

    // Contraseña: requerida + min 6 + max 20
    if (!form.password.trim()) {
      nuevosErrores.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      nuevosErrores.password = "Debe tener al menos 6 caracteres";
    } else if (form.password.length > 20) {
      nuevosErrores.password = "No puede superar los 20 caracteres";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0; // true = sin errores
  }

  // ── Envío del formulario ──────────────────────────────────
  // Equivale al action="../backend/controllers/alta_cuenta.php" del PHP
  async function handleSubmit(e) {
    e.preventDefault(); // Evita recarga de página

    if (!validar()) return; // Detenemos si hay errores de validación

    setCargando(true);

    try {
      // Llamamos al endpoint de registro del backend Express
      // Equivale al POST a alta_cuenta.php
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre:   form.email.split("@")[0], // Nombre provisional del email
          email:    form.email,
          password: form.password,
          rol:      "paciente",               // Rol por defecto al registrarse
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Error del servidor: equivale al Swal de error del PHP
        setModal({
          tipo:   "error",
          titulo: "Errores encontrados",
          lista:  [data.mensaje || "Error al crear la cuenta"],
        });
        return;
      }

      // Éxito: equivale al Swal de éxito con redirección a form_paciente.php
      setModal({
        tipo:      "success",
        titulo:    "¡Cuenta creada!",
        mensaje:   "Tu cuenta se registró correctamente.",
        onConfirm: () => { window.location.href = "/login"; }, // Redirige al confirmar
      });

      setForm({ email: "", password: "" }); // Limpiamos el formulario

    } catch {
      // Error de red
      setModal({
        tipo:    "error",
        titulo:  "Error de conexión",
        mensaje: "No se pudo conectar con el servidor. Intenta de nuevo.",
      });
    } finally {
      setCargando(false); // Siempre desactivamos el estado de carga
    }
  }

  // ── Cierra el modal y ejecuta onConfirm si existe ─────────
  // onConfirm redirige al login cuando la cuenta fue creada exitosamente
  function cerrarModal() {
    if (modal?.onConfirm) modal.onConfirm();
    setModal(null);
  }

  return (
    <>
      {/* Inyectamos los estilos CSS originales */}
      <style>{styles}</style>

      {/* Fondo con gradiente guinda (equivale al body del CSS original) */}
      <div className="cc-body">
        <div className="cc-container">

          {/* Tarjeta del formulario (equivale a .form-card del PHP) */}
          <form className="cc-form-card" onSubmit={handleSubmit}>

            {/* Título (equivale al <h2>Crear Cuenta</h2> del PHP) */}
            <h2>Crear Cuenta</h2>

            {/* Subtítulo (equivale al <p class="subtitle"> del PHP) */}
            <p className="cc-subtitle">Regístrate para acceder a tu cuenta</p>

            {/* ── Campo Email ── */}
            {/* Equivale al input id="caja_email" del PHP */}
            <div>
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Ingresa tu correo"
                value={form.email}           // Controlado por React (equivale al value de PHP con $_SESSION)
                onChange={handleChange}
                className={errores.email ? "input-error" : ""}
              />
              {/* Error en tiempo real (equivale a LiveValidation del PHP) */}
              {errores.email
                ? <span className="cc-error-msg">{errores.email}</span>
                : <div className="cc-field-ok" />
              }
            </div>

            {/* ── Campo Contraseña ── */}
            {/* Equivale al input id="caja_password" del PHP */}
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={form.password}
                onChange={handleChange}
                className={errores.password ? "input-error" : ""}
              />
              {/* Error en tiempo real (equivale a LiveValidation del PHP) */}
              {errores.password
                ? <span className="cc-error-msg">{errores.password}</span>
                : <div className="cc-field-ok" />
              }
            </div>

            {/* Botón de envío (equivale al <button type="submit"> del PHP) */}
            <button
              type="submit"
              className="cc-btn-primary"
              disabled={cargando}
            >
              {/* Texto dinámico mientras carga */}
              {cargando ? "Creando cuenta..." : "Crear Cuenta"}
            </button>

            {/* Link al login (equivale al <p class="extra-info"> del PHP) */}
            <p className="cc-extra-info">
              ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
            </p>

          </form>
        </div>
      </div>

      {/* Modal SweetAlert (equivale al Swal.fire() del PHP) */}
      <Modal
        tipo={modal?.tipo}
        titulo={modal?.titulo}
        mensaje={modal?.mensaje}
        lista={modal?.lista}
        onClose={cerrarModal}
      />
    </>
  );
}

// Exportamos el componente como default
export default CrearCuenta;
