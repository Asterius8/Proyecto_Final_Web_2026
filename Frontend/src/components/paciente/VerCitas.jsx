import { useEffect, useState } from "react";
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
                    "http://localhost:3000/api/citas",
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

        if (citas.length > 0) {

            // Destruir si ya existe
            if ($.fn.DataTable.isDataTable("#tablaCitas")) {

                $("#tablaCitas").DataTable().destroy();

            }

            // Crear DataTable
            $("#tablaCitas").DataTable({

                language: {
                    search: "Buscar:",
                    lengthMenu: "Mostrar _MENU_ registros",
                    info: "Mostrando _START_ a _END_ de _TOTAL_ citas",
                    paginate: {
                        next: "Siguiente",
                        previous: "Anterior"
                    },
                    emptyTable: "No hay citas registradas"
                }

            });

        }

    }, [citas]);

    // ================= VER DETALLES =================
    const verDetalles = (cita) => {

        setCitaSeleccionada(cita);

        setMostrarModal(true);

    };

    // ================= RENDER =================
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

                                <td>{cita.Fecha}</td>

                                <td>{cita.Hora}</td>

                                <td>{cita.Especialidad_Nombre}</td>

                                <td>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => verDetalles(cita)}
                                    >

                                        <i className="fas fa-eye"></i>

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

                <div className="modal">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h3>Detalles de la Cita</h3>

                            <button
                                className="close-modal"
                                onClick={() => setMostrarModal(false)}
                            >
                                ×
                            </button>

                        </div>

                        <div className="modal-body">

                            <div className="info-group">

                                <label>Fecha:</label>

                                <p>{citaSeleccionada.Fecha}</p>

                            </div>

                            <div className="info-group">

                                <label>Hora:</label>

                                <p>{citaSeleccionada.Hora}</p>

                            </div>

                            <div className="info-group">

                                <label>Médico:</label>

                                <p>{citaSeleccionada.Especialidad_Nombre}</p>

                            </div>

                        </div>

                        <div className="modal-actions">

                            <button
                                className="btn btn-outline"
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