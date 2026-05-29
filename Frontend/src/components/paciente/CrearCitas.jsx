import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import "../../styles/crear_cita.css";

import { useNavigate } from "react-router-dom";

import { sesionExpirada, cerrarSesion } from "../../utils/session";

function CrearCitas() {
    const navigate = useNavigate();

    const [medicos, setMedicos] = useState([]);

    const [form, setForm] = useState({
        fecha: "",
        hora: "",
        medico: ""
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

    useEffect(() => {

        obtenerMedicos();

    }, []);

    const obtenerMedicos = async () => {

        try {

            const res = await fetch(`${import.meta.env.VITE_API_URL}/medicos`);

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
                text: "Error al conectar con el servidor"
            });
        }
    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const validar = () => {

        let errores = [];

        if (!form.fecha) {

            errores.push("La fecha es obligatoria");

        } else {

            const hoy = new Date();

            hoy.setHours(0, 0, 0, 0);

            const fechaSeleccionada = new Date(form.fecha);

            if (fechaSeleccionada < hoy) {

                errores.push("La fecha debe ser posterior o igual a hoy");

            }

        }

        if (!form.hora) {

            errores.push("La hora es obligatoria");

        } else {

            const [horas, minutos] = form.hora.split(":");

            const horaNumerica =
                parseInt(horas) * 60 + parseInt(minutos);

            const horaMinima = 8 * 60;

            const horaMaxima = 18 * 60;

            if (
                horaNumerica < horaMinima ||
                horaNumerica > horaMaxima
            ) {

                errores.push("La hora debe estar entre 08:00 y 18:00");

            }

        }

        if (!form.medico) {

            errores.push("Debe seleccionar un médico");

        }

        return errores;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const errores = validar();

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

        if (!validarSesion()) return;

        try {

            const email = localStorage.getItem("email");

            const res = await fetch(`${import.meta.env.VITE_API_URL}/citas`, {

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

            if (data.ok) {

                Swal.fire({
                    title: "Cita creada",
                    text: "Tu cita fue programada correctamente",
                    icon: "success"
                });

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

                    <div className="form-group">

                        <label>Fecha de la Cita</label>

                        <input
                            type="date"
                            name="fecha"
                            value={form.fecha}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Hora de la Cita</label>

                        <input
                            type="time"
                            name="hora"
                            value={form.hora}
                            onChange={handleChange}
                        />

                    </div>

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

                    <div className="form-actions">

                        <button
                            type="button"
                            className="btn btn-outline1"
                            onClick={() => navigate(-1)}
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