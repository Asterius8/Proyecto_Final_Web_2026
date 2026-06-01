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

                const email = localStorage.getItem("email");

                if (!email) {

                    Swal.fire(
                        "Error",
                        "No se encontró el correo del usuario",
                        "error"
                    );

                    return;
                }

                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/citas/paciente`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email })
                    }
                );

                const data = await res.json();

                if (data.ok) {

                    setCitas(data.citas);

                } else {

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

    // ================= ELIMINAR CITA =================
    const eliminarCita = async (id) => {

        const confirmar = await Swal.fire({
            title: "¿Eliminar cita?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (!confirmar.isConfirmed) return;

        try {

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/citas/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await res.json();

            if (data.ok) {

                Swal.fire(
                    "Eliminada",
                    "La cita fue eliminada correctamente",
                    "success"
                );

                setCitas((citasActuales) =>
                    citasActuales.filter(
                        (cita) => Number(cita.Id_Citas) !== Number(id)
                    )
                );

            } else {

                Swal.fire(
                    "Error",
                    data.errores?.[0] || "No se pudo eliminar la cita",
                    "error"
                );

            }

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No se pudo conectar con el servidor",
                "error"
            );

        }

    };

    // ================= ACTIVAR DATATABLE =================
    useEffect(() => {

        if (!tablaRef.current) return;

        // Destruir instancia previa
        if ($.fn.DataTable.isDataTable(tablaRef.current)) {
            $(tablaRef.current).DataTable().destroy();
            $(tablaRef.current).empty();
        }

        if (citas.length === 0) return;

        const tabla = $(tablaRef.current).DataTable({
            data: citas,
            columns: [
                {
                    title: "Fecha",
                    data: "Fecha",
                    render: (data) => data.split("T")[0]
                },
                {
                    title: "Hora",
                    data: "Hora"
                },
                {
                    title: "Médico",
                    data: "Medico_Nombre"
                },
                {
                    title: "Acciones",
                    data: null,
                    render: (data, type, row) =>
                        `<button class="btn-detalles" data-id="${row.Id_Citas}" data-action="ver">
                            <i class="fas fa-eye"></i>  Detalles
                        </button>
                        <button class="btn-eliminar" data-id="${row.Id_Citas}" data-action="eliminar">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>`
                }
            ],
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

        // Eventos delegados para los botones
        $(tablaRef.current).on("click", "button[data-action='ver']", function () {
            const id = $(this).data("id");
            const cita = citas.find((c) => Number(c.Id_Citas) === Number(id));
            if (cita) {
                setCitaSeleccionada(cita);
                setMostrarModal(true);
            }
        });

        $(tablaRef.current).on("click", "button[data-action='eliminar']", function () {
            const id = $(this).data("id");
            eliminarCita(id);
        });

        return () => {
            $(tablaRef.current).off("click");
            if ($.fn.DataTable.isDataTable(tablaRef.current)) {
                $(tablaRef.current).DataTable().destroy();
            }
        };

    }, [citas]);

    // ================= RENDER =================
    return (

        <div className="ver-citas-container">

            {/* HEADER */}
            <div className="header-citas">

                <h1>Mis Citas Programadas</h1>

                <p>Consulta todas tus citas médicas</p>

            </div>

            {/* TABLA */}
            <div className="citas-card">

                <table
                    ref={tablaRef}
                    id="tablaCitas"
                    className="display citas-table"
                />

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