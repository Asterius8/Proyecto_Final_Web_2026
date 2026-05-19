import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import "../../styles/crear_cita.css";

function CrearCitas() {

    // ================= STATES =================

    // Guardar médicos obtenidos del backend
    const [medicos, setMedicos] = useState([]);

    // Datos del formulario
    const [form, setForm] = useState({
        fecha: "",
        hora: "",
        medico: ""
    });

    // ================= OBTENER MÉDICOS =================

    useEffect(() => {

        obtenerMedicos();

    }, []);

    // Función para traer médicos del backend
    const obtenerMedicos = async () => {

        try {

            const res = await fetch("http://localhost:3000/api/medicos");

            const data = await res.json();

            if (data.ok) {

                setMedicos(data.medicos);

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudieron cargar los médicos"
                });
            }

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al conectar con el servidor weon"
            });
        }
    };

    // ================= HANDLE CHANGE =================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ================= VALIDAR =================

    const validar = () => {

        let errores = [];

        if (!form.fecha) {
            errores.push("La fecha es obligatoria");
        }

        if (!form.hora) {
            errores.push("La hora es obligatoria");
        }

        if (!form.medico) {
            errores.push("Debe seleccionar un médico");
        }

        return errores;
    };

    // ================= ENVIAR FORMULARIO =================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const errores = validar();

        // Si hay errores
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

            // Obtener email guardado
            const email = localStorage.getItem("email");

            const res = await fetch("http://localhost:3000/api/citas", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    ...form,
                    email
                })
            });

            const data = await res.json();

            // ================= RESPUESTA EXITOSA =================

            if (data.ok) {

                Swal.fire({
                    title: "Cita creada",
                    text: "Tu cita fue programada correctamente",
                    icon: "success"
                });

                // Limpiar formulario
                setForm({
                    fecha: "",
                    hora: "",
                    medico: ""
                });

            } else {

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

            Swal.fire({
                title: "Error",
                text: "No se pudo conectar al servidor",
                icon: "error"
            });
        }
    };

    // ================= HTML =================

    return (

        <div className="dashboard-form-wrapper">


            <div className="form-container">

                <div className="form-header">

                    <h1>Crear Nueva Cita</h1>

                    <p>
                        Complete todos los campos para programar una nueva cita médica
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* FECHA */}
                    <div className="form-group">

                        <label>Fecha de la Cita</label>

                        <input
                            type="date"
                            name="fecha"
                            value={form.fecha}
                            onChange={handleChange}
                        />

                    </div>

                    {/* HORA */}
                    <div className="form-group">

                        <label>Hora de la Cita</label>

                        <input
                            type="time"
                            name="hora"
                            value={form.hora}
                            onChange={handleChange}
                        />

                    </div>

                    {/* MÉDICOS */}
                    <div className="form-group">

                        <label>Médico y Especialidad</label>

                        <select
                            name="medico"
                            value={form.medico}
                            onChange={handleChange}
                        >

                            <option value="">
                                Seleccione un médico
                            </option>

                            {
                                medicos.map((medico) => (

                                    <option
                                        key={medico.Id_Medicos}
                                        value={medico.Id_Medicos}
                                    >

                                        {medico.Nombre} {medico.Apellido_Paterno} {medico.Apellido_Materno}
                                        {" - "}
                                        {medico.Especialidad}

                                    </option>
                                ))
                            }

                        </select>

                    </div>

                    {/* BOTONES */}
                    <div className="form-actions">

                        <button
                            type="button"
                            className="btn btn-outline1"
                            onClick={() => window.history.back()}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary1"
                        >
                            Programar Cita
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default CrearCitas;