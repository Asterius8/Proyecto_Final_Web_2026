import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import "../../styles/editar_paciente.css";

function EditarPerfil() {

  // ================= ESTADO DEL FORMULARIO =================
  const [form, setForm] = useState({
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    fecha_nac: "",
    sexo: "",
    telefono: "",
    tipo_seguro: "",
    contacto_emergencia: "",
    telefono_emergencia: ""
  });

  // ================= CARGAR DATOS DEL PACIENTE =================
  useEffect(() => {

    // Obtener usuario guardado
    const user = JSON.parse(localStorage.getItem("user"));

    // Obtener email
    const email = user?.email;

    // Si no existe email
    if (!email) {

      Swal.fire(
        "Error",
        "No se encontró la sesión",
        "error"
      );

      return;
    }

    // Fetch al backend
    fetch(`http://localhost:3000/api/paciente/${email}`)

      .then(res => res.json())

      .then(data => {

        // Si todo sale bien
        if (data.ok) {

          // Guardar datos en el formulario
          setForm({
            nombre: data.paciente.Nombre,
            primer_apellido: data.paciente.Apellido_Paterno,
            segundo_apellido: data.paciente.Apellido_Materno,
            fecha_nac: data.paciente.Fecha_Nac,
            sexo: data.paciente.Sexo,
            telefono: data.paciente.Telefono,
            tipo_seguro: data.paciente.Tipo_Seguro,
            contacto_emergencia: data.paciente.Contacto_Emergencia_Nombre,
            telefono_emergencia: data.paciente.Contacto_Emergencia_Telefono
          });

        } else {

          Swal.fire(
            "Error",
            "No se pudo cargar el paciente",
            "error"
          );

        }

      })

      .catch(() => {

        Swal.fire(
          "Error",
          "No se pudo conectar al servidor",
          "error"
        );

      });

  }, []);

  // ================= MANEJAR CAMBIOS =================
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // ================= VALIDACIONES =================
  const validar = () => {

    let errores = [];

    const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    const regexTelefono = /^[0-9]{10}$/;

    if (!form.tipo_seguro) {
      errores.push("Selecciona un tipo de seguro");
    }

    if (!form.contacto_emergencia) {
      errores.push("El contacto es obligatorio");
    }

    else if (!regexTexto.test(form.contacto_emergencia)) {
      errores.push("El contacto solo puede contener letras");
    }

    if (!regexTelefono.test(form.telefono_emergencia)) {
      errores.push("El teléfono debe tener 10 dígitos");
    }

    return errores;
  };

  // ================= ENVIAR FORMULARIO =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    const errores = validar();

    // Mostrar errores
    if (errores.length > 0) {

      Swal.fire({
        title: "Errores encontrados",
        html: `
          <ul style="text-align:left;">
            ${errores.map(err => `<li>${err}</li>`).join("")}
          </ul>
        `,
        icon: "error"
      });

      return;
    }

    try {

      // Obtener usuario
      const user = JSON.parse(localStorage.getItem("user"));

      // Obtener email
      const email = user?.email;

      // Fetch al backend
      const res = await fetch(
        "http://localhost:3000/api/paciente/editar",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...form,
            email
          })
        }
      );

      const data = await res.json();

      // Si salió bien
      if (data.ok) {

        Swal.fire({
          title: "Paciente editado",
          text: "Información actualizada correctamente",
          icon: "success"
        });

      }

      // Si hubo error
      else {

        Swal.fire({
          title: "Error",
          html: `
            <ul style="text-align:left;">
              ${data.errores.map(err => `<li>${err}</li>`).join("")}
            </ul>
          `,
          icon: "error"
        });

      }

    } catch (error) {

      Swal.fire(
        "Error",
        "No se pudo conectar al servidor",
        "error"
      );

    }

  };

  return (

    <div className="editar-container">

      <form className="form-card" onSubmit={handleSubmit}>

        <h2>Datos Personales</h2>

        <p className="subtitle">
          Modifica tu información personal
        </p>

        {/* NOMBRE */}
        <div className="form-group">

          <label>Nombre(s)</label>

          <input
            type="text"
            value={form.nombre}
            readOnly
          />

        </div>

        {/* PRIMER APELLIDO */}
        <div className="form-group">

          <label>Primer Apellido</label>

          <input
            type="text"
            value={form.primer_apellido}
            readOnly
          />

        </div>

        {/* SEGUNDO APELLIDO */}
        <div className="form-group">

          <label>Segundo Apellido</label>

          <input
            type="text"
            value={form.segundo_apellido}
            readOnly
          />

        </div>

        {/* FECHA */}
        <div className="form-group">

          <label>Fecha de Nacimiento</label>

          <input
            type="date"
            value={form.fecha_nac}
            readOnly
          />

        </div>

        {/* SEXO */}
        <div className="form-group">

          <label>Sexo</label>

          <div className="radio-group">

            <div className="radio-option">

              <input
                type="radio"
                checked={form.sexo === "M"}
                disabled
              />

              <label>Masculino</label>

            </div>

            <div className="radio-option">

              <input
                type="radio"
                checked={form.sexo === "F"}
                disabled
              />

              <label>Femenino</label>

            </div>

            <div className="radio-option">

              <input
                type="radio"
                checked={form.sexo === "O"}
                disabled
              />

              <label>Otro</label>

            </div>

          </div>

        </div>

        {/* TELEFONO */}
        <div className="form-group">

          <label>Teléfono</label>

          <input
            type="text"
            value={form.telefono}
            readOnly
          />

        </div>

        {/* TIPO SEGURO */}
        <div className="form-group">

          <label>Tipo de Seguro</label>

          <select
            name="tipo_seguro"
            value={form.tipo_seguro}
            onChange={handleChange}
          >

            <option value="">Selecciona una opción</option>

            <option value="Privado">Privado</option>

            <option value="Aseguradora">
              Aseguradora
            </option>

            <option value="Gobierno">
              Gobierno
            </option>

            <option value="Indigente">
              Indigente
            </option>

            <option value="Ninguno">
              Ninguno
            </option>

          </select>

        </div>

        {/* CONTACTO EMERGENCIA */}
        <div className="emergency-contact">

          <h3>Contacto de Emergencia</h3>

          <div className="form-group">

            <label>Nombre del contacto</label>

            <input
              type="text"
              name="contacto_emergencia"
              value={form.contacto_emergencia}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Teléfono del contacto</label>

            <input
              type="text"
              name="telefono_emergencia"
              value={form.telefono_emergencia}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* BOTON */}
        <button
          type="submit"
          className="btn-primary"
        >
          Guardar Datos
        </button>

      </form>

    </div>
  );
}

export default EditarPerfil;