import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../../styles/form_paciente.css";

function PatientForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    fecha_nac: "",
    sexo: "",
    telefono: "",
    tipo_seguro: "",
    contacto_emergencia: "",
    telefono_emergencia: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validar = () => {
    let errores = [];

    if (!form.nombre.match(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)) {
      errores.push("Nombre inválido");
    }

    if (!form.primer_apellido) {
      errores.push("Apellido obligatorio");
    }

    if (!form.fecha_nac) {
      errores.push("Fecha obligatoria");
    }

    if (!form.sexo) {
      errores.push("Selecciona sexo");
    }

    if (!form.telefono.match(/^[0-9]{10}$/)) {
      errores.push("Teléfono inválido");
    }

    if (!form.tipo_seguro) {
      errores.push("Selecciona seguro");
    }

    if (!form.contacto_emergencia) {
      errores.push("Contacto obligatorio");
    }

    if (!form.telefono_emergencia.match(/^[0-9]{10}$/)) {
      errores.push("Teléfono emergencia inválido");
    }

    return errores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errores = validar();

    if (errores.length > 0) {
      Swal.fire({
        title: "Errores",
        html: `<ul style="text-align:left;">${errores.map((e) => `<li>${e}</li>`).join("")}</ul>`,
        icon: "error",
      });
      return;
    }

    const email = localStorage.getItem("email");

    try {
      const res = await fetch("http://localhost:3000/api/paciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, email }),
      });

      const data = await res.json();

      if (data.ok) {
        Swal.fire({
          title: "Paciente creado",
          text: "Datos guardados correctamente",
          icon: "success",
        }).then(() => {
          navigate("/"); // o dashboard después
        });
      } else {
        Swal.fire({
          title: "Error",
          html: `<ul>${data.errores.map((e) => `<li>${e}</li>`).join("")}</ul>`,
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error); // 👈 abre la consola del navegador (F12)
      Swal.fire("Error", error.message, "error"); // muestra el error real
    }
  };

  return (
    <div className="container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Datos Personales</h2>
        <p className="subtitle">Completa tu información personal</p>

        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input
          name="primer_apellido"
          placeholder="Primer Apellido"
          onChange={handleChange}
        />
        <input
          name="segundo_apellido"
          placeholder="Segundo Apellido"
          onChange={handleChange}
        />

        <input type="date" name="fecha_nac" onChange={handleChange} />

        <div className="form-group">
          <label>Sexo</label>

          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                name="sexo"
                value="M"
                onChange={handleChange}
              />
              <label>Masculino</label>
            </div>

            <div className="radio-option">
              <input
                type="radio"
                name="sexo"
                value="F"
                onChange={handleChange}
              />
              <label>Femenino</label>
            </div>

            <div className="radio-option">
              <input
                type="radio"
                name="sexo"
                value="O"
                onChange={handleChange}
              />
              <label>Otros</label>
            </div>
          </div>
        </div>

        <input name="telefono" placeholder="Teléfono" onChange={handleChange} />

        <select name="tipo_seguro" onChange={handleChange}>
          <option value="">Selecciona tipo de seguro</option>
          <option value="Privado">Privado</option>
          <option value="Aseguradora">Aseguradora</option>
          <option value="Gobierno">Gobierno</option>
          <option value="Indigente">Indigente</option>
          <option value="Ninguno">Ninguno</option>
        </select>

        <h3>Contacto de emergencia</h3>

        <input
          name="contacto_emergencia"
          placeholder="Nombre contacto"
          onChange={handleChange}
        />
        <input
          name="telefono_emergencia"
          placeholder="Teléfono contacto"
          onChange={handleChange}
        />

        <button className="btn-primary">Guardar Datos</button>
      </form>
    </div>
  );
}

export default PatientForm;
