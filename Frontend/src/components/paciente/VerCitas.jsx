import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

import $ from "jquery";
import DataTable from "datatables.net-dt";

import "datatables.net-dt/css/dataTables.dataTables.min.css";

import "../../styles/ver_citas.css";

function VerCitas() {

    // ================= ESTADOS =================
    const [citas, setCitas] = useState([]);

    const [citaSeleccionada, setCitaSeleccionada] = useState(null);

    const [mostrarModal, setMostrarModal] = useState(false);

    const tablaRef = useRef(null);

    // ================= CARGAR CITAS =================
    useEffect(() => {

        const obtenerCitas = async () => {

            try {

                // Email guardado
                const email = localStorage.getItem("email");

                // Validar
                if (!email) {

                    Swal.fire(
                        "Error",
                        "No se encontró el correo del usuario",
                        "error"
                    );

                    return;
                }

                // Fetch al backend
                const res = await fetch(
                    "http://localhost:3000/api/citas/paciente",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email
                        })
                    }
                );

                const data = await res.json();
                console.log("📦 Respuesta del backend:", data); // <-- agregar
                // Si sale bien
                if (data.ok) {

                    setCitas(data.citas);

                }

                // Si no hay citas
                else {

                    Swal.fire({
                        icon: "warning",
                        title: "Sin citas",
                        text: "No tienes citas registradas"
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

        obtenerCitas();

    }, []);

    // ================= ACTIVAR DATATABLE =================
    useEffect(() => {

        if (citas.length === 0) return;

        let tabla;

        if ($.fn.DataTable.isDataTable(tablaRef.current)) {

            $(tablaRef.current)
                .DataTable()
                .destroy();

        }

        tabla = $(tablaRef.current).DataTable({

            language: {
                search: "Buscar:",
                lengthMenu:
                    "Mostrar _MENU_ registros",

                info:
                    "Mostrando _START_ a _END_ de _TOTAL_ citas",

                paginate: {
                    next: "Siguiente",
                    previous: "Anterior"
                },

                emptyTable:
                    "No hay citas registradas"
            }

        });

        return () => {

            if (tabla) {

                tabla.destroy();

            }

        };

    }, [citas]);

    // ================= VER DETALLES =================
    const verDetalles = (cita) => {

        setCitaSeleccionada(cita);

        setMostrarModal(true);

    };

    // ================= RENDER =================
    console.log("Modal:", mostrarModal);
    console.log("Seleccionada:", citaSeleccionada);
    return (

        <div className="ver-citas-container">

            {/* HEADER */}
            <div className="header">

                <h1>Mis Citas Programadas</h1>

                <p>
                    Consulta todas tus citas médicas
                </p>

            </div>

            {/* TABLA */}
            <div className="citas-container">

                <table
                    ref={tablaRef}
                    id="tablaCitas"
                    className="display citas-table"
                >

                    <thead>

                        <tr>

                            <th>Fecha</th>

                            <th>Hora</th>

                            <th>Médico</th>

                            <th>Acciones</th>

                        </tr>

                    </thead>

                    <tbody>

                        {citas.map((cita, index) => (

                            <tr key={index}>

                                <td>{cita.Fecha.split("T")[0]}</td>

                                <td>{cita.Hora}</td>

                                <td>{cita.Medico_Nombre}</td>

                                <td>

                                    <button
                                        className="btn-detalles"
                                        onClick={() => {

                                            console.log(cita);

                                            setCitaSeleccionada(cita);

                                            setMostrarModal(true);

                                        }}
                                    >

                                        <i className="fas fa-eye"> </i>

                                         Ver Detalles

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* MODAL */}
            {mostrarModal && citaSeleccionada && (

                <div className="modal-overlay">

                    <div className="modal-content-cita">

                        <div className="modal-header-cita">

                            <h3>Detalles de la Cita</h3>

                            <button
                                className="cerrar-modal"
                                onClick={() => setMostrarModal(false)}
                            >
                                ×
                            </button>

                        </div>

                        <div className="modal-body">

                            <div className="info-group">
                                <label>Fecha:</label>
                                <p>{citaSeleccionada.Fecha.split("T")[0]}</p>
                            </div>

                            <div className="info-group">
                                <label>Hora:</label>
                                <p>{citaSeleccionada.Hora}</p>
                            </div>

                            <div className="info-group">
                                <label>Especialidad:</label>
                                <p>{citaSeleccionada.Especialidad}</p>
                            </div>

                            <div className="info-group">
                                <label>Médico:</label>
                                <p>{citaSeleccionada.Medico_Nombre}</p>
                            </div>

                        </div>

                        <div className="modal-footer-cita">

                            <button
                                className="btn-cerrar"
                                onClick={() => setMostrarModal(false)}
                            >
                                Cerrar
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default VerCitas;