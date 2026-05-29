import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { sesionExpirada, cerrarSesion } from "../../utils/session";

import "../../styles/agregar_medico.css";

function AgregarMedico() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    especialidad: "",
  });

  const validarSesion = () => {
    if (sesionExpirada()) {
      cerrarSesion();

      Swal.fire(
        "Sesión expirada",
        "Vuelve a iniciar sesión",
        "warning"
      ).then(() => {
        navigate("/login");
      });

      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validar = () => {
    const errores = [];
    const soloLetras = /^[a-zA-ZÁÉÍÓÚÑáéíóúñ ]+$/;

    if (!form.nombre.trim()) {
      errores.push("El nombre es obligatorio");
    } else if (!soloLetras.test(form.nombre)) {
      errores.push("El nombre solo puede contener letras");
    } else if (form.nombre.length < 2) {
      errores.push("El nombre debe tener al menos 2 letras");
    } else if (form.nombre.length > 40) {
      errores.push("El nombre no puede exceder 40 letras");
    }

    if (!form.apellido_paterno.trim()) {
      errores.push("El apellido paterno es obligatorio");
    } else if (!soloLetras.test(form.apellido_paterno)) {
      errores.push("El apellido paterno solo puede contener letras");
    } else if (form.apellido_paterno.length < 2) {
      errores.push("El apellido paterno debe tener al menos 2 letras");
    } else if (form.apellido_paterno.length > 40) {
      errores.push("El apellido paterno no puede exceder 40 letras");
    }

    if (!form.apellido_materno.trim()) {
      errores.push("El apellido materno es obligatorio");
    } else if (!soloLetras.test(form.apellido_materno)) {
      errores.push("El apellido materno solo puede contener letras");
    } else if (form.apellido_materno.length < 2) {
      errores.push("El apellido materno debe tener al menos 2 letras");
    } else if (form.apellido_materno.length > 40) {
      errores.push("El apellido materno no puede exceder 40 letras");
    }

    if (!form.especialidad) {
      errores.push("Debe seleccionar una especialidad válida");
    }

    return errores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errores = validar();

    if (errores.length > 0) {
      Swal.fire({
        title: "Errores encontrados",
        html: `<ul style="text-align:left;">${errores
          .map((err) => `<li>${err}</li>`)
          .join("")}</ul>`,
        icon: "error",
        confirmButtonColor: "#8B0035",
      });

      return;
    }

    if (!validarSesion()) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/medicos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.ok) {
        Swal.fire({
          title: "Médico agregado",
          text: "La información ha sido guardada correctamente.",
          icon: "success",
          confirmButtonColor: "#8B0035",
        });

        setForm({
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
          especialidad: "",
        });
      } else {
        Swal.fire({
          title: "Errores encontrados",
          html: `<ul style="text-align:left;">${data.errores
            .map((err) => `<li>${err}</li>`)
            .join("")}</ul>`,
          icon: "error",
          confirmButtonColor: "#8B0035",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo conectar con el servidor",
        icon: "error",
        confirmButtonColor: "#8B0035",
      });
    }
  };

  return (
    <div className="admin-form-page">
      <div className="form-container">
        <div className="form-header">
          <h1>Alta de Nuevo Médico</h1>
          <p>
            Complete todos los campos para registrar un nuevo médico en el
            sistema
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ingrese el nombre del médico"
              value={form.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Apellido Paterno</label>
            <input
              type="text"
              name="apellido_paterno"
              placeholder="Ingrese el apellido paterno"
              value={form.apellido_paterno}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Apellido Materno</label>
            <input
              type="text"
              name="apellido_materno"
              placeholder="Ingrese el apellido materno"
              value={form.apellido_materno}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Especialidad</label>
            <select
              name="especialidad"
              value={form.especialidad}
              onChange={handleChange}
            >
              <option value="">Seleccione una especialidad</option>
              <option value="Pediatra">Pediatra</option>
              <option value="Cirujano">Cirujano</option>
              <option value="Internista">Internista</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => window.history.back()}
            >
              Cancelar
            </button>

            <button type="submit" className="btn btn-primary">
              Guardar Médico
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgregarMedico;