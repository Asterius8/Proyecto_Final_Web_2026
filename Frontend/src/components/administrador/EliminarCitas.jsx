import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../styles/eliminar_citas.css";

function EliminarCitas() {
    const [citas, setCitas] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        obtenerCitas();
    }, []);

    const obtenerCitas = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/citas/admin`);
            const data = await res.json();

            if (data.ok) {
                setCitas(data.citas);
            }
        } catch {
            Swal.fire("Error", "No se pudo conectar al servidor", "error");
        }
    };

    const eliminarCita = async (cita) => {
        const confirmacion = await Swal.fire({
            title: "¿Eliminar cita?",
            text: `Se eliminará la cita del paciente ${cita.Paciente}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#e74c3c",
        });

        if (!confirmacion.isConfirmed) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/citas/${cita.Id_Citas}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.ok) {
                Swal.fire("Eliminada", "La cita fue eliminada correctamente", "success");
                obtenerCitas();
            } else {
                Swal.fire("Error", data.errores?.[0] || "No se pudo eliminar", "error");
            }
        } catch {
            Swal.fire("Error", "No se pudo conectar al servidor", "error");
        }
    };

    const citasFiltradas = citas.filter((cita) => {
        const texto = `${cita.Fecha} ${cita.Hora} ${cita.Paciente} ${cita.Especialidad_Nombre}`.toLowerCase();
        return texto.includes(busqueda.toLowerCase());
    });

    return (
        <div className="admin-citas-page">
            <div className="header">
                <h1>Gestión de Citas Médicas</h1>
                <p>Administra y elimina citas programadas en la clínica</p>
            </div>

            <div className="search-container">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Buscar por fecha, hora, paciente o médico..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <div className="results-count">
                    Mostrando {citasFiltradas.length} de {citas.length} citas
                </div>
            </div>

            <div className="citas-container">
                <div className="table-responsive">
                    <table className="citas-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Paciente</th>
                                <th>Médico</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {citasFiltradas.map((cita) => (
                                <tr key={cita.Id_Citas}>
                                    <td>{cita.Fecha}</td>
                                    <td>{cita.Hora}</td>
                                    <td>{cita.Paciente}</td>
                                    <td>{cita.Especialidad_Nombre}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => eliminarCita(cita)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {citasFiltradas.length === 0 && (
                        <div className="no-results">
                            No se encontraron citas
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EliminarCitas;